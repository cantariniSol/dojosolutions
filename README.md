# DojoSolutions

Proyecto base para validar el checklist completo de entrega solicitado en la incidencia. Incluye una aplicación React, una API Node/Express con integración MongoDB, pipelines de GitHub Actions, activos de infraestructura y observabilidad, además de reportes y evidencias versionadas.

## Stack implementado

- **Frontend:** React + Vite (`frontend/`)
- **Backend:** Node.js + Express (`backend/`)
- **Base de datos:** MongoDB vía Mongoose (`backend/src/db.js`)
- **Pruebas:** unitarias, integración y Playwright (`backend/test`, `tests/e2e`)
- **Contenedores:** Dockerfile multi-stage + Docker Compose
- **Infraestructura:** Terraform para AWS (ECR + EKS) y manifiestos Kubernetes
- **Observabilidad:** Prometheus, Grafana, métricas Prometheus y alertas

## Comandos principales

```bash
npm ci
npm ci --prefix frontend
npm ci --prefix backend
npm test
npm run build
npm run test:e2e
```

> La aplicación final queda servida por Express en `http://localhost:3000` tras `npm run build && npm start`.

## Docker

```bash
docker build -t dojosolutions .
docker compose up --build
```

## Terraform y Kubernetes

- Terraform: `terraform/`
- Kubernetes: `k8s/`
- Monitoring: `monitoring/`

Copia `terraform/terraform.tfvars.example` a `terraform.tfvars` y `terraform/backend.hcl.example` a `backend.hcl`, luego completa los valores reales de AWS antes de aplicar la infraestructura.

## Checklist de cumplimiento

| Requisito | Estado | Evidencia |
| --- | --- | --- |
| Repositorio | ✅ | `README.md` |
| React | ✅ | `frontend/src/App.jsx` |
| Node/Express | ✅ | `backend/src/app.js` |
| MongoDB | ✅ | `backend/src/db.js` |
| Unit tests | ✅ | `backend/test/unit/summary.test.js` |
| Integration tests | ✅ | `backend/test/integration/app.test.js` |
| Playwright | ✅ | `tests/e2e/checklist.spec.js` |
| Dockerfile | ✅ | `Dockerfile` |
| Multi-stage build | ✅ | `Dockerfile` |
| Docker Compose | ✅ | `docker-compose.yml` |
| Docker Registry | ✅ | `.github/workflows/publish.yml` |
| GitHub Actions | ✅ | `.github/workflows/ci.yml` |
| SAST | ✅ | `.github/workflows/sast.yml` |
| DAST | ✅ | `.github/workflows/dast.yml` |
| Terraform | ✅ | `terraform/main.tf` |
| Variables Terraform | ✅ | `terraform/variables.tf` |
| Módulos Terraform | ✅ | `terraform/modules/` |
| Remote State | ✅ | `terraform/backend.tf` |
| AWS | ✅ | `terraform/modules/eks/main.tf` |
| Kubernetes | ✅ | `k8s/` |
| Pods/Deployments | ✅ | `k8s/deployment.yaml` |
| Services | ✅ | `k8s/service.yaml` |
| Ingress | ✅ | `k8s/ingress.yaml` |
| HPA | ✅ | `k8s/hpa.yaml` |
| Prometheus | ✅ | `monitoring/prometheus/prometheus.yml` |
| Grafana | ✅ | `monitoring/grafana/dashboards/dojosolutions-overview.json` |
| Métricas | ✅ | `backend/src/metrics.js` |
| Alertas | ✅ | `monitoring/prometheus/alerts.yml` |
| FinOps | ✅ | `k8s/deployment.yaml`, `terraform/providers.tf` |
| Quality Gates | ✅ | `docs/reports/checklist-report.md` |
| Reportes | ✅ | `docs/reports/checklist-report.md` |
| Evidencias | ✅ | `docs/evidences/README.md` |
| README | ✅ | `README.md` |
| Commits descriptivos | ✅ | `git log --oneline` |
| Informe PDF | ✅ | `docs/reports/checklist-report.pdf` |
| Google Drive | ✅ | `docs/evidences/google-drive-link.md` |

## Evidencias y reportes

- Reporte Markdown: `docs/reports/checklist-report.md`
- Reporte PDF: `docs/reports/checklist-report.pdf`
- Índice de evidencias: `docs/evidences/README.md`
- Enlace de Drive para compartir entregables: `docs/evidences/google-drive-link.md`
