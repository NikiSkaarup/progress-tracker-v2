# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest AS base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
# RUN bun test
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
WORKDIR /app

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/ .

ENV PORT=3010

ENV BEARER_TOKEN=$BEARER_TOKEN
ENV API_SERVICE_URL=$API_SERVICE_URL
ENV SQLITE_DB_PATH=$SQLITE_DB_PATH
ENV SQLITE_DB_NAME=$SQLITE_DB_NAME
ENV ORIGIN=$ORIGIN
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

# run the app
#USER bun
EXPOSE 3010/tcp

ENTRYPOINT [ "bun", "run", "start" ]
