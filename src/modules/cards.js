'use strict';

import decamelize from './decamelize';

const cards = (data) => {
  const cards = document.getElementById('cards'),
    cardsItem = cards.querySelector('.cards__item');

  const createCards = () => {
    cards.innerHTML = '';

    data.forEach((item) => {
      let card = cardsItem.cloneNode(true),
        facts = card.querySelector('.facts'),
        heroName = facts.querySelector('.facts__name'),
        factItem = facts.querySelector('.facts__item');

      facts.innerHTML = "";

      for (let key in item) {
        if (key === 'photo') {
          card.querySelectorAll('.lazy').forEach((img) => {
            img.dataset.src = item[key];
          });
        } else if (key === 'name') {
          let name = heroName.cloneNode();

          name.textContent = item[key];
          facts.append(name);
          card.querySelector('.lazy').alt = item[key];
        } else {
          let fact = factItem.cloneNode(true),
            factName = fact.querySelector('.facts__item_name'),
            factValue = fact.querySelector('.facts__item_value');

          factName.textContent = key[0].toUpperCase() + decamelize(key.substr(1), ' ') + ': ';
          factValue.textContent = item[key];
          facts.append(fact);
        }

        if (key === 'movies') {
          card.dataset.movies = item[key];
        }

        cards.append(card);
      }
    });
  };
  createCards();

  // Событие для разворота карточек
  cards.addEventListener('touchstart', (event) => {
    let target = event.target;

    if (target.matches('.flipper-container')) {
      target.classList.toggle('flipper-container_hover');
    }
  });
};

export default cards;