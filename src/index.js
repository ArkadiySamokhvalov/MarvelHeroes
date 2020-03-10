'use strict';

import cards from './modules/cards';
import lazyLoad from './modules/lazyLoad';
import filter from './modules/filter';
import scrollUp from './modules/scrollUp';

window.addEventListener('DOMContentLoaded', () => {
  fetch('../dbHeroes.json')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Ошибка HTTP: ' + response.status);
    }
  })
  .then((data) => {
    cards(data);
    lazyLoad();
    filter(data);
    scrollUp();
  })
  .catch((error) => {
    console.log(error);
  });
});