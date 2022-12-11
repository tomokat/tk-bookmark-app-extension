import { createStore } from '@stencil/store';

function getBaseUrl() {
  return 'https://tk-bookmark-ap-prod-tk-app-suites-x4zh1h.mo4.mogenius.io/';
}

function getBookmarkApiPerEnvironment() {
  return `${getBaseUrl()}bookmark-api`;
}

const { state, onChange } = createStore({
  baseUrl: getBaseUrl(),
  bookmarkApi: getBookmarkApiPerEnvironment(),
  bookmarkDisplayType: 'Card',
  bookmarks: [],
  labels: [],
  loadedLabel: false,
  user: {
    email: ''
  }
});

onChange('loadedLabel', value => {
  console.log(`loadedLabel change detected [${value}]`);
});

export default state;