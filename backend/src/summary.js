function buildChecklistSummary(items) {
  const byCategory = items.reduce((categories, item) => {
    categories[item.category] = (categories[item.category] || 0) + 1;
    return categories;
  }, {});

  const completed = items.filter((item) => item.status === 'ready').length;

  return {
    total: items.length,
    completed,
    pending: items.length - completed,
    byCategory,
  };
}

module.exports = {
  buildChecklistSummary,
};
