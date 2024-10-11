const parallaxGalaxy = {
    parallaxElements: [],
    selectors: {
      parallaxContainer: ".parallax-container",
      parallaxElement: "div[data-ease]",
    },
    applyParallax: function (elements) {

      
      window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        elements.forEach((items) => {
          items.forEach((ele) => {
            const opacity = ele?.dataset?.opacity - (scrollY / maxScroll);
            ele.style.transform = `translate(${ele?.dataset?.diagonally ? scrollY * ele?.dataset?.diagonally + 'px' : "0"} , ${scrollY * ele?.dataset?.ease}px) scale(${ele?.dataset?.scale ? (1 + scrollY * ele?.dataset?.scale)  : '1'}) rotate(${ele?.dataset?.rotate ? (1 + scrollY * ele?.dataset?.rotate) +'deg'  : '0deg'})`; 
            if(ele?.dataset?.opacity) {
              ele.style.opacity = opacity;
            }
          })
        });
      });
    },
    init: function () {
      let _self = this;
      const $mainParallaxElements = document.querySelectorAll(
        this.selectors.parallaxContainer
      );
      $mainParallaxElements.forEach((ele) => {
        _self.parallaxElements.push(
          ele.querySelectorAll(_self.selectors.parallaxElement)
        );
      });

      this.applyParallax(this.parallaxElements);
    },
  };
  parallaxGalaxy.init();