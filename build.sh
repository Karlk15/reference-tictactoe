export NODE_PATH=.
npm run clean                  # cleans directory by removing build folder if exist
npm run createbuild            # creates folder build if it does not exist
npm run buildclient            # enters client and does npm run build
mv client/build build/static   # move build from client to build static
cp -R server build/server      # copyies server and everything in it to build/server
mkdir -p build/client/src      # creates a folder and parent folder src if necessary
cp -r client/src/common build/client/src  # copies comon to client src and everything in it
cp run.js build                # copies run.js to build
cp runserver.sh build          # copies runserver.sh to build
