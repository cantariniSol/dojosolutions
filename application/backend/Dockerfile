# ---------- Stage 1: dependencias ----------
FROM node:26-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---------- Stage 2: build de producción ----------
FROM deps AS build
COPY . .
RUN npm run build

# ---------- Stage 3: producción (solo lo necesario) ----------
FROM node:26-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]
