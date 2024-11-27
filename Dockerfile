FROM node:21.1.0-alpine AS builder
WORKDIR /app

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++

COPY package*.json .
COPY .env .
COPY *.py .
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --omit=dev

FROM node:21.1.0-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/.env .
COPY --from=builder /app/*.py .
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]