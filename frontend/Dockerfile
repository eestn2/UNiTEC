# syntax=docker/dockerfile:1

ARG NODE_ENV=production

# Stage 1: Build the frontend (for production)
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 2: Serve with nginx (for production)
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development (hot reload)
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Final stage: select based on build arg
FROM production AS final
ARG NODE_ENV=production

# If development, use the dev image
FROM development AS final_dev
ARG NODE_ENV=development

# Use the correct final stage
# docker-compose will select the right target with the build args