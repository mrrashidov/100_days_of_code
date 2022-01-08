# Hello world

### Run local php server
```
php -S localhost:8080 server.php
```
### OR
### Run local node server
```
yarn dev
```

### Try query
```
curl -d '{"query": "query { echo(message: \"Hello World\") }" }' -H "Content-Type: application/json" http://localhost:8080
```

### Try mutation
```
curl -d '{"query": "mutation { sum(x: 2, y: 2) }" }' -H "Content-Type: application/json" http://localhost:8080
```