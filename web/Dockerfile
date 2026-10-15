ARG NODE_VERSION=24.14.0-slim

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install project dependencies with frozen lockfile
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
else \
    echo "No lockfile found." && exit 1; \
fi

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

# Never comment the line below
ENV NEXT_TELEMETRY_DISABLED=1

# Build app
# use --mount=type=cache,target=/app/.next/cache
# if u want to cache
RUN if [ -f package-lock.json ]; then \
    npm run build; \
elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn build; \
elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm build; \
else \
    echo "No lockfile found." && exit 1; \
fi


FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production

# Never comment the following line 
ENV NEXT_TELEMETRY_DISABLED=1

# Copy production assets
COPY --from=builder --chown=node:node /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown node:node .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# If you want to persist the fetch cache generated during the build so that
# cached responses are available immediately on startup, uncomment this line:
# COPY --from=builder --chown=node:node /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER node

# Expose port 3000 to allow HTTP traffic
# EXPOSE 3000


# Start Next.js standalone server
CMD ["node", "server.js"]