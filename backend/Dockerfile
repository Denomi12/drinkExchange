FROM node:22-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
COPY dist ./dist
ENV NODE_ENV=production
CMD npx prisma migrate deploy && node dist/src/server.js
