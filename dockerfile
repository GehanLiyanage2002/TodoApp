# Stage 1: Build React
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files from root
COPY . .

# Copy .env.production so React uses production variables
COPY .env.production .env

# Build React app
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine

# Copy Nginx config from k8 folder
COPY k8/frontend-nginx-config.yaml /etc/nginx/nginx.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
