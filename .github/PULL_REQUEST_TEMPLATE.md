# 📋 Pull Request

## ¿Qué hace este PR?

<!-- Describe brevemente el cambio y por qué es necesario -->

## Tipo de cambio

- [ ] `feat` — Nueva funcionalidad
- [ ] `fix` — Corrección de error
- [ ] `test` — Tests nuevos o modificados
- [ ] `docs` — Documentación
- [ ] `build` — Docker / dependencias / compilación
- [ ] `ci` — Pipelines de GitHub Actions
- [ ] `infra` — Terraform / infraestructura
- [ ] `ops` — Kubernetes / monitoring / despliegue
- [ ] `refactor` — Cambio interno sin modificar comportamiento
- [ ] `chore` — Mantenimiento general

## Checklist de calidad

### Código

- [ ] El código compila y la aplicación levanta sin errores
- [ ] No hay secretos ni credenciales en el código
- [ ] Las variables de entorno nuevas están documentadas en `.env.example`
- [ ] Se actualizó el README o la documentación en `docs/` si corresponde

### Testing

- [ ] Unit tests pasan (`npm test`)
- [ ] Integration tests pasan
- [ ] Se agregaron tests para la funcionalidad nueva
- [ ] E2E (Playwright) validados si el cambio afecta la UI

### Seguridad

- [ ] SAST sin vulnerabilidades nuevas que bloqueen el pipeline
- [ ] Dependencias nuevas justificadas y sin vulnerabilidades conocidas

### Docker / Infra

- [ ] `docker-compose up` levanta el entorno completo
- [ ] Las imágenes Docker construyen correctamente
- [ ] Cambios de Terraform validados con `plan` (si aplica)

## Evidencias

<!-- Screenshots, logs, reportes o links relevantes -->

## Notas para el revisor

<!-- Cualquier contexto extra que ayude a revisar este PR -->
