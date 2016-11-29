FROM node
WORKDIR /code
COPY run.js .
COPY ./build/ .
COPY package.json .
ENV NODE_PATH=.
RUN npm install
EXPOSE 3000
CMD ["node","run.js"]
