# Start from a Node 20 base image
FROM node:23

# ENV NODE_VERSION 23.11.0

# Set the working directory
WORKDIR /app

# Copy the package manager files
COPY package*.json ./

# Install dependencies using yarn with --frozen-lockfile to ensure a clean lockfile state
# RUN npm install

# Copy Prisma schema and .env file (if necessary for Prisma usage)
# COPY ./prisma ./prisma
COPY .env .env

# Add NestJS CLI globally (optional if needed for development)
RUN npm add @nestjs/cli rimraf --force

# Copy the rest of the application source code
COPY . .

# RUN npx prisma db push --schema="./prisma/schema.prisma"

# Build the NestJS project
RUN yarn build
# Generate the Prisma client after building the project
# Push Prisma schema changes to the database (optional - consider moving this out of the Dockerfile for production)
# RUN npx prisma db push

# List the contents of the dist directory for verification
RUN ls -la dist

RUN apt-get clean
RUN apt-get purge

# Specify the command to run the application
CMD ["node", "dist/main.js"]










# # Base image
# FROM node:18-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# # Install app dependencies
# RUN yarn install --force

# # Bundle app source
# COPY . .

# # Copy the .env and .env.development files
# COPY .env ./

# # Creates a "dist" folder with the production build
# # RUN yarn run build


# # Expose the port on which the app will run
# EXPOSE 3001

# # Start the server using the production build
# # CMD ["yarn", "run", "start:prod"]
# CMD [ "node", "dist/main" ]