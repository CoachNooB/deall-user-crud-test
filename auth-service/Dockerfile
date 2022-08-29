FROM node:16-alpine3.15

WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json

RUN npm install -g typescript
RUN npm install

EXPOSE 3100

RUN npm run build
CMD npm start