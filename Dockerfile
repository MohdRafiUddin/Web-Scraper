# Dockerfile for Node Express Backend

# Build
FROM node:12.21.0 AS Developmennt

# Environment Variable
ENV NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["sh","-c", "npm run start"]