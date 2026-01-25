FROM node:20-bookworm-slim

WORKDIR /skill

RUN apt-get update \
  && apt-get install -y --no-install-recommends wget apt-transport-https ca-certificates \
  && wget -q https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb \
  && dpkg -i /tmp/packages-microsoft-prod.deb \
  && apt-get update \
  && apt-get install -y --no-install-recommends powershell \
  && rm -rf /var/lib/apt/lists/* /tmp/packages-microsoft-prod.deb

RUN pwsh -NoProfile -Command "Set-PSRepository -Name PSGallery -InstallationPolicy Trusted; Install-Module PSScriptAnalyzer -Scope AllUsers -Force" || true

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

RUN useradd -m -u 10001 runner
USER runner

WORKDIR /workspace
ENTRYPOINT ["node", "/skill/dist/index.js"]
