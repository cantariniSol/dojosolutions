# Checklist report

## Quality gates

- Unit tests: `npm run test:unit`
- Integration tests: `npm run test:integration`
- End-to-end tests: `npm run test:e2e`
- Build: `npm run build`
- Container build: `docker build -t dojosolutions .`
- SAST: `.github/workflows/sast.yml`
- DAST: `.github/workflows/dast.yml`

## Operational coverage

- Application stack: React frontend + Express backend + MongoDB integration.
- Delivery: multi-stage Dockerfile, Docker Compose and GHCR publish workflow.
- Infrastructure: Terraform with variables, modules, remote state and AWS EKS/ECR baseline.
- Platform: Kubernetes deployment, service, ingress and HPA.
- Observability: Prometheus scraping, Grafana dashboard, metrics and alerts.
- FinOps: resource requests/limits and `cost-center` tagging in Kubernetes/Terraform.

## Evidence index

| Requirement | Evidence |
| --- | --- |
| React | `frontend/src/App.jsx` |
| Node/Express | `backend/src/app.js` |
| MongoDB | `backend/src/db.js` |
| Playwright | `tests/e2e/checklist.spec.js` |
| Docker & multi-stage build | `Dockerfile` |
| GitHub Actions / SAST / DAST | `.github/workflows/*.yml` |
| Terraform / AWS | `terraform/` |
| Kubernetes / HPA | `k8s/` |
| Prometheus / Grafana / Alerts | `monitoring/` |
| PDF report | `docs/reports/checklist-report.pdf` |
| Google Drive | `docs/evidences/google-drive-link.md` |
