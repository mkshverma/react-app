# Use an official Node runtime as a parent image
FROM node:10.13-alpine

# Set the working directory to /app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install any needed packages specified in requirements.txt
RUN npm install && npm install -g concurrently

COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NAME development

# Run server when the container launches
CMD ["npm", "run","start"]
