# Play page gallery images

Currently wired in `src/pages/Play.jsx`: Group 1.jpg, ZenBook Duo 14.png, FullyBeyond.png, fullyhackz24.png, marchbmad.png, cakedrawing.png. Each renders at its real aspect ratio in a 3-column masonry grid; clicking any image opens it in a lightbox.

To add or swap images, edit the `items` array in `src/pages/Play.jsx` — each entry needs `src`, `alt`, and a `ratio` (width / height, so the masonry layout doesn't jump when the image loads).
