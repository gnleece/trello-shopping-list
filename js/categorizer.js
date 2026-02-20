/**
 * @typedef {Object} CategoryResult
 * @property {number} sectionIndex - Index in sections array (Infinity if uncategorized)
 * @property {number} itemIndex - Index in section's items array (Infinity if not specifically listed)
 */

/**
 * Categorize a grocery item by matching card name against store layout keywords.
 *
 * Interface contract (for future LLM swap):
 *   Input:  cardName (string), storeLayout (object)
 *   Output: { sectionIndex: number, itemIndex: number }
 *
 * @param {string} cardName
 * @param {Object} storeLayout
 * @returns {CategoryResult}
 */
export function categorize(cardName, storeLayout) {
  const name = cardName.toLowerCase().trim();
  const sections = storeLayout.sections;

  for (let si = 0; si < sections.length; si++) {
    const section = sections[si];

    // Check items array first (more specific match)
    for (let ii = 0; ii < section.items.length; ii++) {
      if (name.includes(section.items[ii].toLowerCase())) {
        return { sectionIndex: si, itemIndex: ii };
      }
    }

    // Then check keywords
    for (const keyword of section.keywords) {
      if (name.includes(keyword.toLowerCase())) {
        return { sectionIndex: si, itemIndex: Infinity };
      }
    }
  }

  // Uncategorized items sort to the end
  return { sectionIndex: Infinity, itemIndex: Infinity };
}
