# STAGE 1
FROM node:16-alpine as builder

WORKDIR /app

ADD . .
ADD .npmrc .
ADD package*.json .

RUN npm i && npm run build

# STAGE 2
FROM node:16-alpine as final

ENV NODE_ENV=production

WORKDIR /app

COPY --chown=node:node --from=builder /app/build/ /app/
# COPY --chown=node:node --from=builder /app/node_modules /app/node_modules
COPY --chown=node:node --from=builder /app/package*.json /app/
COPY --chown=node:node --from=builder /app/tsconfig.prod.json /app/tsconfig.json
COPY --chown=node:node --from=builder /app/tsconfig-paths.js /app/tsconfig-paths.js

RUN npm i --only=prod

USER node

EXPOSE 3000

CMD [ "npm", "start" ]
