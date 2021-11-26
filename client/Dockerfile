FROM node:16.13-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Cache and Install dependencies
COPY package.json .
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent

# Copy app files
COPY . .

# Start the app
CMD [ "npm", "start" ]