FROM node:9.4.0

RUN mkdir -p /tesis
WORKDIR /tesis

COPY package.json package.json

RUN npm install -qy

COPY . /tesis

EXPOSE 3000

CMD ["npm", "start"]