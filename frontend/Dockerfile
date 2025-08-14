# syntax=docker/dockerfile:1

# --------------------------------------------------------
# Stage 1: Build the frontend
# --------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Build for production — assumes .env.production or build args are set
RUN npm run build

# --------------------------------------------------------
# Stage 2: Production runtime (nginx)
# --------------------------------------------------------
FROM nginx:alpine AS production
# Optional custom nginx config for SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# --------------------------------------------------------
# Stage 3: Development runtime (hot reload)
# --------------------------------------------------------
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# --------------------------------------------------------
# Default to production unless explicitly overridden
# --------------------------------------------------------
# Set the default target for `docker build`
# You must override with `--target development` if you want dev mode.
