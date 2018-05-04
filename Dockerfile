FROM node:9.2 as node

WORKDIR /app

COPY package.json /app/

RUN npm i

COPY ./ /app/

EXPOSE 3000

ENV NODE_ENV production

CMD ["npm", "start"]
