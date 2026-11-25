// Minimal runtime for exported ".dc.html" prototypes, standing in for the design
// tool's own support.js. It supports what those files use:
//   <helmet>                      contents moved into <head>
//   <x-dc> … </x-dc>              the template
//   <sc-if value="{{ x }}">       render children when x is truthy
//   <sc-for list="{{ xs }}" as="x">  render children once per item
//   {{ a.b.c }}                   value lookups in text and attributes
//   onClick / onChange="{{ fn }}" event handlers (onChange fires on every keystroke for text inputs)
//   <script type="text/x-dc">     a `Component extends DCLogic` class with state,
//                                 setState() and renderVals()
// Each render builds the page again and patches it into the live DOM, reusing
// elements where the structure matches so inputs keep focus while typing.
;(() => {
  class DCLogic {
    constructor(props) {
      this.props = props || {}
      this.state = {}
    }
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch)
      scheduleRender()
    }
  }

  let component
  let template
  let root
  let queued = false

  const scheduleRender = () => {
    if (queued) return
    queued = true
    queueMicrotask(() => {
      queued = false
      render()
    })
  }

  const ONLY_EXPR = /^\s*\{\{\s*([^}]*?)\s*\}\}\s*$/
  const ANY_EXPR = /\{\{\s*([^}]*?)\s*\}\}/g

  const lookup = (expr, scope) => {
    if (expr === 'true') return true
    if (expr === 'false') return false
    if (expr === 'null') return null
    if (expr === 'undefined' || expr === '') return undefined
    if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr)
    if (/^(['"]).*\1$/.test(expr)) return expr.slice(1, -1)
    const [head, ...rest] = expr.split('.')
    let v
    for (let s = scope; s; s = s.parent) {
      if (Object.prototype.hasOwnProperty.call(s.vars, head)) {
        v = s.vars[head]
        break
      }
    }
    for (const key of rest) v = v == null ? undefined : v[key]
    return v
  }

  // A whole-attribute binding keeps its type (function, boolean…); mixed text is stringified
  const evalAttr = (raw, scope) => {
    const only = raw.match(ONLY_EXPR)
    if (only) return lookup(only[1], scope)
    return raw.replace(ANY_EXPR, (_, e) => {
      const v = lookup(e, scope)
      return v == null || v === false ? '' : String(v)
    })
  }

  // Template DOM -> lightweight tree for this render
  const build = (node, scope, out) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue.replace(ANY_EXPR, (_, e) => {
        const v = lookup(e, scope)
        return v == null || v === false ? '' : String(v)
      })
      out.push({ text })
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return
    const tag = node.localName

    if (tag === 'sc-if') {
      if (evalAttr(node.getAttribute('value') || '', scope)) node.childNodes.forEach((c) => build(c, scope, out))
      return
    }
    if (tag === 'sc-for') {
      const list = evalAttr(node.getAttribute('list') || '', scope) || []
      const as = node.getAttribute('as') || 'item'
      Array.from(list).forEach((item, index) => {
        const inner = { vars: { [as]: item, index }, parent: scope }
        node.childNodes.forEach((c) => build(c, inner, out))
      })
      return
    }

    const el = { tag, ns: node.namespaceURI, attrs: {}, on: {}, props: {}, children: [] }
    for (const { name, value } of Array.from(node.attributes)) {
      if (name.startsWith('hint-')) continue
      const v = evalAttr(value, scope)
      if (/^on[a-z]+$/i.test(name)) {
        if (typeof v === 'function') el.on[name.slice(2).toLowerCase()] = v
      } else if (name === 'checked' || name === 'disabled' || name === 'value' || name === 'selected') {
        el.props[name] = v
        if (name === 'disabled' && v) el.attrs.disabled = ''
      } else if (v === false || v == null) {
        // omitted
      } else {
        el.attrs[name] = v === true ? '' : String(v)
      }
    }
    node.childNodes.forEach((c) => build(c, scope, el.children))
    out.push(el)
  }

  // React-style onChange: text fields fire on every keystroke
  const domEvent = (el, type) =>
    type === 'change' && el.localName === 'input' && !/^(checkbox|radio|file)$/i.test(el.type)
      ? 'input'
      : type === 'change' && el.localName === 'textarea'
        ? 'input'
        : type

  const create = (v) => {
    if ('text' in v) return document.createTextNode(v.text)
    const el = v.ns && v.ns !== 'http://www.w3.org/1999/xhtml' ? document.createElementNS(v.ns, v.tag) : document.createElement(v.tag)
    el.__on = {}
    update(el, v)
    return el
  }

  const update = (el, v) => {
    for (const { name } of Array.from(el.attributes)) if (!(name in v.attrs)) el.removeAttribute(name)
    for (const [name, value] of Object.entries(v.attrs)) if (el.getAttribute(name) !== value) el.setAttribute(name, value)

    for (const [name, value] of Object.entries(v.props)) {
      if (name === 'value') {
        const next = value == null ? '' : String(value)
        if (el.value !== next) el.value = next
      } else if (el[name] !== !!value) {
        el[name] = !!value
      }
    }

    el.__on ||= {}
    for (const type of Object.keys(el.__on)) if (!(type in v.on)) el.__on[type] = null
    for (const [type, fn] of Object.entries(v.on)) {
      const evt = domEvent(el, type)
      if (!(evt in el.__on)) el.addEventListener(evt, (e) => el.__on[evt] && el.__on[evt](e))
      el.__on[evt] = fn
    }

    patchChildren(el, v.children)
  }

  const sameKind = (dom, v) =>
    'text' in v
      ? dom.nodeType === Node.TEXT_NODE
      : dom.nodeType === Node.ELEMENT_NODE && dom.localName === v.tag && dom.namespaceURI === (v.ns || dom.namespaceURI)

  const patchChildren = (parent, vchildren) => {
    vchildren.forEach((v, i) => {
      const dom = parent.childNodes[i]
      if (!dom) parent.appendChild(create(v))
      else if (!sameKind(dom, v)) parent.replaceChild(create(v), dom)
      else if ('text' in v) {
        if (dom.nodeValue !== v.text) dom.nodeValue = v.text
      } else update(dom, v)
    })
    while (parent.childNodes.length > vchildren.length) parent.removeChild(parent.lastChild)
  }

  function render() {
    const vals = component.renderVals ? component.renderVals() : {}
    const out = []
    const scope = { vars: { ...component.props, ...vals }, parent: null }
    template.childNodes.forEach((c) => build(c, scope, out))
    patchChildren(root, out)
  }

  function boot() {
    const helmet = document.querySelector('helmet')
    if (helmet) {
      Array.from(helmet.childNodes).forEach((n) => document.head.appendChild(n))
      helmet.remove()
    }

    const host = document.querySelector('x-dc')
    const script = document.querySelector('script[type="text/x-dc"]')
    if (!host || !script) return

    // Keep the original markup as the template, render into a fresh container
    template = document.createElement('template').content
    while (host.firstChild) template.appendChild(host.firstChild)
    root = document.createElement('div')
    root.className = 'dc-root'
    host.replaceWith(root)

    let props = {}
    try {
      props = JSON.parse(script.dataset.props || '{}')
    } catch {
      props = {}
    }
    const Component = new Function('DCLogic', `${script.textContent}\n;return Component`)(DCLogic)
    component = new Component(props)
    render()
    window.READY = true
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
