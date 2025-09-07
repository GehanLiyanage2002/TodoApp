# Stage 1: Build React
FROM node:20-alpine AS build
WORKDIR /app

# Accept API URL from build args
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the React app with provided API URL
RUN npm run build

# Stage 2: Serve via nginx
FROM nginx:stable-alpine

# Copy custom nginx config (with SPA routing fix)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
