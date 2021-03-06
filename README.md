[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#momos-assignment)

# Media Scraper

[![Typing SVG](https://readme-typing-svg.herokuapp.com/?lines=A+Simple+Web+Application+for+Scraping;Images+GIFs+Videos+URLs)](https://git.io/typing-svg)


https://user-images.githubusercontent.com/35064158/155927479-ab60e31b-7ddc-444d-9534-5c72246131b0.mp4


- [Introduction](#1-introduction)
- [Features](#2-features)
- [Technologies](#3-technologies)
- [Development mode](#4-development-mode)
- [Production mode](#5-production-mode)
- [Quick Start](#6-quick-start)
- [Docker](#7-docker)
- [Docker Compose](#8-docker-compose)
- [License](#9-license)

## 1. Introduction

This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React JS and the backend API is written using Express JS.

## 2. Features

- Support for Google OAuth2.0 Authentication.
- Input any website URL to search and scrape website media like Images, GIFs, Videos, etc.
- Display the scrape media onn the UI to easliy visualize the media data.
- Pagination support on the UI to easliy navigate media gallary.
- Search and filter the media data on the UI

## 3. Technologies

Media Scraper uses a number of open source projects to work properly:

- [React JS](https://redux.js.org/) - Popular frontend library to built SPA.
- [Redux JS](https://reactjs.org/) - Data-store solution for modern web apps.
- [Bootstrap](https://getbootstrap.com/) - Great UI boilerplate for modern web apps.
- [Node JS](https://nodejs.org/en/) - Evented I/O for the backend.
- [Express JS](https://expressjs.com/) - Fast node.js network app framework.
- [MongoDB Atlas](https://www.mongodb.com/) - Simplify Your Ops and Focus on Development. Reduce Admin Tasks With MongoDB Atlas.
- [Docker](https://www.docker.com/) - Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.

## 4. Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

> Note: 1. For development environment, You need to specify config/dev.js creds file with your own personal credentails

```bash
config/dev.js

// Development environments Keys
module.exports = {
  GOOGLE_CLIENT_ID: "XXXXXX", // Create a sample google project and generate clientId and ClientSecret.
  GOOGLE_CLIENT_SECRET: "XXXXXX", // Make sure to enable Google+ API from library.
  MONGOOSE_URI: "XXXXXX", // Create a sample MongoDB cluster either from mLab OR MongoDB atlas and generate remote URI.
  COOKIEKEY: "XXXXXXXXX", || Specify any random string like 'bfqefe3fg9fp984gfq9742g7g7f9v39vfeCEF8PGH8Bgu' :)
  SCOPE: ["profile", "email"], // This works in local but you need to specify right form of scopes from https://developers.google.com/identity/protocols/oauth2/scopes
  CALLBACK: "/auth/google/callback", // Update this as per your sample google project OR use the same callback in the google project.
};

```
> Note: 2. For development environment, while running docker-compose up, if you ended up see below error then the issue could be due to create-react-app version mismatch. You can find more details (here, proxying-api-requests)[https://create-react-app.dev/docs/proxying-api-requests-in-development/]

```bash
Proxy error: Could not proxy request /api/v1/current_user/data from localhost:3000 to http://localhost:5000
```
#### Recommendation:
1. Delete node_modules, package-lock.json and try restarting the docker-compose after installing node_modules.
2. Try without docker-compose like `npm run dev`
3. Repeat step 1 & 2


## 5. Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application. The entire application is already been deployed to heroku and all the creds have been configured already. Visit this site for live production application: https://web-media-scraper.herokuapp.com/

## 6. Quick Start

```bash
# Clone the repository
git clone https://github.com/MohdRafiUddin/momos-assignment

# Go inside the directory
cd momos-assignment

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm run start)
```

## 7. Docker

Media scraper is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 3000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd momos-assignment
docker build -t <youruser>/momos-assignment:${package.json.version} .
```

This will create the momos-assignment image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of momos-assignment.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 3000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 3000:3000 --restart=always --cap-add=SYS_ADMIN --name=momos-assignment <youruser>/momos-assignment:${package.json.version}
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3000
```

## 8. Docker Compose

Media scraper is very easy to install and deploy in a Docker container using docker compose.

```sh
cd momos-assignment
docker-compose build // Build all the images
docker-compose images // Check the images
docker-compose up // Spin up the docker container
docker-compose down // Spin down the docker container
```

## 9. License

ISC
