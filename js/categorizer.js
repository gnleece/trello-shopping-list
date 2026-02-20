/**
 * Categorize a grocery item by matching card name against store layout keywords.
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

    // Check items array first (more specific match)
    for (var ii = 0; ii < section.items.length; ii++) {
      if (name.includes(section.items[ii].toLowerCase())) {
        return { sectionIndex: si, itemIndex: ii };
      }
    }

    // Then check keywords
    for (var ki = 0; ki < section.keywords.length; ki++) {
      if (name.includes(section.keywords[ki].toLowerCase())) {
        return { sectionIndex: si, itemIndex: Infinity };
      }
    }
  }

  // Uncategorized items sort to the end
  return { sectionIndex: Infinity, itemIndex: Infinity };
}
