# Stage 1: Build the React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Ensure all dependencies are installed (including devDeps)
ENV NODE_ENV=development
RUN npm install

COPY . .
RUN ./node_modules/.bin/vite build


# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html


# Replace default nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
