# Hello world

### Run local test server
```
php -S localhost:8080 server.php
```

### Try query
```
curl -d '{"query": "query { echo(message: \"Hello World\") }" }' -H "Content-Type: application/json" http://localhost:8080
```

### Try mutation
```
curl -d '{"query": "mutation { sum(x: 2, y: 2) }" }' -H "Content-Type: application/json" http://localhost:8080
```