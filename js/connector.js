import { sortByStoreLayout } from './sorter.js';

let storeLayout = null;

// Load store layout on startup
fetch('./store-layout.json')
  .then(res => res.json())
  .then(data => { storeLayout = data; });

window.TrelloPowerUp.initialize({
  'list-sorters': function (t) {
    return [{
      text: 'Sort by Store Aisle',
      callback: function (t, opts) {
        if (!storeLayout) {
          return { sortedIds: opts.cards.map(c => c.id) };
        }
        return { sortedIds: sortByStoreLayout(opts.cards, storeLayout) };
      }
    }];
  }
});
