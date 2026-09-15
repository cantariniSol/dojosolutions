const test = require('node:test');
const assert = require('node:assert/strict');
const { buildChecklistSummary } = require('../../src/summary');

test('buildChecklistSummary aggregates totals and categories', () => {
  const summary = buildChecklistSummary([
    { category: 'application', status: 'ready' },
    { category: 'application', status: 'ready' },
    { category: 'security', status: 'pending' },
  ]);

  assert.deepEqual(summary, {
    total: 3,
    completed: 2,
    pending: 1,
    byCategory: {
      application: 2,
      security: 1,
    },
  });
});
