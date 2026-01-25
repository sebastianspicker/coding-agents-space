FROM node:20-bookworm-slim

WORKDIR /skill

# Install deps (pinned versions in package.json). Best practice: add a lockfile once you're online.
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Drop privileges
RUN useradd -m -u 10001 runner
USER runner

WORKDIR /workspace
ENTRYPOINT ["node", "/skill/dist/index.js"]
