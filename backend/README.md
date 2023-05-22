## backend-coding-challenge

- If large number of points are added the system will slow down. This is due to the fact that it has to fetch the data from an external api for each point.

- We can ensure a good response time by using a Caching Mechanism like Redis and Asynchronously Processing of the forecast data using tools such as BullMQ, RabbitMQ or Celery.

## To run the project

update the `.env` file with your api key as show in the `.env.example` file

```bash
docker-compose up
```
