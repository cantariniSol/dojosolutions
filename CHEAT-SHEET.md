## 📋 Cheat-sheet completo — DojoSolution
Guardate esto. Es todo lo que necesitás para el día a día.

### 🌅 Empezar el día
docker compose up -d --build

Listo. A trabajar:

Frontend → http://localhost:8080
Backend → http://localhost:3000/api/health

🌙 Terminar el día
docker compose down

(No perdés datos — Mongo guarda todo en un volumen.)

### 🔄 Ver cambios de código
Qué cambiaste	Comando
Cambiaste código (front o back)	docker compose up -d --build
Instalaste una dependencia nueva (npm install)	docker compose up -d --build

### 🔍 Debuggear / ver qué pasa
docker compose ps                      # estado de los contenedores
docker compose logs -f backend         # logs del backend en vivo (Ctrl+C para salir)
docker compose logs -f frontend        # logs del frontend
docker compose logs --tail=50 mongo    # últimas 50 líneas de mongo
docker compose images                  # ver las imágenes construidas 
### 🧹 Reset / limpieza
# Frenar todo (conserva datos de Mongo)
docker compose down

# Frenar y BORRAR los datos de Mongo (⚠️ pierde las tareas)
docker compose down -v

# Levantar todo de cero
docker compose up -d --build 

### 🌐 URLs
Servicio	URL
Frontend	http://localhost:8080
Backend	http://localhost:3000/api

📦 npm (dentro de cada carpeta: frontend o backend)
npm run dev          # levantar local (sin Docker)
npm run build        # compilar
npm run lint         # verificar código (ESLint)
npm run typecheck    # verificar tipos (backend)
npx prettier --write .   # formatear todo el código

🗂️ Git (estrategia que definimos)
# Nueva tarea → rama corta desde main
git checkout -b feature/nombre-descriptivo

# Commits con Conventional Commits
git commit -m "feat(backend): add priority to tasks"

# Subir y abrir PR
git push -u origin feature/nombre-descriptivo

⚠️ Problemas comunes
Problema	Solución
"ports are not available" / puerto ocupado	Hay un proceso local usando el puerto. docker compose down o matá el proceso
No veo cambios en el browser	Hard refresh: Ctrl + Shift + R
"cannot connect to docker daemon"	Abrí Docker Desktop y esperá a que arranque
Cambios no aparecen tras rebuild	docker compose down && docker compose up -d --build
La regla de oro: siempre reconstruí con --build tras cambiar código o dependencias.