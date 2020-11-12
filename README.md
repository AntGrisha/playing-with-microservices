# Playing with microservices
This codebase was created spicifically for 11.11.2020 IT Talk.

Environment:
1. nodejs v14.x
2. redis running locally

## Serverless

Before running you need:
1. AWS Account
2. Create user for serverless - https://www.youtube.com/watch?v=tgb_MRVylWw&ab_channel=SimplyExplained (I do not recommend God Mode for Serverless in PROD)
3. Update your `.aws/credentials`
4. Enter your accounntId in config files for each service

Running:
1. `cd` into every folder in `serverless` (`client-service`, `consumer-service`, `message-service`).
2. `serverless deploy` for every folder
3. In order to clean up your account - `serverless remove`

## Moleculer

Runnning:
1. `cd ./moleculer/moleculer-demo`
2. `npm i`
3. `npm run dev`

You can also try and deploy it, however I suggest using their initial `moleculer-demo` example.
In order to pull it and start use this guide: https://moleculer.services/docs/0.14/usage.html
