# Build stage
FROM node:20-alpine AS builder
# Define build argument for source path
ARG SRC_PATH=en
WORKDIR /app
# Enable corepack for pnpm
RUN corepack enable
# Copy package files
COPY ${SRC_PATH}/package.json ${SRC_PATH}/pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy source code
COPY ${SRC_PATH} .
# Build the application
RUN pnpm build
# Production stage
FROM nginx:alpine
# Copy built assets from builder stage to nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
