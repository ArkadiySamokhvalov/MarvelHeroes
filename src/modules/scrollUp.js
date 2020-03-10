'use strict';

const scrollUp = () => {
  document.querySelector('.scrollup').addEventListener('click', (event) => {
    const blockID = event.target.closest('a').getAttribute('href').substr(1);
    event.preventDefault();
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
};

export default scrollUp;