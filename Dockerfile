FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY .env .env
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]