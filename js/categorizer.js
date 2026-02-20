/**
 * Categorize a grocery item by matching card name against store layout keywords.
 * Keyword order in the array determines sort order within a section.
 *
 * @param {string} cardName
 * @param {Object} storeLayout
 * @returns {{ sectionIndex: number, itemIndex: number }}
 */
function categorize(cardName, storeLayout) {
  var name = cardName.toLowerCase().trim();
  var sections = storeLayout.sections;

  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];

    for (var ki = 0; ki < section.keywords.length; ki++) {
      if (name.includes(section.keywords[ki].toLowerCase())) {
        return { sectionIndex: si, itemIndex: ki };
      }
    }
  }

  // Uncategorized items sort to the end
  return { sectionIndex: Infinity, itemIndex: Infinity };
}
