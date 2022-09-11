FROM node:latest

WORKDIR /usr/app/

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    vim \
    unzip \
    git \
    curl \
    nano

COPY package*.json ./

RUN mkdir -p /app/node_modules

RUN npm config set unsafe-perm true

RUN npm install

RUN chown -R node /usr/app/node_modules

EXPOSE 3000

CMD ["npm", "run", "dev"]