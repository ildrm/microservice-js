# microservice-js

1. Restore the database ( set the database name to `backend-test` ).
2. Run the gateway
3. Run the wallet
4. Open the APIs

To restore the database you can use the SQL file.

Gateway will run on port 3000
```
cd gateway
npm i
npm start
```

Wallet will run on port 3010
```
cd services/wallet
npm i
npm start
```

How to use:
Check balance for user_id=1
http://localhost:3000/user/1/balance

Add money (100) for user_id=2
http://localhost:3000/user/2/balance/add/100

You can also run the service on your docker environment.

Run the gateway:
```
cd gateway
docker-compose up --build
```

Run the wallet:
```
cd services/wallet
docker-compose up --build
```

Please consider that docker services are not using MySQL image.
MySQL should be installed on localhost:3306.
