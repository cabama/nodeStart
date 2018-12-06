FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/jaguer
RUN mkdir -p /usr/src/jaguer/src
RUN mkdir -p /usr/src/jaguer/dist
RUN mkdir -p /usr/src/jaguer/public
WORKDIR /usr/src/jaguer

# Install Nodemon
RUN npm install -g tsc
RUN npm install -g concurrently
RUN npm install typescript -g

# Install Yarn
RUN npm i -g yarn 
RUN chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js

# COPY PROJECT SETTINGS
ADD webpack.config.js /usr/src/jaguer
ADD package.json /usr/src/jaguer
ADD tsconfig.json /usr/src/jaguer
ADD tslint.json /usr/src/jaguer
ADD src /usr/src/jaguer/src
ADD public /usr/src/jaguer/public

# FINALLY INSTALL PROYECT DEPS
RUN yarn
