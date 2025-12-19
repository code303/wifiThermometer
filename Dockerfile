# Build stage installs dependencies
FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY . .

# Runtime stage contains only production artifacts
FROM node:22-alpine AS runtime
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
EXPOSE 3003
CMD ["node", "server.js"]
