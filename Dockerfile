FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN apk add --update git openssh
RUN npm ci --production
EXPOSE 4000
CMD node index.js
