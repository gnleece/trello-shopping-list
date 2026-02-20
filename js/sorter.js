import { categorize } from './categorizer.js';

/**
 * Sort cards by store layout.
 * @param {Array} cards - Trello card objects with { id, name }
 * @param {Object} storeLayout - The store-layout.json data
 * @returns {string[]} - Sorted array of card IDs
 */
export function sortByStoreLayout(cards, storeLayout) {
  const annotated = cards.map(card => ({
    id: card.id,
    ...categorize(card.name, storeLayout),
  }));

  annotated.sort((a, b) => {
    if (a.sectionIndex !== b.sectionIndex) return a.sectionIndex - b.sectionIndex;
    return a.itemIndex - b.itemIndex;
  });

  return annotated.map(c => c.id);
}
