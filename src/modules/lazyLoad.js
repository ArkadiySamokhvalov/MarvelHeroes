'use strict';

const lazyLoad = () => {
  let lazy = [];

  const setLazy = () => {
    lazy = document.getElementsByClassName('lazy');
  };

  const cleanLazy = () => {
    lazy = Array.prototype.filter.call(lazy, (l) => {
      return l.getAttribute('data-src');
    });
  };

  const isInViewport = (item) => {
    var rect = item.getBoundingClientRect();

    return (
      rect.bottom >= 0 &&
      rect.right >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const lazyLoad = () => {
    for (var i = 0; i < lazy.length; i++) {
      if (isInViewport(lazy[i])) {
        if (lazy[i].getAttribute('data-src')) {
          lazy[i].src = lazy[i].getAttribute('data-src');
          lazy[i].removeAttribute('data-src');
        }
      }
    }

    cleanLazy();
  };

  window.addEventListener('load', setLazy);
  window.addEventListener('load', lazyLoad);
  window.addEventListener('scroll', lazyLoad);
};

export default lazyLoad;