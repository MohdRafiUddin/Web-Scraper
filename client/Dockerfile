# Dockerfile for React client

# Build
FROM node:12.21.0 AS Development

# Environment Variable
ENV NODE_ENV=development

# Working directory be app
WORKDIR /usr/src/client

COPY package*.json ./

# Installing dependencies
RUN npm install --silent

# Copy local files to app folder
COPY . .

# Build the client project
RUN npm run build

EXPOSE 3000

CMD ["sh","-c", "npm run start"]