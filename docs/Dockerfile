# Build stage
FROM oven/bun:latest AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy the rest of the docs and build
COPY . .
RUN bun run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
