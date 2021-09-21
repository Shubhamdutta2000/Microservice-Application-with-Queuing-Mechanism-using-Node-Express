# Microservice-Application-using-Node-Js-Express-and-Queuing-Mechanism

A post-comment-mechanism application with queing mechanism where user can post and can post comments as well, the comments are monitored and are flagged when entered some keywords, where the event bus is created from scratch

## How to Use

```
git clone https://github.com/Shubhamdutta2000/Microservice-Application-with-Queuing-Mechanism-using-Node-Express.git

```

<br />

## Mock Result

![Mock_service](https://user-images.githubusercontent.com/62681943/134129738-4d383175-4b0e-45e1-8af7-598778d1e71c.png)

<br />

## All Services

### Post Service

![Post service](https://user-images.githubusercontent.com/62681943/134131324-1339865d-5e17-453b-af1e-fbea4313e9d2.png)

### How To Use

```
cd posts-service
npm i
npm start
```

<br />

### Comment Service

![comment service](https://user-images.githubusercontent.com/62681943/134131612-a5ddfba3-637d-4120-be03-ccfc157885ed.png)

### How To Use

```
cd comments-service
npm i
npm start
```

<br />

## Query Service

![query-service](https://user-images.githubusercontent.com/62681943/134131484-9539f7c1-bf49-4726-915a-f7e7583262cf.png)

### How To Use

```
cd query-service
npm i
npm start
```

<br />

## Event Bus Implementation

![eventbus implementation](https://user-images.githubusercontent.com/62681943/134131218-822386f5-6833-4cae-aa04-ddd72c00da92.png)

### How To Use

```
cd event-bus
npm i
npm start
```

<br />

## Filtering comment mechanism

![Comment filtering](https://user-images.githubusercontent.com/62681943/134130756-6c17ad17-f2a6-4528-8d24-a1ce7045e138.png)

<br />

![Comment filtering](https://user-images.githubusercontent.com/62681943/134130822-a47b5567-2081-4328-8df0-9c31520758e0.png)

### How To Use

```
cd moderation-service
npm i
npm start
```

<br />

## Issue with Missing Events

![Missing_Events](https://user-images.githubusercontent.com/62681943/134130986-44302b25-a6d7-40b0-9058-5f55350decb7.png)

<br />

## Dealing with Missing Events

- ### Store Events in Query-Service

![Dealing_with_Missing_Events](https://user-images.githubusercontent.com/62681943/134131070-f6d0849a-57d8-47fb-acaa-5a1f6b3eb964.png)
