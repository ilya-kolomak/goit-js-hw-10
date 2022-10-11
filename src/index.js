import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import { prewievCountriesMarkup, countryInfoMarkup } from './js/markup';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
let inputValue = '';

refs.inputRef.addEventListener(
  'input',
  debounce(onInputCountriesSearch, DEBOUNCE_DELAY)
);

function addPrewiewCountryMarkup(data) {
  const markup = data.map(prewievCountriesMarkup).join('');
  refs.countryListRef.innerHTML = markup;
}

function addCountryInfoMurkup(data) {
  const markup = data.map(countryInfoMarkup).join('');
  refs.countryInfoRef.innerHTML = markup;
}

function onInputCountriesSearch(e) {
  refs.countryListRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';
  inputValue = e.target.value.trim().toLowerCase();

  if (!inputValue) {
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length === 1) {
        addCountryInfoMurkup(data);
      } else if (data.length >= 2 && data.length <= 10) {
        addPrewiewCountryMarkup(data);
      } else {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      return Notify.failure('Oops, there is no country with that name');
    });
}
