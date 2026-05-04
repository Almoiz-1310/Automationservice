FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
ENV PORT=3000
ENV IDEMPOTENCY_BACKEND=file
ENV IDEMPOTENCY_FILE_DIR=/data/idempotency

RUN mkdir -p /data/idempotency

EXPOSE 3000

CMD ["node", "src/server.js"]
