Express & MongoDB based test REST API's
==================================

This is a straightforward boilerplate code using Express, NodeJS and mongoDB
MongoDB needs to be setup independently as docker support is still not added



Getting Started
---------------

```sh
# clone it
git clone https://vageesh@bitbucket.org/vageesh/test-api.git
cd test-code

npm init

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

```
Docker Support (Fails without running mongoDB instance )
------
```sh
cd test-code

# Build your docker
docker build -t test-code/api-service .

# run your docker
docker run -p 8080:8080 test-code/api-service

```

Test runs
-------
```sh
Loading test data:

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "south", "newState" : "green" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6cfbef2bbc7a88880f16","lightId":"2","newState":"1","tStamp":1597926651075,"__v":0,"id":"5f3e6cfbef2bbc7a88880f16"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "north", "newState" : "green" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d15ef2bbc7a88880f17","lightId":"0","newState":"1","tStamp":1597926677981,"meta":{"currState":{"2":1}},"__v":0,"id":"5f3e6d15ef2bbc7a88880f17"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "east", "newState" : "red" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d26ef2bbc7a88880f18","lightId":"1","newState":"0","tStamp":1597926694944,"meta":{"currState":{"0":1,"2":1}},"__v":0,"id":"5f3e6d26ef2bbc7a88880f18"}

curl --header "Content-Type: application"lightId" : "west", "newState" : "red" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d32ef2bbc7a88880f19","lightId":"3","newState":"0","tStamp":1597926706848,"meta":{"currState":{"0":1,"1":0,"2":1}},"__v":0,"id":"5f3e6d32ef2bbc7a88880f19"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "north", "newState" : "red" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d49ef2bbc7a88880f1a","lightId":"0","newState":"0","tStamp":1597926729955,"meta":{"currState":{"0":1,"1":0,"2":1,"3":0}},"__v":0,"id":"5f3e6d49ef2bbc7a88880f1a"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "south", "newState" : "red" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d5aef2bbc7a88880f1b","lightId":"2","newState":"0","tStamp":1597926746983,"meta":{"currState":{"0":0,"1":0,"2":1,"3":0}},"__v":0,"id":"5f3e6d5aef2bbc7a88880f1b"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "east", "newState" : "green" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d6eef2bbc7a88880f1c","lightId":"1","newState":"1","tStamp":1597926766223,"meta":{"currState":{"0":0,"1":0,"2":0,"3":0}},"__v":0,"id":"5f3e6d6eef2bbc7a88880f1c"}

curl --header "Content-Type: application/json"   --request POST   --data '{ "lightId" : "west", "newState" : "green" }'   http://localhost:8080/api/lightstates/logs/
{"_id":"5f3e6d7bef2bbc7a88880f1d","lightId":"3","newState":"1","tStamp":1597926779306,"meta":{"currState":{"0":0,"1":1,"2":0,"3":0}},"__v":0,"id":"5f3e6d7bef2bbc7a88880f1d"}



MongoDB data structure and records:

> db.lightstates.find()
{ "_id" : ObjectId("5f3e6cfbef2bbc7a88880f16"), "lightId" : "2", "newState" : "1", "tStamp" : 1597926651075, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d15ef2bbc7a88880f17"), "lightId" : "0", "newState" : "1", "tStamp" : 1597926677981, "meta" : { "currState" : { "2" : 1 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d26ef2bbc7a88880f18"), "lightId" : "1", "newState" : "0", "tStamp" : 1597926694944, "meta" : { "currState" : { "0" : 1, "2" : 1 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d32ef2bbc7a88880f19"), "lightId" : "3", "newState" : "0", "tStamp" : 1597926706848, "meta" : { "currState" : { "0" : 1, "1" : 0, "2" : 1 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d49ef2bbc7a88880f1a"), "lightId" : "0", "newState" : "0", "tStamp" : 1597926729955, "meta" : { "currState" : { "0" : 1, "1" : 0, "2" : 1, "3" : 0 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d5aef2bbc7a88880f1b"), "lightId" : "2", "newState" : "0", "tStamp" : 1597926746983, "meta" : { "currState" : { "0" : 0, "1" : 0, "2" : 1, "3" : 0 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d6eef2bbc7a88880f1c"), "lightId" : "1", "newState" : "1", "tStamp" : 1597926766223, "meta" : { "currState" : { "0" : 0, "1" : 0, "2" : 0, "3" : 0 } }, "__v" : 0 }
{ "_id" : ObjectId("5f3e6d7bef2bbc7a88880f1d"), "lightId" : "3", "newState" : "1", "tStamp" : 1597926779306, "meta" : { "currState" : { "0" : 0, "1" : 1, "2" : 0, "3" : 0 } }, "__v" : 0 }

Test to find light signal inconsistencies:

curl --header "Content-Type: application/json"   --request POST   --data '{ "query" : {"type" : "malfunction" , "startTime" : "2020-01-30", "endTime" : "2020-09-10"} }'   http://localhost:8080/api/lightstates/logs/search

{
   "north":[
      {
         "startTime":"2020-08-20T05:30:51-07:00",
         "endTime":"2020-08-20T05:31:17-07:00"
      },
      {
         "startTime":"2020-08-20T05:32:09-07:00",
         "endTime":"2020-08-20T05:32:46-07:00",
         "invalidState":"red"
      }
   ],
   "east":[
      {
         "startTime":"2020-08-20T05:30:51-07:00",
         "endTime":"2020-08-20T05:31:46-07:00"
      }
   ],
   "south":[
      {
         "startTime":"2020-08-20T05:30:51-07:00",
         "endTime":"2020-08-20T05:31:17-07:00",
         "invalidState":"green"
      },
      {
         "startTime":"2020-08-20T05:32:26-07:00",
         "endTime":"2020-08-20T05:32:46-07:00",
         "invalidState":"red"
      }
   ],
   "west":[
      {
         "startTime":"2020-08-20T05:30:51-07:00",
         "endTime":"2020-08-20T05:31:46-07:00"
      },
      {
         "startTime":"2020-08-20T05:32:46-07:00",
         "endTime":"2020-08-20T05:32:59-07:00",
         "invalidState":"red"
      },
      {
         "startTime":"2020-08-20T05:34:22-07:00",
         "invalidState":"red"
      }
   ]
}
```