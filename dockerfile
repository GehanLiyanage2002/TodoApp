# Stage 1: Build React
FROM node:20-alpine AS build
WORKDIR /app

# Accept API URL as build argument
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./
RUN npm install
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine

COPY k8/frontend-nginx-config.yaml /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
