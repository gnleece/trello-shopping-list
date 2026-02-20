/**
 * Sort cards by store layout.
 * @param {Array} cards - Trello card objects with { id, name }
 * @param {Object} storeLayout - The store-layout.json data
 * @returns {string[]} - Sorted array of card IDs
 */
function sortByStoreLayout(cards, storeLayout) {
  var annotated = cards.map(function (card) {
    var result = categorize(card.name, storeLayout);
    return { id: card.id, sectionIndex: result.sectionIndex, itemIndex: result.itemIndex };
  });

  annotated.sort(function (a, b) {
    if (a.sectionIndex !== b.sectionIndex) return a.sectionIndex - b.sectionIndex;
    return a.itemIndex - b.itemIndex;
  });

  return annotated.map(function (c) { return c.id; });
}
