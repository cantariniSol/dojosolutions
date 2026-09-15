const client = require('prom-client');

const metricsRegistry = new client.Registry();
client.collectDefaultMetrics({ register: metricsRegistry, prefix: 'dojosolutions_' });

const httpRequestDuration = new client.Histogram({
  name: 'dojosolutions_http_request_duration_ms',
  help: 'HTTP request duration in milliseconds.',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [25, 50, 100, 250, 500, 1000, 2000],
  registers: [metricsRegistry],
});

const evidenceCounter = new client.Counter({
  name: 'dojosolutions_evidence_created_total',
  help: 'Total number of evidence records created through the API.',
  registers: [metricsRegistry],
});

function observeRequestDuration(method, route, statusCode, durationMs) {
  httpRequestDuration.observe(
    {
      method,
      route,
      status_code: String(statusCode),
    },
    durationMs,
  );
}

function incrementEvidenceCounter() {
  evidenceCounter.inc();
}

module.exports = {
  metricsRegistry,
  observeRequestDuration,
  incrementEvidenceCounter,
};
