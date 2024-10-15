import SimpleParallax from "../node_modules/simple-parallax-js/dist/vanilla/simpleParallaxVanilla.es.js";

window.onload = function() {
  console.log("Page fully loaded with all resources");

  const image = document.getElementsByClassName('thumbnail');
  new SimpleParallax(image, {
    delay: 0,
    orientation: 'down',
    scale: 2,
    overflow: true,
    transition: 'cubic-bezier(0.42, 0, 0.58, 1)',
  });

};
