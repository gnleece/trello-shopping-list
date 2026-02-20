var storeLayout = null;

// Load store layout on startup
fetch('./store-layout.json')
  .then(function (res) { return res.json(); })
  .then(function (data) { storeLayout = data; });

TrelloPowerUp.initialize({
  'list-sorters': function (t) {
    return [{
      text: 'Sort by Store Aisle',
      callback: function (t, opts) {
        if (!storeLayout) {
          return { sortedIds: opts.cards.map(function (c) { return c.id; }) };
        }
        return { sortedIds: sortByStoreLayout(opts.cards, storeLayout) };
      }
    }];
  }
});
