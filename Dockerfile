###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine AS development 
USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN yarn
COPY --chown=node:node . .

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine AS build
USER node
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN yarn && yarn cache clean

###################
# PRODUCTION
###################
from node:18-alpine as production

copy --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
copy --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/services/account-service/src/main.js"]
