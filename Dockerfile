FROM node                   #
WORKDIR .                   #
COPY . .                    # copys everything from current directory to imgage
ENV NODE_PATH .             # notifies that node path is in current directory
RUN npm install --silent    # installs npm and does it silence
EXPOSE 80                   #
CMD ["./runner.sh"]         # runs script runner.sh which runs two scripts migratedb and run.js
