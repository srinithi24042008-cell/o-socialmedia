FROM node:22-slim

# ffmpeg-related native deps used by fluent-ffmpeg/@ffmpeg-installer, sharp
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN mkdir -p uploads && chown -R node:node /app
USER node

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "server.js"]
