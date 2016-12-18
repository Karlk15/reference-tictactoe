FROM node
WORKDIR .
# copys everything from current directory
COPY . .
# notifies that node path is in current directory
ENV NODE_PATH .
# installs npm and does it silence
RUN npm install --silent
EXPOSE 80
# runs script runner.sh which runs two scripts migratedb and run.js
CMD ["./runner.sh"]
