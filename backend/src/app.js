const fs = require('fs');
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const { checklistItems } = require('./checklist');
const { metricsRegistry, observeRequestDuration, incrementEvidenceCounter } = require('./metrics');
const { buildChecklistSummary } = require('./summary');

function createApp({ evidenceRepository, mongoReady = () => false, staticDir = path.resolve(__dirname, '..', 'public') } = {}) {
  const app = express();

  app.use(express.json());
  app.use((req, res, next) => {
    const startedAt = process.hrtime.bigint();

    res.on('finish', () => {
      const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
      observeRequestDuration(req.method, req.route?.path || req.path, res.statusCode, durationMs);
    });

    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      mongoConnected: mongoReady(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/checklist', (req, res) => {
    res.json({
      items: checklistItems,
      summary: buildChecklistSummary(checklistItems),
    });
  });

  app.get('/api/evidences', async (req, res, next) => {
    try {
      const items = await evidenceRepository.list();
      res.json({ items });
    } catch (error) {
      next(error);
    }
  });

  app.post('/api/evidences', async (req, res, next) => {
    try {
      const { title, link } = req.body ?? {};

      if (!title || !link) {
        return res.status(400).json({ message: 'title and link are required.' });
      }

      const item = await evidenceRepository.create({ title, link });
      incrementEvidenceCounter();
      return res.status(201).json(item);
    } catch (error) {
      return next(error);
    }
  });

  app.get('/metrics', async (req, res, next) => {
    try {
      res.set('Content-Type', metricsRegistry.contentType);
      res.end(await metricsRegistry.metrics());
    } catch (error) {
      next(error);
    }
  });

  if (fs.existsSync(staticDir)) {
    const documentLimiter = rateLimit({
      windowMs: 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    });

    app.use(express.static(staticDir));
    app.get(/^(?!\/api|\/metrics).*/, documentLimiter, (req, res) => {
      res.sendFile(path.join(staticDir, 'index.html'));
    });
  }

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Unexpected server error.' });
  });

  return app;
}

module.exports = {
  createApp,
};
