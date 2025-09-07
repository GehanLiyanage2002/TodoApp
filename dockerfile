# ------------------------------
# Stage 1: Build React
# ------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Copy .env.production as .env so React build uses production variables
COPY .env.production .env

# Build the React app
RUN npm run build

# ------------------------------
# Stage 2: Serve via Nginx
# ------------------------------
FROM nginx:stable-alpine

# Copy custom Nginx config (mounted from ConfigMap or local)
COPY k8/frontend-nginx-config.yaml /etc/nginx/nginx.conf

# Copy the build output from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
