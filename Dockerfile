FROM node
WORKDIR .
COPY . .
ENV NODE_PATH .
RUN npm install --silent
EXPOSE 80
CMD ["./runner.sh"]
