FROM node:20-alpine AS builder
WORKDIR /app

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++

RUN mkdir -p drizzle
COPY package*.json .
COPY *.py .
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/*.py .
COPY --from=builder /app/drizzle drizzle/
COPY --from=builder /app/static static/
COPY --from=builder /app/static/articles static/articles/
COPY --from=builder /app/static/images static/images/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]