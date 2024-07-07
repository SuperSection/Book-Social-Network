# Getting Started

- To start docker container
```shell
docker-compose up -d
// OR
docker-compose start
```

- To get PostgreSQL database details in Command Line
```shell
docker exec -it <container_name_or_id> psql -U <username> -h <host> -p <port> <database_name>
```