const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const { createApp } = require('../../src/app');

function createRepository() {
  const items = [];
  return {
    async list() {
      return items;
    },
    async create(entry) {
      const item = { id: String(items.length + 1), ...entry };
      items.push(item);
      return item;
    },
  };
}

test('health endpoint reports API availability', async () => {
  const app = createApp({ evidenceRepository: createRepository() });
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(response.body.mongoConnected, false);
});

test('checklist endpoint returns all requirements with summary', async () => {
  const app = createApp({ evidenceRepository: createRepository() });
  const response = await request(app).get('/api/checklist');

  assert.equal(response.status, 200);
  assert.ok(response.body.items.length >= 30);
  assert.equal(response.body.summary.pending, 0);
});

test('evidence endpoint creates records when input is valid', async () => {
  const app = createApp({ evidenceRepository: createRepository() });
  const response = await request(app)
    .post('/api/evidences')
    .send({ title: 'Pipeline report', link: 'docs/reports/checklist-report.md' });

  assert.equal(response.status, 201);
  assert.equal(response.body.title, 'Pipeline report');
});
