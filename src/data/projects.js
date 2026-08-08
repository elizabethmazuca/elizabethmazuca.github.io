export const projects = [
  {
    slug: 'google-caravan',
    title: 'Google Caravan',
    tagline:
      'Making group road trips easier by reducing coordination and navigation friction.',
    tags: ['mobile', 'maps', 'concept'],
    cover: '/images/work/google-caravan/caravan-cover.jpg',
    lottie: '/images/work/google-caravan/GoogleMaps.json',
    column: 'left',
    caseStudy: {
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Skill', value: ['Prototyping', 'Interaction Design', 'Automotive UX'] },
        { label: 'Timeline', value: 'June 6 - July 31' },
        { label: 'Tools', value: ['Figma', 'Protopie'] },
      ],
      sections: [
        {
          eyebrow: 'The Challenge',
          heading: 'How can we help travel groups stay coordinated during multi car trips?',
          image: '/images/work/google-caravan/thechallengedino.svg',
        },
        {
          eyebrow: 'Detours and Surprises',
          heading: 'A way to bridge the gap between multiple vehicles',
          body: 'Unexpected things happen on a trip and you want to know them asap',
          lottie: '/images/work/google-caravan/DetoursandSurprises.json',
          lottieHeightScale: 110,
          lottiePlayWhenCentered: true,
          imageAspect: 'tall',
        },
        {
          eyebrow: 'Research',
          heading: 'Dominant personalities in chats',
          body: 'Researchers analyzed real-time group travel chats to track how preferences shift during planning. It’s one of the first studies to quantitatively examine how group decision-making unfolds over messaging. This screenshot from the study shows a dominant group leader steering the choices. Read the full study here.',
          bodyLinkText: 'here',
          bodyLinkHref: 'https://arxiv.org/pdf/2302.13463',
          image: '/images/work/google-caravan/chatchat.jpg',
          imageSize: 'small',
        },
        {
          eyebrow: 'Design Principles',
          heading:
            'Defining core principles to consider both car safety and the needs of groups making a decision',
          cards: [
            {
              title: 'Empowered Group Decision Making',
              body: 'Planning trips often leads to decision fatigue and scattered input across group chats. With anonymous voting options, groups can decide fairly while reducing pressure or bias.',
            },
            {
              title: 'Safety First',
              body: 'With each new idea, I carefully considered driver safety. I only included features that enhanced the experience without causing distraction.',
            },
            {
              title: 'Adapt to the realities of group travel',
              body: 'Group travel often has delays and detours. Caravan should keep everyone in sync by making it easy to share updates, track progress, and adapt plans on the go.',
            },
          ],
        },
        {
          eyebrow: 'New Specified Problem Statement',
          heading:
            'How can we help groups coordinate decisions and stay connected on the road, without relying on chaotic group chats or biased input?',
          centered: true,
        },
        {
          eyebrow: 'The Solution',
          heading: 'Google Caravan Mode',
          body: 'Stay in sync from start to finish. Make quick decisions with a group poll, see everyone\'s live location on the map, and get a summary of your journey at the end. Get to your festival, ski trip, or concert together, every time.',
          lottie: '/images/work/google-caravan/topheadercaravan.json',
          lottieScale: 1.2,
        },
        {
          eyebrow: 'Design Decisions',
          heading: 'Making a Simple Yet Effective Poll',
          body: 'A simple one step voting process with a limit of four choices to avoid decision fatigue. If none of the options work, users can add a "None" option. The design takes inspiration from Google Forms for familiarity and ease but I had fun digging into the history of radio buttons. Not sure what to ask? You can pick from a set of prompts to keep the trip spontaneous yet organized.',
          image: '/images/work/google-caravan/iPhone%2011%20Pro.svg',
          imageAspect: 'iphone-top',
          imageCrop: true,
        },
        {
          eyebrow: 'Design Decisions',
          heading: 'Vote with No Distractions',
          body: 'When you vote it appears on the app or as a notification. The anonymous voting brings equal decision power to everyone in the party versus someone dominating their ideas and preferences in the group chat. The votes are hidden while the poll is up because group cohesion can lead to silent dissent.',
          image: '/images/work/google-caravan/votecaravan.gif',
        },
        {
          eyebrow: 'Design Decisions',
          heading: 'Keeping All The Ducks In Line',
          body: 'Caravan Mode lets you see where everyone is on the map. If a car falls way behind, you\'ll get a heads-up, and you still keep your own directions going.',
          media: [
            { src: '/images/work/google-caravan/Progress%20Bar.svg' },
            { src: '/images/work/google-caravan/MapNotif2.jpg', crop: true, scale: 1.4 },
          ],
          caption:
            "If you need an emergency stop it'll only take 2 minutes and 34 seconds for the other cars to get notified",
        },
        {
          eyebrow: 'Design Decisions',
          heading: 'End Summary',
          body: 'After the trip, receive a curated summary of your journey’s key moments. This serves as a keepsake you can revisit and share with friends.',
          carousel: [
            '/images/work/google-caravan/Carousel1.svg',
            '/images/work/google-caravan/Carousel2.svg',
            '/images/work/google-caravan/Carousel3.svg',
            '/images/work/google-caravan/Carousel4.svg',
            '/images/work/google-caravan/Carousel5.svg',
          ],
        },
        {
          eyebrow: 'Explorations',
          heading: 'Trip Progress Bar - "Are we there yet?"',
          body: 'Visually see how far you are in the trip. But this clutters the space too much, and we already have an estimated time of arrival',
          image: '/images/work/google-caravan/Progress%20Bar.svg',
          imageSize: 'small',
        },
        {
          eyebrow: 'Explorations',
          heading: 'Send Pokes To Other Cars',
          body: 'Inspired by the classic facebook poke. However, it was ultimately decided that this would be too distracting to other users',
          lottie: '/images/work/google-caravan/Poke-Notif.json',
          lottieHeightScale: 140,
          imageAspect: 'note',
        },
        {
          eyebrow: 'The Journey',
          heading: 'Fun vs Focus: Finding the Middle Lane',
          body: 'After deciding on my HMW, I began with a wide range of silly, creative ideas. Trips should be fun! But after researching in-car UX and the risks of driver distraction, my focus shifted. The final design prioritizes simplicity, making it safer and easier for users to stay informed without losing focus on the road, while still keeping fun elements for after reaching the destination.',
          image: '/images/work/google-caravan/FunVsFocus.svg',
        },
        {
          eyebrow: 'Pitching my idea',
          heading: 'Prototype Meets Car Guys',
          body: 'I invited people from my university\'s car club to gather and test out the prototype on a Logitech car wheel controller and my laptop. I was able to gain some insight about how a user would physically interact with the feature.',
          media: [
            { src: '/images/work/google-caravan/IMG_9336.jpg', width: 340 },
            { src: '/images/work/google-caravan/IMG_9359.jpg', width: 340 },
          ],
        },
        {
          heading: 'Thank You for Reading!',
          body: 'I love this project and love to talk about it. Feel free to contact me to ask about the details and ideas that didn\'t make the cut. :)',
          image: true,
          imageAspect: 'small',
        },
      ],
    },
  },
  {
    slug: 'titan-rover',
    title: 'Titan Rover',
    tagline:
      'Designing an interface that helps operators make fast and confident decisions',
    tags: ['mobile', 'maps', 'prototype'],
    cover: '/images/work/titan-rover-cover.jpg',
    lottie: '/images/work/TitanRoverCover.json',
    column: 'right',
  },
  {
    slug: 'fullyhacks',
    title: 'FullyHacks',
    tagline: 'Reducing onboarding friction for hundreds of hackathon attendees.',
    tags: ['shipped', 'onboarding', 'leadership'],
    cover: '/images/work/fullyhacks-cover.jpg',
    column: 'left',
  },
  {
    slug: 'wordle-definition',
    title: 'Wordle Definition',
    tagline: 'Helping players understand unfamiliar words without leaving the game.',
    tags: ['mobile', 'maps', 'prototype'],
    cover: '/images/work/wordle-cover.jpg',
    lottie: '/images/work/Wordle.json',
    column: 'right',
  },
]
