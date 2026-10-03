# DojoSolutions

DojoSolutions es una aplicación web para gestionar tareas. Está compuesta por un frontend React/TypeScript, una API Node.js/Express y una base de datos MongoDB.

## Ejecutar localmente con Docker

Requisitos: Docker Desktop (con Docker Compose).

```bash
git clone https://github.com/cantariniSol/dojosolutions.git
cd dojosolutions
docker compose up -d --build
docker compose ps
```

- Aplicación: <http://localhost:8080>
- API: <http://localhost:3000/api>
- Estado de la API: <http://localhost:3000/api/health>
- Métricas expuestas por la API: <http://localhost:3000/metrics>

Ver logs y detener los servicios:

```bash
docker compose logs -f
docker compose down
```

Los datos de MongoDB se conservan en un volumen. Para borrarlos también:

```bash
docker compose down -v
```

## Qué utiliza el proyecto

- Dockerfiles multi-stage para construir imágenes de producción del frontend y backend.
- Docker Compose para levantar frontend, API y MongoDB en la red local.
- GitHub Actions para validar tipos, lint y compilación, construir las imágenes y ejecutar análisis con CodeQL y `npm audit`.
- El workflow de CD publica las imágenes en GitHub Container Registry (GHCR) al hacer push a `main`.
- La API incluye un endpoint `/metrics` preparado para exponer métricas.

## Estado y próximos pasos

El pipeline actual valida y publica imágenes, pero no realiza un despliegue automático en un clúster o entorno remoto. Para completar la infraestructura de la consigna faltan el provisioning con Terraform, manifiestos Kubernetes (incluidos Service, Ingress y autoescalado), configuración de Prometheus y dashboards de Grafana. También falta incorporar y ejecutar una suite de pruebas automatizadas; `npm audit` está configurado para informar auditorías, pero sus fallos no bloquean actualmente el workflow.
