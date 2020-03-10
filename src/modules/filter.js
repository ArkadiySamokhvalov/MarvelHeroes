'use strict';

const filter = (data) => {
  const filter = document.getElementById('filter'),
    filterSelect = filter.querySelector('.filter__select'),
    filterResult = filterSelect.querySelector('.filter__result'),
    filterBlock = filter.querySelector('.filter__block'),
    filterSearch = filterBlock.querySelector('.filter__search'),
    filterList = filterBlock.querySelector('.filter__list'),
    filterItem = filterList.querySelector('.filter__item'),
    arrow = filterSelect.querySelector('b');

  const toggleFilter = () => {
    filterSelect.classList.toggle('filter__select_click');
    filterBlock.classList.toggle('filter__block_show');
    arrow.classList.toggle('arrow_click');
  };

  const getUniqueMovies = () => {
    let movies = {};
    data.forEach((item) => {
      if (item.movies) {
        item.movies.forEach(() => {
          item.movies.filter(index => movies.hasOwnProperty(index) ? false : movies[index] = true);
        });
      }
    });
    return movies;
  };

  // Список фильмов
  const createFilterItems = () => {
    const movies = Object.keys(getUniqueMovies()).sort();
    movies.push('No movies');
    filterList.innerHTML = '';

    for (let value of movies) {
      let item = filterItem.cloneNode();
      item.textContent = value;
      filterList.append(item);
    }
  };
  createFilterItems();

  // показ карточек при фильтрации
  const filterCards = (movieName = '') => {
    let regExp = new RegExp(`${movieName}`);

    document.querySelectorAll('.cards__item').forEach((item) => {
      if (movieName === '') {
        item.classList.remove('hide');
      } else if (movieName === 'No movies') {
        if (item.dataset.movies) {
          item.classList.add('hide');
        } else {
          item.classList.remove('hide');
        }
      } else {
        if (!item.dataset.movies) {
          item.classList.add('hide');
        } else {
          if (!regExp.test(item.dataset.movies)) {
            item.classList.add('hide');
          } else {
            item.classList.remove('hide');
          }
        }
      }
    });
  };

  document.body.addEventListener('click', (event) => {
    let target = event.target;

    if (filterBlock.classList.contains('filter__block_show')) {
      target = target.closest('#filter');
      if (!target) {
        toggleFilter();
      }
    }
  });

  filterSelect.addEventListener('click', () => {
    toggleFilter();
  });

  filterSearch.addEventListener('input', () => {
    const value = filterSearch.value,
      regExp = new RegExp(`^${value}`, 'i'),
      filterItems = filterList.querySelectorAll('.filter__item');

    filterItems.forEach((item) => {
      if (!regExp.test(item.textContent)) {
        item.style.display = "none";
      } else {
        item.innerHTML = text;
        item.style.display = "block";
      }
    });
  });

  filterBlock.addEventListener('click', (event) => {
    let target = event.target;
    let checked = filterBlock.querySelectorAll('.filter__item_checked');

    if (target.matches('.filter__item')) {
      checked.forEach((item) => {
        if (item !== target) {
          item.classList.remove('filter__item_checked');
        }
      });
      target.classList.toggle('filter__item_checked');

      if (target.matches('.filter__item_checked')) {
        filterResult.textContent = target.textContent;
        toggleFilter();
        filterCards(target.textContent);
      } else {
        filterResult.textContent = 'Select by movie name';
        filterCards();
      }
    }
  });

  filterBlock.addEventListener('mouseover', (event) => {
    if (event.target.matches('.filter__item')) {
      event.target.classList.toggle('filter__item_hover');
    }
  });

  filterBlock.addEventListener('mouseout', (event) => {
    if (event.target.matches('.filter__item')) {
      event.target.classList.toggle('filter__item_hover');
    }
  });
};

export default filter;