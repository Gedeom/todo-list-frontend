# To do List

### Repository with the purpose of creating a to do list for knowledge testing

#### Stacks

* VUE 2.7+

#### Requeriments
* NODE 18.9+
* NPM 8.19+

#### Installation
```sh
cd todo-list-frontend
npm install
npm run lint
npm run dev
```

#### Docker
To do list repository is very easy to install and deploy in a Docker container.

```sh
cd todo-list-frontend
docker-compose up -d --build
docker-compose exec vue-ui sh
```
To access the website, go to the address below.

```sh
127.0.0.1:3000
```