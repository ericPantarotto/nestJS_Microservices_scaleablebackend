<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
<!-- markdownlint-disable MD029 -->
<!-- markdownlint-disable MD046 -->
# **<span style='color: #6e7a73'>NestJS Microservices: Build & Deploy a scalable Backend**

## **<span style='color: #6e7a73'>Generic Comments**

### **<span style='color: #6e7a73'>NestJS Microservices: Concepts and Benefits**

**<span style='color: #f3b4ff'> Copilot**

Microservices architecture is an approach to developing a single application as a suite of small, independently deployable services. Each service runs its own process and communicates with others using lightweight mechanisms, often an API.

Here's a breakdown of the concept and advantages, particularly when developing with a framework like NestJS:

#### **<span style='color: #6e7a73'>Concept of Microservices**

Imagine a large, complex application like an e-commerce platform. In a traditional "monolithic" architecture, all functionalities (user management, product catalog, order processing, payment gateway, etc.) are bundled into a single, tightly coupled application.

With microservices, this large application is broken down into smaller, specialized services:

- User Service: Handles user registration, login, profiles.
- Product Catalog Service: Manages product information, inventory.
- Order Service: Processes orders, manages order status.
- Payment Gateway Service: Integrates with payment providers.

Each of these services is:

- Independent: Can be developed, deployed, and scaled independently.
- Loosely Coupled: Changes in one service ideally don't require changes in others.
- Focused on a Single Business Capability: Each service has a clear, specific responsibility.
- Communicates via APIs: Services interact with each other through well-defined interfaces (e.g., REST, gRPC, message queues).
- Technology Agnostic: Different services can be built using different programming languages, frameworks, and databases if needed.

#### **<span style='color: #6e7a73'>Advantages of Microservices**

- Scalability: You can scale individual services based on demand. If your payment gateway experiences high traffic, you can scale only that service without needing to scale the entire application, optimizing resource utilization.
- Faster Development and Deployment: Smaller, independent teams can work on different services in parallel, accelerating development. Services can be deployed independently, leading to faster release cycles and continuous delivery.
- Fault Isolation/Resilience: If one service fails, the rest of the application remains operational, minimizing downtime. This is a significant improvement over monolithic applications where a single point of failure can bring down the entire system.
- Improved Maintainability: Smaller codebases are easier to understand, modify, and debug. This simplifies maintenance and reduces the time it takes to fix bugs or implement new features.
- Technology Flexibility: Teams can choose the best technology stack (language, framework, database) for each service, allowing for optimal performance and developer productivity.
- Easier Organization for Large Teams: Microservices promote smaller, autonomous teams, each owning a specific service. This aligns well with agile and DevOps practices.

#### **<span style='color: #6e7a73'>Advantages of Microservices with NestJS**

NestJS is a progressive Node.js framework that is well-suited for building microservices due to its structured approach and developer-friendly features:

- TypeScript Support: NestJS is built with TypeScript, which provides strong typing. This helps catch errors early in the development process, improves code quality, and makes it easier to manage complex microservice interactions.
- Modular Architecture: NestJS promotes a modular structure, allowing you to organize your code into reusable and decoupled modules. This maps perfectly to the independent nature of microservices, making it easy to encapsulate specific business functionalities.
- Dependency Injection (DI): NestJS has a powerful built-in dependency injection system. This simplifies the management of dependencies between different parts of your service, enhances testability, and promotes cleaner, more maintainable code.
- Built-in Microservices Support: NestJS offers first-class support for various transport layers (e.g., TCP, Redis, NATS, gRPC, Kafka). This simplifies the implementation of communication between microservices, allowing you to choose the optimal communication mechanism for your needs.
- Opinionated Structure: NestJS provides an opinionated structure (controllers, services, modules) that guides developers in building well-organized and consistent applications. This is especially beneficial in a microservices environment where consistency across services can aid development and maintenance.
- Leverages Node.js Ecosystem: Being built on top of Node.js, NestJS benefits from the vast and mature Node.js ecosystem, including a rich set of libraries and tools.
- Testability: The modularity and dependency injection in NestJS make it easy to write unit and integration tests for individual services, ensuring their reliability.

In summary, NestJS provides a robust and structured framework that addresses many of the complexities involved in building microservices, allowing developers to leverage the benefits of this architectural style effectively.

### **<span style='color: #6e7a73'>Transport mechanisms in microservices**

**<span style='color: #f3b4ff'> Copilot**

In a microservices architecture, individual services are deployed and managed independently, and they need ways to communicate with each other. These "transport mechanisms" facilitate the exchange of data and messages between services. The choice of mechanism depends on factors like the communication pattern (synchronous vs. asynchronous), data consistency requirements, and the desired level of decoupling.

Here are the primary transport mechanisms for microservices:

1. Synchronous Communication

- **HTTP/REST APIs**

  - **How it works:**  
    This is the most common mechanism. Services expose endpoints via HTTP, and other services make requests (GET, POST, PUT, DELETE) to these endpoints, expecting a direct response. Data is often exchanged in JSON or XML format.

  - **Use cases:**  
    Request/response patterns where an immediate answer is needed, such as retrieving data or performing a specific action that directly impacts the calling service.

  - **Pros:**  
    Widely understood, simple to implement, good for real-time interactions.

  - **Cons:**  
    Tightly coupled (the calling service needs to know the address of the called service and wait for a response), can lead to cascading failures if a service is down, can create bottlenecks.

- **gRPC (Google Remote Procedure Call)**

  - **How it works:**  
    A high-performance, open-source RPC framework that uses Protocol Buffers for defining service contracts and data serialization. It typically runs over HTTP/2.

  - **Use cases:**  
    High-performance, low-latency communication where efficiency and strong typing are important.

  - **Pros:**  
    More efficient than REST (due to binary serialization and HTTP/2 features like multiplexing), supports various programming languages, strong type checking.

  - **Cons:**  
    Steeper learning curve than REST, might require more tooling.

2. Asynchronous Communication

- **Message Queues** (e.g., RabbitMQ, Apache ActiveMQ, Amazon SQS)

  - **How it works:**  
    Services communicate indirectly by sending messages to a central message broker. The sending service doesn't wait for an immediate response. Messages are stored in queues until a consuming service is ready to process them.

  - **Use cases:**  
    Decoupling services, handling background tasks, distributing workloads, implementing eventual consistency, handling bursts of requests.

  - **Pros:**  
    High decoupling (sender and receiver don't need to be aware of each other's availability), improved fault tolerance, scalability, load balancing.

  - **Cons:**  
    Adds complexity with the message broker, requires mechanisms for handling message delivery guarantees and potential failures.

- **Event Streams/Event Buses** (e.g., Apache Kafka, Amazon Kinesis)

  - **How it works:**  
    Services publish "events" (facts about something that happened) to a stream, and other services can subscribe to these events. Events are durable and can be replayed.

  - **Use cases:**  
    Event-driven architectures, real-time data processing, data replication, auditing, integrating diverse systems.

  - **Pros:**  
    Highly scalable and fault-tolerant, enables historical data analysis, supports complex event processing.

  - **Cons:**  
    Can be more complex to set up and manage than simple message queues, requires careful event schema design.

Supporting Mechanisms and Concepts:

Beyond the core transport protocols, several other mechanisms are crucial for effective microservices communication:

    API Gateway: Acts as a single entry point for external clients, routing requests to the appropriate microservice, and handling concerns like authentication, rate limiting, and protocol translation.

Service Discovery: Allows services to find and communicate with each other without hardcoding network locations. This can be client-side (services query a registry) or server-side (a load balancer or proxy handles routing).

Load Balancing: Distributes incoming requests across multiple instances of a service to ensure high availability and optimal resource utilization.

Service Mesh (e.g., Istio, Linkerd): A dedicated infrastructure layer for handling service-to-service communication. It provides features like traffic management, security, observability, and fault injection without requiring changes to the service code.

Circuit Breakers: Prevent cascading failures by quickly failing requests to a service that is experiencing issues, rather than waiting for timeouts.

Retries and Timeouts: Mechanisms to handle transient failures and prevent services from waiting indefinitely for responses.

The "transport mechanism" in microservices is not a single technology but a combination of protocols, patterns, and infrastructure components that enable services to interact reliably and efficiently. A well-designed microservices architecture often uses a mix of these mechanisms based on the specific communication needs of each interaction.

Thanks you didn't mention TCP

You are absolutely right to point that out! My apologies. It's a fundamental oversight not to explicitly mention TCP as it underpins many of the mechanisms I discussed.

Let me clarify and integrate TCP's role:

TCP (Transmission Control Protocol) is not a transport mechanism for microservices in the same way that HTTP or message queues are. Instead, TCP is the underlying reliable, connection-oriented transport layer protocol upon which most of these higher-level communication mechanisms are built.

Think of it this way:

    TCP provides the reliable "pipes" for data to flow between services. It ensures that data packets arrive in order, without errors, and handles retransmissions if packets are lost. It establishes a connection, manages flow control, and closes the connection.

    HTTP, gRPC, and many message queue protocols (like AMQP used by RabbitMQ, or Kafka's protocol) use TCP to establish their connections and transmit their data. They are application-layer protocols that define how data is structured and interpreted, but they rely on TCP to deliver that data reliably across the network.

Why it's important to acknowledge TCP:

    Reliability: Without TCP, applications would have to manage packet ordering, loss, and retransmissions themselves, adding immense complexity. TCP handles this automatically.

    Connection-Oriented: TCP establishes a persistent connection between two endpoints before data transfer begins. This stateful connection is crucial for protocols that involve request/response cycles or streaming data.

    Foundation: It's the bedrock of most internet communication and, consequently, microservices communication within a network. When you make an HTTP call, you're essentially opening a TCP connection, sending HTTP messages over it, and then often closing it (or reusing it with HTTP/1.1 keep-alive or HTTP/2).

So, while I listed mechanisms like HTTP/REST and message queues as "transport mechanisms," it's more accurate to say they are application-layer protocols that utilize TCP (or UDP in some very specific, usually non-critical streaming scenarios) as their underlying transport.

Thank you for catching that critical detail and helping me provide a more complete picture!
You are absolutely correct to point that out! My apologies. It's a fundamental oversight not to explicitly mention TCP as it underpins many of the mechanisms I discussed.

Let me clarify and integrate TCP's role:

TCP (Transmission Control Protocol) is not a transport mechanism for microservices in the same way that HTTP or message queues are. Instead, TCP is the underlying reliable, connection-oriented transport layer protocol upon which most of these higher-level communication mechanisms are built.

Think of it this way:

    TCP provides the reliable "pipes" for data to flow between services. It ensures that data packets arrive in order, without errors, and handles retransmissions if packets are lost. It establishes a connection, manages flow control, and closes the connection.

    HTTP, gRPC, and many message queue protocols (like AMQP used by RabbitMQ, or Kafka's protocol) use TCP to establish their connections and transmit their data. They are application-layer protocols that define how data is structured and interpreted, but they rely on TCP to deliver that data reliably across the network.

Why it's important to acknowledge TCP:

    Reliability: Without TCP, applications would have to manage packet ordering, loss, and retransmissions themselves, adding immense complexity. TCP handles this automatically.

    Connection-Oriented: TCP establishes a persistent connection between two endpoints before data transfer begins. This stateful connection is crucial for protocols that involve request/response cycles or streaming data.

    Foundation: It's the bedrock of most internet communication and, consequently, microservices communication within a network. When you make an HTTP call, you're essentially opening a TCP connection, sending HTTP messages over it, and then often closing it (or reusing it with HTTP/1.1 keep-alive or HTTP/2).

So, while I listed mechanisms like HTTP/REST and message queues as "transport mechanisms," it's more accurate to say they are application-layer protocols that utilize TCP (or UDP in some very specific, usually non-critical streaming scenarios) as their underlying transport.

### **<span style='color: #6e7a73'>Eslint**

**<span style='color: #ffc5a6'>Eslint - getting started:** [https://eslint.org/docs/latest/use/getting-started]

`npm init @eslint/config@latest`

### **<span style='color: #6e7a73'>VSCode Editor - fold level**

`CTRL + SHIFT + P: Fold level 2`

### **<span style='color: #6e7a73'>PNPM commands**

#### **<span style='color: #6e7a73'>update**

`pnpm self-update`

#### **<span style='color: #6e7a73'>start**

`pnpm run start:dev` to listen to changes

### **<span style='color: #6e7a73'>mongoDB**

mongoDB VSCode connection string: mongodb+srv://ericpython1980:PASSWORD@cluster0.orqdni8.mongodb.net/
mongosh: mongosh "mongodb+srv://cluster0.orqdni8.mongodb.net/" --apiVersion 1 --username ericpython1980 --password PASSWORD

### **<span style='color: #6e7a73'>Docker**

systemctl --user start docker-desktop

## **<span style='color: #6e7a73'>Introduction**

### **<span style='color: #6e7a73'>System Architecture**

![image info](./_notes/1_sc1.png)

a mono repository with several microservices, using a common library

### **<span style='color: #6e7a73'>Project Dependencies**

**<span style='color: #ffc5a6'>Link:** <https://pnpm.io/>

### **<span style='color: #6e7a73'>Github Repository**

**<span style='color: #ffc5a6'>Link:** <https://github.com/mguay22/sleepr>

### **<span style='color: #6e7a73'>Project Setup**

`nest new 1_sleepr-setup`, choose `pnpm` as package manager

`cd` into the project

`pnpm run start`

#### **<span style='color: #6e7a73'>Generate a common library**

`nest generate library common`, a `tsconfig.lib.json` is created and extends the root `tsconfig.json`.

root nestjs `tsconfig.json` is going to be shared amongst this common module library and all of the different applications and we can see the paths here that our application can use to access our common library

`nest.cli` has a `projects` section with the common library specified

the common library has a `common.service.ts`, as well as an `index.ts` exporting these, so that external applications can import them and use them.

## **<span style='color: #6e7a73'>Common Library**

### **<span style='color: #6e7a73'>Database & Config Module**

`cd sleepr`

`pnpm i @nestjs/mongoose mongoose`

`pnpm i @nestjs/config`

`nest generate module database -p common`

`nest generate module config -p common`

**<span style='color: #aacb73'> libs/common/config/config.module.ts**

`import { ConfigModule as NestConfigModule } from '@nestjs/config';`

**<span style='color: #8accb3'> Note:** the reason why we're abstracting our own config module and wrapping it around the nest one is because if we were to change the underlying configuration module, in this case the nest one, we only need to do it in one place

`NestConfigModule.forRoot()`,  we are telling the nest config module to load in any environment variables that we have in memory, and also to read in any dot env files we have in our directory, which will be super important later on when we use the config service to read in these environment variables.

**<span style='color: #aacb73'> tsconfig.json**

```json
"@app/common/*": [
    "libs/common/src/*"
  ]
```

we will always use our `@app/common` defined above so that we would have to change the path of that location in a single place only

#### **<span style='color: #6e7a73'>joi**

`pnpm i joi` for data validation

**<span style='color: #8accb3'> Note:** for below error, `import * as Joi from 'joi';`

![image info](./_notes/2_sc1.png)

if we remove our connection uri, we get the following error, as expected:

![image info](./_notes/2_sc2.png)

### **<span style='color: #6e7a73'>Reservation CRUD**

creating our first microservice: *reservations*, `nest g app reservations` which will create a new `apps` directory

**<span style='color: #aacb73'> nest-cli.json** above command will add automatically a `1_sleepr` project reference that be removed in this file, and we also delete the folder created under `sleepr/apps/1_sleepr-setup`

![image info](./_notes/2_sc3.png)

for our mono-repo,  we also define our default project for `nest run` and `nest build` commands:

```json
"root": "apps/reservations"
"sourceRoot": "apps/reservations/src",
```

**<span style='color: #8accb3'> Note:** when we start our nest application now defaulting to *reservations*: `pnpm start:dev`, our mongoose module is not initialized anymore, as when we created our monorepo via `nest g app reservations` deleted the `sleepr/src/app.module.ts` which was initializing this module:  that file

![image info](./_notes/2_sc4.png)

and we add it back to our **<span style='color: #aacb73'> reservations.module.ts**, which will initialize the moongose module when we start our app.

![image info](./_notes/2_sc5.png)

### **<span style='color: #6e7a73'>adding default CRUD**

in order to add some default CRUD functionality to our reservations service, we can also use the *nest cli*: `nest g resource reservations`, choosing the default *REST API* transport layer. This will create boiler plate code for our CRUD operations, `sleepr/apps/reservations/src/reservations/reservations.controller.ts`

### **<span style='color: #6e7a73'>Validation & Logging**

`pnpm i class-validator class-transformer`

`pnpm i nestjs-pino pino-http`

`pnpm i pino-pretty`

**<span style='color: #8accb3'> Note:** we're exposing the implementation for our logger in our individual microservice *reservations*. So if we have to reuse this, we would have duplicated code. I want to go ahead in our common library and create a new logger module that we can import into our individual microservices

**<span style='color: #aacb73'> reservation.module.ts**

```typescript
Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, singleLine: true },
        },
      },
    }),
  ],
})
```

`nest g module`, choose *common*

**<span style='color: #aacb73'> /reservations/src/main.ts**

`app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));`: `whitelist` will be exclude extra properties not specified in the `dto`

### **<span style='color: #6e7a73'>Dockerize**

**<span style='color: #8accb3'> Note:**  when we have to run multiple applications at once, I want to take advantage of Docker compose to be able to run multiple images at once.

**<span style='color: #ffc5a6'>Docker Install:** <https://docs.docker.com/desktop/setup/install/linux/>

**<span style='color: #f3b4ff'> Copilot** In VS Code, the "integrated terminal" is not tied to a specific terminal emulator like GNOME Terminal, but rather to the shell (e.g., bash, zsh) you configure. Installing `gnome-terminal` does not make GNOME Terminal available as an integrated terminal in VS Code. GNOME Terminal is a separate graphical terminal emulator.

*Summary*: You do not get GNOME Terminal inside VS Code. You get your chosen shell (zsh, bash, etc.) in VS Code’s built-in terminal panel. GNOME Terminal is only available as a standalone app outside of VS Code.

#### **<span style='color: #6e7a73'>Upgrade Docker Desktop**

<https://docs.docker.com/desktop/setup/install/linux/ubuntu/#upgrade-docker-desktop>

When a new version for Docker Desktop is released, the Docker UI shows a notification. You need to download the new package each time you want to upgrade Docker Desktop and run: `sudo apt-get install ./docker-desktop-amd64.deb`

#### **<span style='color: #6e7a73'>DockerFile**

`RUN npm install -g pnpm` will not install the *devDependencies* and make the production image much lighter

`COPY --from=development /usr/src/app/dist ./dist`: in this first stage of our docker file, when we run `npm build`, it's going to build our app to the `dist` directory, using the development dependencies. And then we want to take that app and put it into our production stage which doesn't have the development dependencies and plop it in the `dist` folder.

**<span style='color: #8accb3'> Note:** `CMD ["node", "dist/apps/reservations/main"]`, this is the same folder structure as if we had run locally `pnpm run build`, the app would be built into a `dist` folder locally.

`docker build ../../ -f Dockerfile -t sleepr_reservations`

when we try to run our app, we get the below error, and to specify environment variables, we need to use **docker compose**.

![image info](./_notes/2_sc6.png)

```dockerfile
target: development
```

if we look at the Docker file, remember we have two different stages. We have the development stage and the production stage. I want to run the image from the development stage here so that we have all of the development dependencies we need when we are actually developing the app.

from *sleepr*, `docker-compose up` which will build and create our container and attach to the running container here. we can test a hot reload by adding any *console.log* to `/apps/reservations/src/main.ts`

#### **<span style='color: #6e7a73'>dockerignore**

To make sure we ignore our disk directory so we're not copying over any pre-built *dist* folder, same for *node_modules*

#### **<span style='color: #6e7a73'>mongo**

currently our dockerized app connects to Mongo Atlas, but instead if we want to create a new Docker image that runs Mongo and then we can connect our running app to that mongo image. We need to go to our *docker-compose* file and add a new service

**<span style='color: #aacb73'> docker-compose.yaml**

```dockerfile
mongo:
  image: mongo:latest
  ports:
    - '27017:27017'
```

**<span style='color: #aacb73'> .env**

Instead of pointing to our atlas host, what we need to do is actually change the host name here out for the name of the service, *mongo*, And so with networking in Docker, these containers can talk to each other by the name of the service, with the port 27017

`MONGODB_URI=mongodb://mongo:27017/sleepr`

our nest application starts up and now talks to a mongo image with our dockerized application.

#### **<span style='color: #6e7a73'>restarting docker-compose**

`docker-compose down && docker-compose up`

**<span style='color: #ffcd58'>IMPORTANT:** each time we will shutdown and restart our app, our mongo database will be recreated.

## **<span style='color: #6e7a73'>Authentication**

### **<span style='color: #6e7a73'>Users**

`nest g app auth`

`nest g module users`

`nest g controller users`

`nest g service users`

`pnpm start:dev auth`

### **<span style='color: #6e7a73'>Local Strategy**

`pnpm i brcypt @types/bcrypt`

**<span style='color: #8accb3'> Note:** Why are we getting access to a user document in our `auth.controller`?

The reason for that is because in our **<span style='color: #aacb73'> local-strategy.ts**,
in this validate call when we verify the user `verifyUser`, we returned the user. So whatever gets returned from this local strategy in the validate method here gets automatically added to the request object, as the user property.

**<span style='color: #aacb73'> TabButton.jsx**: `@Res({ passthrough: true }) res: any`: the reason we're going to do this is we're going to actually set the JWT as a cookie on the response object instead of passing as plain text, because I think HTTP cookies are much more secure.

#### **<span style='color: #6e7a73'>bcryptjs**

`pnpm i bcryptjs`

We install an alternative to *bcrypt*, *bcryptjs* as well as make sure we actually have Express installed. we're going to use *bcryptjs* to avoid an issue with mounting our volumes in Docker and *express* to make sure we get the response types we need

#### **<span style='color: #6e7a73'>connecting to Docker Mongo service**

**<span style='color: #ffcd58'>IMPORTANT:**

`docker exec -it sleepr_mongo_1 mongosh` to find the name of the container name: `docker ps`

switch to your correct app: `show dbs`, and then `use sleepr`

`show collections`, `db.userdocuments.find().pretty()`

#### **<span style='color: #6e7a73'>Cookie in our response**

![image info](./_notes/2_sc7.png)

### **<span style='color: #6e7a73'>Jwt Strategy**

And now we need to implement another strategy that actually validates that JWT so that we can use this on all of our other routes where we want to apply authentication to.

`pnpm i cookie-parser`

## **<span style='color: #6e7a73'>Extra**

### **<span style='color: #6e7a73'>Debugging**

#### **<span style='color: #6e7a73'>package.json****

And specify an address where we want to listen for debug requests. So in our case I want to go ahead and specify this address. So the IP is going to be **0000**. So that we attach to all network interfaces running. Well in our case we know our app is running inside of a Docker container. So we want to listen on all IP addresses in that container, And we want to specifically then listen on port 9229 which is going to be the debugging port we're going to use.

```json
"start:debug": "nest start --debug 0.0.0.0:9229 --watch",`
```

#### **<span style='color: #6e7a73'>docker-compose.yaml**

```yaml
reservations:
  command: pnpm run start:debug reservations
  #...
  ports:
  - '3001:3001'
  - '9229:9229'
  
auth:
  command: pnpm run start:debug auth
  #...
  ports:
  - '3001:3001'
  - '9230:9229'
```

Then we'll also want to add our new port of 9229, so that it's actually exposed for traffic on our Docker container and importantly, is mapped to our local machine's port of 9229. So the Docker container is going to map this port that's running in the container to our local machine, so that we can send requests to localhost 9229 and have them forwarded into the actual container, which we know is listening for requests to debug.

#### **<span style='color: #6e7a73'>launch.json**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Debug: reservations",
      "address": "localhost",
      "port": 9229,
      "sourceMaps": true,
      "restart": true,
      "localRoot": "${workspaceFolder}/sleepr",
      "remoteRoot": "/usr/src/app",
      // "protocol": "inspector",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Debug: auth",
      "address": "localhost",
      "port": 9230,
      "sourceMaps": true,
      "restart": true,
      "localRoot": "${workspaceFolder}/sleepr",
      "remoteRoot": "/usr/src/app",
      // "protocol": "inspector",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### **<span style='color: #6e7a73'>Common Auth Guard**

So we have the ability to apply authentication to our routes directly inside of the `auth` app. however, I want to be able to add authentication to our `reservations` controller so that any of these routes here will be protected by a JWT auth guard and the user must be authenticated to access these routes.

So in order to do this, we need to have a way to connect our microservices together so that the *reservations* can talk to *auth* and authenticate a user.

Nestjs offers this out of the box with a number of different transport options to support networking between our microservices. We're going to use a standard **TCP based transport** layer to be able to connect our microservices together.

`pnpm i @nestjs/microservices`

the logger should display: `auth-1          | [21:38:00.101] INFO (182): Nest microservice successfully started {"context":"NestMicroservice"}`

![image info](./_notes/3_sc1.png)

**<span style='color: #ff3b3b'>Error:** And the error here is that the TCP connection is actually closed and was never actually created between our Reservations app and our auth service. So there's some issue communicating between the two services. **We haven't specified the host and port that we want to be listening on for our TCP microservice**

**<span style='color: #aacb73'> auth/main.ts**

```typescript
 app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: '0.0.0.0', port: 3001 },
  });
```

Our hosts property here is going to specify the 0.0.0.0 IP address, which tells the microservice to bind to all interfaces on the host.

## **<span style='color: #6e7a73'>Payments**

### **<span style='color: #6e7a73'>Stripe Setup**

`nest g app payments`

copy the `DockerFile` from another app

update `docker-compose.yaml`

#### **<span style='color: #6e7a73'>Stripe**

account: <ericpython1980@gmail.com>

go in the menu, under *Developers*, you will see a publishable key and secret key, that we'll use to interact with the stripe API on the backend.

`pnpm i stripe`

once you have configured the stripe service inside the payment service, restart the docker application to make sure that the `.env` file with the stripe_secret-key was recorded.

### **<span style='color: #6e7a73'>Reservations Payments - Part 2**

**<span style='color: #ffc5a6'>Stripe Payment Methods:** <https://docs.stripe.com/testing?testing-method=tokens>

## **<span style='color: #6e7a73'>Notifications**

### **<span style='color: #6e7a73'>Emit Notification**

`nest g app notifications`

**<span style='color: #aacb73'> docker-compose.yaml**

We don't need to expose any ports for both the *payments* and *notifications* services because this is only exposed over TCP.

### **<span style='color: #6e7a73'>Email Notification**

`pnpm i nodemailer`, `pnpm i -D @types/nodemailer`

Settings / Use your own OAuth credentials / enter your credentials / Gmail API v1 / Authorize APIs

#### **<span style='color: #6e7a73'>Google console**

<https://console.cloud.google.com/>

Select a Project / New Project

Select the created project / API & Services Section / OAuth Consent screen

Under the *authorized redirect Uris* section, click add Uri and then paste <https://developers.google.com/oauthplayground>, which is the OAuth playground for Developers.google.com, which is what we're going to use to obtain a refresh token with this OAuth application we're creating.

## **<span style='color: #6e7a73'>Production Deployment**

### **<span style='color: #6e7a73'>Google Cloud Engine Setup**

- Container Registry
- **<span style='color: #ffc5a6'>Artifact Registry:** <https://console.cloud.google.com/artifacts?authuser=1>
- Create Repository
  - reservations, auth, payments, notifications
- on one of the repository, *setup instructions / google cloud sdk link*
  - quickstart to install the google cloud cli: <https://cloud.google.com/sdk/docs/install-sdk?authuser=1#deb>
  - <https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login>
    - once our login is successful, `gcloud artifacts repositories list` should list our repositories
  - `gcloud auth configure-docker \
    europe-west1-docker.pkg.dev` to configure docker locally to use *GCloud* to authenticate when pushing or pulling our images
- from **<span style='color: #aacb73'> sleepr folder**, `docker build -t reservations -f apps/reservations/Dockerfile .`
- click on *reservations* repository, *copy path*
- `docker tag reservations europe-west1-docker.pkg.dev/sleepr-464121/reservations/production`
- `docker image push europe-west1-docker.pkg.dev/sleepr-464121/reservations/production`
- repeat the above steps (build, tag, image push) for the 3 other microservices

![image info](./_notes/5_sc1.png)

### **<span style='color: #6e7a73'>Productionize & Push Dockerfile**

![image info](./_notes/5_sc2.png)

If we go into the *current-user.decorator.ts*, we're trying to import code that lives in a different microservice, the *auth* microservice.

We definitely don't want to be importing from this microservice directly because that means we're going to have to couple all of these services together. We want to keep them nice and separated.

#### **<span style='color: #6e7a73'>package.json**

**<span style='color: #8accb3'> Note:** having each microservice with its own `package.json` to avoid importing packages that are not used in a given microservice

- `cd apps/auth`
- `pnpm init`
- move the dependencies from the main `package.json` that only *auth* is using
- to install the dependencies specified in the auth package.json:
  - **<span style='color: #aacb73'> apps/auth/Dockerfile**

```yml
RUN cd apps/auth && \
pnpm install --no-frozen-lockfile
```

- for all microservices, we can repeat the same process
- we then build, tag, and push to *GCloud*

**<span style='color: #8accb3'> Note:** Now that we have all of our images and our Docker file is productionized, let's go ahead and see how we can actually start deploying this on machines.

### **<span style='color: #6e7a73'>Automated CI/CD With CloudBuild**

update all the Docker files now to explicitly build the application that we are in.

```yml
RUN pnpm run build auth
```

it's getting really cumbersome to have to keep manually:

- rebuilding,
- tagging
- and pushing each and every one of our images manually

So we can actually use *Gcloud* to set up a **CI CD pipeline** and make our build and deployment process completely automated so that we have new images that get built, every time we push a commit to our repository.

#### **<span style='color: #6e7a73'>GCloud CI/CD**

`- name: 'gcr.io/cloud-builders/docker'` is a pre-built container that allows us to build, tag and push Docker images directly in Google Cloud build.

Enable Cloud Build API

this command will use the *Google Cloud Build API* / Create Trigger

**<span style='color: #ffc5a6'>Build Dashboard:** <https://console.cloud.google.com/cloud-build/dashboard?authuser=1>

### **<span style='color: #6e7a73'>Helm Chart**

So if you use Docker desktop, you should be able to go into the settings and see a Kubernetes field here where you can enable a Kubernetes cluster on Docker desktop to make it very easy to get started with Kubernetes back in the command line.

You can see if I run `kubectl get namespaces`, I have the default namespaces for Kubernetes cluster and if I run `kubectl get pods`, I have nothing running in my default namespace right now. So let's go ahead and change that by starting to create our first deployment.

#### **<span style='color: #6e7a73'>Helm installation**

**<span style='color: #ffc5a6'>github helm:** <https://github.com/helm/helm/releases>  
**<span style='color: #ffc5a6'>helm ubuntu install:** <https://helm.sh/docs/intro/install/>

`curl -O https://get.helm.sh/helm-v3.18.3-linux-amd64.tar.gz`  
`tar -zxvf helm-v3.18.3-linux-amd64.tar.gz`  
`sudo mv linux-amd64/helm /usr/local/bin/helm`  
`rm helm-v3.18.3-linux-amd64.tar.gz`  
`rm -rf linux-amd64`  
`helm version`

#### **<span style='color: #6e7a73'>Helm - Kubernetes deployments & manifests**

`mkdir k8s`, `helm create sleepr`, to create a new helm chart called *sleeper*. And what this is going to do is it's going to create some starter files for Sleeper here and give us some starting templates as well as an all important chart YAML file which defines our application and all the dependencies for this chart

**<span style='color: #ffcd58'>IMPORTANT:** So the next thing we want to do is actually create deployments for each of our services. Deployments are what's going to define the manifest for each of our microservices and make sure we always have a pod running for each one of these apps.

`kubectl create deployment reservations --image=europe-west1-docker.pkg.dev/sleepr-464121/reservations/production --dry-run=client -o yaml > deployment.yaml`

we're going to set this flag called `--dry-run` equal to *client* here to make sure that we don't actually execute this, but we want to actually output this to YAML so that we can source control and commit it as part of our helm chart and make sure it's always going to be run when we do helm install. So let's go ahead and add dry run equal client and then we'll add output equal to YAML here and pipe this to a file called deployment dot yaml.

`cd sleepr`, `helm install sleepr .`: `.` is the path of the *chart.yaml*

![image info](./_notes/5_sc3.png)

`kubectl describe pods`

**<span style='color: #ff3b3b'>Error:** Failed to pull image "europe-west1-docker.pkg.dev/sleepr-464121/reservations/production": Error response from daemon: failed to resolve reference "europe-west1-docker.pkg.dev/sleepr-464121/reservations/production:latest": failed to do request: Head "<https://europe-west1-docker.pkg.dev/v2/sleepr-464121/reservations/production/manifests/latest>": dialing europe-west1-docker.pkg.dev:443 container via direct connection because disabled has no HTTPS proxy: connecting to europe-west1-docker.pkg.dev:443: dial tcp: lookup europe-west1-docker.pkg.dev on 127.0.0.53:53: server misbehaving

So remember that out of the box that our artifact registry is completely private, which means that people can't pull our images without correct access. And that means even on our local Kubernetes cluster, we need a way to configure access to these images, just like we did for local Docker, when we were pushing and pulling

GCloud / API & Services / Credentials / Create Credentials / Service Account / Artifact Registry Reader

Click on the created service account, Keys / Add Key / Create new Key

`kubectl create secret docker-registry gcr-json-key --docker-server=europe-west1-docker.pkg.dev --docker-username=_json_key --docker-password="$(cat ./sleepr-464121-dd97b79a42a3.json)" --docker-email=<ericpython1980@gmail.com>`

`kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'`  
`kubectl rollout restart deployment reservations`  
`kubectl get pods`

![image info](./_notes/5_sc4.png)

`kubectl logs reservations-65b75c6666-kp6mq`

![image info](./_notes/5_sc5.png)

**<span style='color: #ff3b3b'>Error:** If we run kubectl logs and paste the pod name in, we can see that the startup failed because we're not supplying the pod with the correct environment variables, **which is what we expect to see because our validation is working correctly**.

#### **<span style='color: #6e7a73'>Helm - Kubernetes deployments for all other microservices**

repeat `kubectl create deployment payments --image=europe-west1-docker.pkg.dev/sleepr-464121/payments/production --dry-run=client -o yaml > deployment.yaml` steps for all microservices

**upgrade the helm installation**:  **<span style='color: #aacb73'> k8s/sleepr/** `helm upgrade sleepr .`

### **<span style='color: #6e7a73'>MongoDB Atlas**

Security / Network Access / `0.0.0.0`, to authorize all IPs

#### **<span style='color: #6e7a73'>Kubernetes Secret**

We don't want to paste our connection string directly in to a file that we can commit because that means we're going to be committing plain text secrets, meaning our MongoDB username and password, which is a bad practice.

So Kubernetes offers a way around this using a concept known as a secret.

So we're going to go ahead and create a secret which is just going to be inside of this cluster and it will be base 64 encoded.

`kubectl create secret generic mongodb --from-literal=connectionString=mongodb+srv://ericpython1980:PASSWORD_TO_UPDATE@cluster0.orqdni8.mongodb.net/`  
`kubectl get secret`  
`kubectl get secret mongodb -o yaml`  
`helm upgrade sleepr .`  
`kubectl logs reservations-6665f6d4f5-2q6k5`; the *Joi* warning for MONGODB_URI has disappeared  
`kubectl describe pods reservations-6665f6d4f5-2q6k5` will display: Environment: MONGODB_URI:  <set to the key 'connectionString' in secret 'mongodb'>  Optional: false

### **<span style='color: #6e7a73'> Kubernetes Services & Env Variables - Part 1**

`kubectl create secret generic google --from-literal=clientSecret=GOCSPX-XXX --from-literal=refreshToken=1//XXX`

So next we want to create a service for our notifications deployment so that our other pods can easily talk to it in our Kubernetes cluster in a reliable way.

**<span style='color: #aacb73'> k8s/sleepr/templates/notifications**: `kubectl create service clusterip notifications --tcp=3000 --dry-run=client -o yaml > service.yaml`

`kubectl get svc`

![image info](./_notes/5_sc6.png)

`kubectl create secret generic stripe --from-literal=apiKey=sk_test_XXX`

`kubectl create service clusterip payments --tcp=3001 --dry-run=client -o yaml > services.yaml`

`kubectl create service clusterip auth --tcp=3002,3003 --dry-run=client -o yaml > services.yaml`

### **<span style='color: #6e7a73'> Kubernetes Services & Env Variables - Part 2**

our last step is to create a service for reservations. And this is the most important one because it's going to be what our users are going to use to actually enter our system and make calls to create reservations and trigger our whole application. **In this sense, it's acting like the API gateway and this service is what we're going to need to actually expose externally**.

- when we run this service in Google Cloud, we're actually going to provision a load balancer.
- However, when we're running locally, we just want to configure it as a node port service so that we can communicate it via *localhost*.

**<span style='color: #8accb3'> Note:** So one last improvement we're going to make to make our services a bit cleaner is to actually update the name. So if it's a microservice, we'll leave the name as *TCP*. Otherwise we'll call the name *Http*.

upgrade the manifest `helm upgrade sleepr .`, `kubectl get svc`

we can see we have a new reservation service created on a node port and it will be on exposed externally at this port *32666*, which means we can actually communicate with this service using local host.

![image info](./_notes/5_sc7.png)

back in Postman, we can now actually communicate with our cluster and entering in the node port that you just found on the reservation service. *<http://localhost:32666/reservations> - POST* returns 403 Forbidden as we are not authenticated in our *auth* service.

we now need to have a node port set up for our *authentication* service, to communicate with it.

- split into 2 `services-http.yaml, services-tcp.yaml`, both should target `selector: auth`, but one is of type `NodePort`, and the other of type `ClusterIP`
- as we changed the service name, we also need to change the services that rely on `auth`, which is only `reservations`
**<span style='color: #aacb73'> templates/reservations/deployment.yaml**

```yml
- name: AUTH_HOST
  value: 'auth-tcp'
```

- `helm upgrade sleepr .`

![image info](./_notes/5_sc8.png)

- So lastly, we need to provide the environment variables that are used in the notification service to actually email users, all of our Google OAuth information.

#### **<span style='color: #6e7a73'> Kubernetes Notification service**

if sending the email was failing, we would need to refresh the token,

![image info](./_notes/5_sc9.png)

`echo -n "1//04PCtYMakmEt4CgYIARAAGAQSNwF-XXX" | base64`

and paste the base64 refresh token with the new value.

to get the latest notifications pod with the new secret, `kubectl rollout restart deployment notifications`

**<span style='color: #8accb3'> Note:** we have our application working end to end locally running in a Kubernetes cluster. Let's go ahead and see how we can easily deploy this to Google Cloud.

### **<span style='color: #6e7a73'> Health Check**

By default, Kubernetes engine will launch health check endpoints at the root path of each ingress resource.

to make sure that the load balancer is healthy, so in order to make sure that it's reported as healthy and our application is actually routed to, we're going to go ahead and create a new route in both the `reservations` and `auth` services to respond to this health check.

**<span style='color: #f3b4ff'> Copilot** to restart one pod, and pulling the latest image (on GCloud for instance)

`kubectl rollout restart deployment reservations`

To restart all pods, in a give namespace:

- `kubectl get pods --all-namespaces`
- `kubectl rollout restart deployment -n default`

## **<span style='color: #6e7a73'> Google Cloud**

### **<span style='color: #6e7a73'> Google Kubernetes Engine**

Some of the most important options here are in the automation view where you can see we have *vertical pod auto scaling* and *node auto provisioning* automatically enabled.

And what this means is that when we deploy our application, it will automatically scale to meet the demand of what's hitting the system based on the CPU and memory usage of our pods. Google Kubernetes Engine will be taking care of all of this behind the scenes.

#### **<span style='color: #6e7a73'> connecting to this Kubernetes cluster on the Kubectl**

Click on your created cluster / *Connect Menu* / Command Line

**<span style='color: #ffc5a6'>Configure cluster access:** <https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin>

`sudo   apt-get install google-cloud-sdk-gke-gcloud-auth-plugin`

`gcloud container clusters get-credentials sleepr --region europe-west1 --project sleepr-464121`

`kubectl get namespaces` to check we are connecting correctly

`kubectl get pods -n kube-system`: we can see all the different components of the Google Cloud engine Kube system here, including a kube DNS and some networking pods.

#### **<span style='color: #6e7a73'> project k8s setup**

**<span style='color: #aacb73'> /k8s/sleepr** `helm install sleepr .`

`kubectl get nodes`, `kubectl get pods`

all our pods will be in `CreateContainerConfigError` state as we have not configured our secrets

#### **<span style='color: #6e7a73'> transferring secrets from local to GCloud Kubernetes cluster**

- `kubectl config get-contexts`
- `kubectl config use-context docker-desktop`
- `kubectl get secrets`
- creating some temporary files so that we can create and transfer these secrets
  - `kubectl get secret stripe -o yaml > stripe.yaml`
  - `kubectl get secret mongodb -o yaml > mongodb.yaml`
  - `kubectl get secret jwt -o yaml > jwt.yaml`
  - `kubectl get secret google -o yaml > google.yaml`
  - We won't have to do the secret for our `gcr-json-key` because in our Kubernetes engine cluster we don't need to explicitly define credentials. We already authenticated to pull images from artifact registry because we're inside of Google Cloud engine.
- `kubectl config use-context gke_sleepr-464121_europe-west1_sleepr`
  - `kubectl create -f google.yaml`
  - `kubectl create -f mongodb.yaml`
  - `kubectl create -f jwt.yaml`
  - `kubectl create -f stripe.yaml`
- our `kubectl get pods` should return that all microservices are now running

### **<span style='color: #6e7a73'>Ingress Load Balancer**

Right now we have two node ports set up to expose our external services. However, we want to actually create a new ingress resource because behind the scenes, Google Kubernetes engine will automatically provision us a load balancer and give us a single IP address that we can use to make requests to our entire application, which is what we want to do.

we add a new `templates`: `ingress.yaml` and then `helm upgrade sleepr .`, in case there were no actual changes in the Helm deployment, it is better to restart all pods `kubectl rollout restart deployment -n default`

![image info](./_notes/7_sc1.png)

`kubectl get ingress`

![image info](./_notes/7_sc2.png)

## **<span style='color: #6e7a73'>Amazon Web Services**

### **<span style='color: #6e7a73'>AWS Branch**

**<span style='color: #ffc5a6'>Github:** <https://github.com/mguay22/sleepr/tree/aws>

### **<span style='color: #6e7a73'>CI/CD With CodePipeline**

- Elastic Container Registry in search
- Create the four 4 private repositories
![image info](./_notes/8_sc1.png)

- install AWS CLI <https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html>
  - `sudo snap install aws-cli --classic`, `aws --version`
- `aws configure`
  - AWS / ericpython1980 / security credentials / create access key
  - AWS regions: <https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html>
- choose one repository / View push commands
  - `aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin XXX.dkr.ecr.eu-west-3.amazonaws.com`
  - `cd Documents/nestJS_Microservices_scaleablebackend/`
  - `docker build -t reservations -f apps/reservations/Dockerfile .`
  - `docker tag reservations:latest 135808955271.dkr.ecr.eu-west-3.amazonaws.com/reservations:latest`
  - `docker push 135808955271.dkr.ecr.eu-west-3.amazonaws.com/reservations:latest`
- buildspec.yaml
- AWS / CodePipeline
  - Connect Github, make sure that on your pipeline, **you get a confirmation that your github account is well connected**
  - Optional: IAM / Roles / Add EC2InstanceProfileForImageBuilderECRContainerBuilds to the build role

### **<span style='color: #6e7a73'>Amazon Elastic Kubernetes Service (EKS)**

**<span style='color: #ffc5a6'>EKS cli:** <https://eksctl.io/>

`eksctl get clusters`

#### **<span style='color: #6e7a73'>create EKS cluster**

- `eksctl create cluster -f ./cluster.yaml`
  - **<span style='color: #8accb3'> Note:** this will create the cluster that can be found under **Elastic Kubernetes Service**
- `kubectl config get-contexts`
- `kubectl get nodes`
- `eksctl get clusters --region eu-west-3`
- `eksctl get nodegroups --cluster sleepr2 --region eu-west-3`

#### **<span style='color: #6e7a73'>Install Helm Chart into our EKS cluster**

Firstly, we need to make an update to our helm chart to point our images at our repository. Copy the name of the `reservation` image from the `buildspec.yaml` file.

For all services, swap the GCloud image name for the AWS Image name

```yml
containers:
  # - image: europe-west1-docker.pkg.dev/sleepr-464121/reservations/production
  - image: 135808955271.dkr.ecr.eu-west-3.amazonaws.com/reservations:latest
```

Copying the secrets:

- `kubectl config use-context docker-desktop`
- `kubectl get secrets`
- `kubectl get secrets -o yaml > secret.yaml`
  - remove the `gcr-json-key` entire section
- `kubectl config use-context iam-root-account@sleepr2.eu-west-3.eksctl.io`
- `kubectl create -f ./secret.yaml`
- delete the `secret.yaml` to avoid exposing our secrets
- `helm install sleepr .`
  - if you get **<span style='color: #ff3b3b'>Error:** Error: INSTALLATION FAILED: cannot re-use a name that is still in use
  - check that this release already exists: `helm list -A`
  - `helm uninstall sleepr`
  - `helm install sleepr .`
  - `kubectl get pods`

**<span style='color: #ff3b3b'>Error:** Too many pods:

- `eksctl scale nodegroup ng-1 -n 5 --cluster sleepr`
- also increase the `maxSize`: `eksctl scale nodegroup ng-1 -M 5 --cluster sleepr`

#### **<span style='color: #6e7a73'>Load Balancer**

**<span style='color: #ffcd58'>IMPORTANT:** let's look at how we can provision a load balancer to expose an externally available URL that won't change.

- **<span style='color: #ffc5a6'>Link:** <https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html>
- **<span style='color: #ffc5a6'>Link:** <https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/>
- **<span style='color: #ffc5a6'>Link:** <https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/>

- `eksctl utils associate-iam-oidc-provider --region eu-west-3 --cluster sleepr2 --approve`
- `curl -o iam-policy.json <https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.13.3/docs/install/iam_policy.json>`
- `aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam-policy.json`

- get your account Id from AWS / IAM / Account Id

```bash
eksctl create iamserviceaccount \
--cluster=sleepr2 \
--namespace=kube-system \
--name=aws-load-balancer-controller \
--attach-policy-arn=arn:aws:iam::135808955271:policy/AWSLoadBalancerControllerIAMPolicy \
--override-existing-serviceaccounts \
--region eu-west-3 \
--approve
```

- `cd k8s/sleepr`
- `helm repo add eks https://aws.github.io/eks-charts`
- `helm install aws-load-balancer-controller eks/aws-load-balancer-controller -n kube-system --set clusterName=sleepr2 --set serviceAccount.create=false --set serviceAccount.name=aws-load-balancer-controller`
- `kubectl get pods -n kube-system`, we can see 2 load balancer controller pods running

![image info](./_notes/8_sc2.png)

- `kubectl logs aws-load-balancer-controller-5fc85bc7c5-274vg -n kube-system`
- delete *iam-policy.json*
- update `ingress.yaml`, to make sure that this load balancer is attached to a public subnet, that is externally facing, and class `alb` makes sure to provision an application load balancer
- `helm upgrade sleepr .`
- `kubectl get ing`

![image info](./_notes/8_sc3.png)

- you can check the load balancer status, via AWS / Load Balancer, which should be *active*
- copy the DNS name <k8s-default-sleepr-5502194e56-627965032.eu-west-3.elb.amazonaws.com>

use **Thunder Client** to make the requests, without `http`

## **<span style='color: #6e7a73'>E2E Tests**

### **<span style='color: #6e7a73'>Health Checks**

now we want to actually run our application and execute tests against it. So in order to do this, we're going to turn this end to end app into a Docker application that can run alongside of the other microservices in our application. So it can easily launch requests against them and make assertions.

- create the `Dockerfile`
- `docker build -t e2e .`
- `docker run e2e`
- So now that we have our end to end Docker image, we want to run the rest of our microservices alongside with it so that we can make real assertions in our end to end test; we need `docker-compose.yaml`

**<span style='color: #8accb3'> Note:** , I want to mount our `/specs` folder into the `user/source/app/specs` directory. And that's so, if we make changes to our tests, they will be reflected in real time as we run the container.

```yml
volumes:
  - ./specs:/usr/src/app/specs
```

instead of building these services, we're going to use the production image directly, either from docker-desktop or GCloud

- `depends_on` to provide the services that we want to wait to be started before we start up our tests
- `docker compose up 2e2`
- `docker logs e2e-reservations-1` will show that pino-logger logging out the request from our integration tests with a 200 status code
![image info](./_notes/9_sc1.png)
- So next we want to do the same health check on our other TCP microservices. However, they don't have an HTTP port exposed. It's just a TCP port. So in order to ping it correctly, we're going to go ahead and install some new dependencies to support this.
- `pnpm i -D tcp-ping ts-jest ts-node @types/node @types/tcp-ping`
- in order to have jest properly compile our TypeScript code in this file, we will make use of the `ts-jest` package we installed: `jest.config.ts`

### **<span style='color: #6e7a73'>Create & get reservations**

after our changes to our app have been completed and cloud build, we'll go ahead and tell Docker compose to pull our images by running `docker compose pull`.

## **<span style='color: #6e7a73'>Extra**

### **<span style='color: #6e7a73'>User Roles**

**<span style='color: #aacb73'>libs/common/src/decorators/roles.decorators.ts**

`SetMetadata` from `@nestjs/common` that allows us to assign metadata to a class or function using a certain key

**<span style='color: #aacb73'>libs/common/src/auth/jwt-auth.guard.ts**

we make use of `Reflector` from `@nestjs/core` and passing the `context.getHandler()`, which is the context called next in the request pipeline

## **<span style='color: #6e7a73'>TypeORM & MySQL**

### **<span style='color: #6e7a73'>Database Module**

`docker compose up mysql` will start up this *MySQL* image

instead of using *MySQL* workbench, you can also connect to the database image via: `docker exec -it nestjs_microservices_scaleablebackend-mysql-1 mysql -u root -p` and pass the password

`pnpm i @nestjs/typeorm typeorm mysql2`

**<span style='color: #aacb73'> libs/common/database/database.module.ts**

`TypeOrmModule.forRootAsync`, `synchronize: true` is going to automatically create our database schema every time our app is launched, if it doesn't match.

**<span style='color: #ffcd58'>IMPORTANT:**  this should not be used in production, otherwise you could potentially lose data.

## **<span style='color: #6e7a73'>RabbitMQ**

### **<span style='color: #6e7a73'>Add RabbitMQ**

we're going to look at using RabbitMQ as our transport mechanism to communicate between our microservices.

Right now we know that we're using the TCP transport mechanism. However, there are also some downsides to using the TCP transport opposed to an asynchronous messaging transport like RabbitMQ.

**<span style='color: #8accb3'> Note:**the problem with the TCP microservice, there's no way to retry any sort of failed messages in our system, and our messages can't be queued up one behind one another. So if we have a massive influx of messages into our system, our system can become overloaded and we can't respond gracefully. If we need to retry a message, we immediately throw this error and then this payments request is never retried because there's nowhere to actually save that message.

Using an asynchronous microservice like RabbitMQ:

- we have the idea of a queue that is introduced so a queue will hold our messages until they're ready to be processed. So if there's a large backlog of messages, we can handle them one at a time
- And additionally, if we fail to process a message, we can put it back on the queue and keep trying until potentially this error is resolved and we don't actually lose that message

`pnpm i amqplib amqp-connection-manager`

we modify docker-compose where we can define a new service to actually run a rabbitMQ cluster that we can connect to from our application.

**<span style='color: #aacb73'> main.ts**

```typescript
app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'auth',
    },
  });
```

So instead of a host and port, we're now going to provide an array of URLs which is going to be the different brokers that we want to connect to.

### **<span style='color: #6e7a73'>Test & Compare RabbitMQ**

After introducing a `throw new Error()`, `docker container ls`, `docker container restart <id>`

So now that our container restarted, you can see that it didn't try to reprocess that failed message it originally received. And that's because by default, Nestjs is automatically acknowledging all the messages that we process in Rabbitmq back to the broker.

So we actually have to explicitly tell it to not automatically acknowledge all these messages by going back to the *main.ts*, with the `noAck` property.

**<span style='color: #ffcd58'>IMPORTANT:** with this new property, once the payments container restarts, immediately after starting up here, you can see that it actually retried the message and ran into the same exact error that we had originally. So this is very powerful because unlike the TCP microservice, we actually have state here because of our queues.

So after this message fails to get reprocessed, the broker never receives the Ack and next time we ask for the next message, well, we get that failed message and we can replay it. Maybe if a service was down, we can retry it. And that way we don't lose the message. **So this is a big benefit of using asynchronous messaging like Rabbitmq**.

Additionally, we also have the added benefit of now having a queue so that if we can't process all these messages at once, like in TCP, we'll be hit with a bunch of requests at once. Instead, with a queue, we can process our messages in a controlled fashion

`docker container restart 557dcc673a5f24c52fb31070c63f20c840ac40d2f975ef7482fb46a15b127a64`, we can see the same error:

![image info](./_notes/12_sc1.png)

#### **<span style='color: #6e7a73'>Manually acking messages**

Now I want to show you how we can actually acknowledge these messages manually in case we want to handle this on our own.

**<span style='color: #aacb73'> payments.controller.ts**

```typescript
@MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(
    @Payload() data: PaymentsCreateChargeDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);

    throw new Error('Simulating payment error.');
    return this.paymentsService.createCharge(data);
  }
```

Now after our container restarts, you can see that it reprocesses the message. However, now we manually ack it, We should expect to see the message not get reprocessed any longer because we acknowledged it before we threw an error.

## **<span style='color: #6e7a73'>gRPC**

### **<span style='color: #6e7a73'>Additional Resources**

**<span style='color: #ffc5a6'>Introduction to gRPC:** <https://grpc.io/docs/what-is-grpc/introduction/>

**<span style='color: #ffc5a6'>Language guide:** <https://protobuf.dev/programming-guides/proto3/>

### **<span style='color: #6e7a73'>Protocol buffers**

`pnpm i --save @grpc/grpc-js @grpc/proto-loader ts-proto`

VSCODE extension: vscode-proto3

**<span style='color: #ffc5a6'>protoc linux:** <https://protobuf.dev/installation/>  
`sudo apt install -y protobuf-compiler`

`protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/auth.proto`

repeat this command line for *notifications* and *payments*

we have this function called **authServiceControllerMethods** and this is actually a decorator that we're going to be able to apply to our `auth` controller and all of the necessary metadata is going to be automatically applied to our methods automatically so that when a message is sent to our service, Nestjs will automatically know which method it should be sent to.

**<span style='color: #aacb73'> libs/common/src/auth/jwt-auth.guard.ts**

**<span style='color: #ff3b3b'>Error:** remember in gRPC we can't use underscore

**<span style='color: #aacb73'> apps/payments/src/payments.service.ts**

I set the notification service dependency not using `onModuleInit` to show you that we can do this at runtime when the application is running and it doesn't always have to be done in on module init like we've done before

## **<span style='color: #6e7a73'>GraphQL API Gateway**

### **<span style='color: #6e7a73'>Apollo Federation**

**<span style='color: #ffc5a6'>API Gateway:** <https://www.apollographql.com/docs/federation/>

### **<span style='color: #6e7a73'>Apollo Federation Gateway**

We of course have all of our Crud methods which are exposing all of our reservation Crud functionality and our auth controller, which is going to be exposing basic login and the user's controller to create users. And this is all being exposed through Http and this is all being exposed through rest APIs.

However, I want to show you how we can build an API gateway using GraphQL and Apollo Federation so that we can stitch together all of our different microservices and expose any endpoint we want regardless of the microservice or the transport layer that's being used.

So we'll be able to expose endpoints in our reservations, auth and payments, microservice using one microservice and to the end user, there's only going to be one endpoint that they need to use to be able to access all of these different microservices and they're all going to be combined together in our API gateway, which is really going to simplify things and make it very easy for us to expose external facing functionality in our app.

`nest g app gateway`  

### **<span style='color: #6e7a73'>install the dependencies to set up our GraphQL Apollo Federation server**

`pnpm i --save @apollo/gateway @apollo/server @apollo/subgraph @nestjs/apollo @nestjs/graphql graphql`

**<span style='color: #8accb3'> Note:** We're actually only going to be utilizing the Gateway module because this is where we're going to be setting up our GraphQL Apollo Server and exposing all of our other GraphQL microservices

#### **<span style='color: #6e7a73'>Dependencies mismatch with Apollo**

**<span style='color: #ff3b3b'>Apollo mismatch**

Apollo releasing v5 without @nestjs/apollo being ready  
pnpm resolving ^4 to v5 unless pinned  
Errors like ERR_PACKAGE_PATH_NOT_EXPORTED being cryptic at best  

- Forcing Downgrade a package from v5 to v4  
`pnpm add @apollo/server@^4`

- Reinstall all dependencies clean  

`rm -rf node_modules pnpm-lock.yaml`
`pnpm install`

- Check the exact version of a dependency  
`pnpm list @apollo/server`

### **<span style='color: #6e7a73'>Reservations**

**<span style='color: #aacb73'> reservations.module.ts**

```typescript
GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: { federation: 2 },
  }),
```

We're going to set `autoSchemaFile` equal to `{ federation: 2 }` and what does auto schema file is going to do is it's going to automatically generate the GraphQL schema from our code.

### **<span style='color: #6e7a73'>Auth Context & Playground**

**<span style='color: #aacb73'> gateway.module.ts**

```typescript
useFactory: (configService: ConfigService) => ({
        server: {
          context: authContext,
        },
// ...
});
```

So we'll pass in that auth context function which will get called every time a GraphQL request is sent in to our gateway.

finally we need a way to actually attach the user that gets returned from the auth context onto the outgoing request that gets sent to our downstream microservices like our reservations service. So in order to do this, we can add an additional property to the gateway object that will be called `buildService`.

**<span style='color: #ff3b3b'>Error:** Apollo Gateway: ECONNREFUSED Error While Connecting to Reservations Service

I believe the issue is that the Reservations services isn't fully started by the time that Gateway service polls it for the GraphQL schema. I could confirm this by manually restarting the Gateway service after all services were up and running with `docker container restart <gateway-container-id>` and then it started up fine

This is a common issue! Docker Compose only waits for containers to start, not for the services inside them (like a GraphQL server) to be ready to accept requests. As a result, your gateway might crash or fail schema introspection if the subgraph isn’t up yet.

Use **wait-for-it** to delay the gateway until the subgraph is ready: <https://medium.com/@pavel.loginov.dev/wait-for-services-to-start-in-docker-compose-wait-for-it-vs-healthcheck-e0248f54962b>

You can use a script like wait-for-it to block the gateway from starting until the dependent service is reachable.

- Download wait-for-it.sh

In your gateway folder: `curl -o wait-for-it.sh <https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh>`, `chmod +x wait-for-it.sh`

- Update your Dockerfile to include the script

`COPY apps/gateway/wait-for-it.sh /wait-for-it.sh`
`RUN chmod +x /wait-for-it.sh`

- Update your docker-compose.yml

Update your gateway service to use the script in its entrypoint:

```yml
gateway:
  build:
    context: .
    dockerfile: ./apps/gateway/Dockerfile
    target: development
  # command: pnpm run start:dev gateway
  depends_on:
    - reservations
  entrypoint:
    [
      '/bin/sh',
      '-c',
      '/wait-for-it.sh reservations:3000 -- node dist/apps/gateway/main',
    ]
  command: pnpm run start:debug gateway
  env_file:
    - ./apps/gateway/.env
  ports:
    - '3004:3004'
```

This waits until <http://reservations:3000> is reachable before running the gateway.

You can chain multiple wait-for-it.sh calls if you have more subgraphs. Your gateway will now wait until the subgraph is actually up and listening before it tries to load schemas — no more race conditions!

#### **<span style='color: #6e7a73'>Sorting additional issues**

**<span style='color: #f3b4ff'> Copilot** *node:alpine* doesn't contain *bash* by default, which is used inside wait-for-it.sh, update `apps/gateway/dockerfile`

```dockerfile
FROM node:alpine AS development

WORKDIR /usr/src/app

# Install bash
RUN apk add --no-cache bash
```

**<span style='color: #f3b4ff'> Copilot** old images `docker builder prune --all`, or for a lighter version `docker builder prune`

**<span style='color: #f3b4ff'> Copilot** initial command provided by *Michael*, `COPY wait-for-it.sh /wait-for-it.sh` failed

Your `docker-compose.yaml` specifies:

```yml
services:
  gateway:
    build:
      context: .
      dockerfile: ./apps/gateway/Dockerfile
```

This means:

- Docker is using . (the project root) as the build context
- And it's using apps/gateway/Dockerfile as the Dockerfile
- So all COPY instructions inside the Dockerfile must refer to files relative to the project root

So when your Dockerfile says: `COPY wait-for-it.sh /wait-for-it.sh`

Docker looks for wait-for-it.sh at `<project-root>/wait-for-it.sh`, not inside `apps/gateway/`

**Fix**: Update your Dockerfile to use the correct relative path from the build context

```dockerfile
COPY apps/gateway/wait-for-it.sh /wait-for-it.sh
```

Because:

- Build context root = `.`
- Your `.sh` file = `apps/gateway/wait-for-it.sh`
- So you must COPY it using that full path

you can finally access to <http://localhost:3004/graphql> via a browser, the *graphQL playground*, essentially equivalent of using *Postman*

```json
{
  "error": "Response not successful: Received status code 500"
}
```

Right now our server cannot get a successful response back, and that's because we're not supplying any authentication headers to our server, which we know we need to be supplying in order to be authenticated to access our GraphQL server.

pass the http-headers

```json
{
  "authentication": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODg0MGRmMTc2ZDdiNzVhODlmYzY1MWQiLCJpYXQiOjE3NTM0ODQ3ODcsImV4cCI6MTc1MzQ4ODM4N30.0wkuuQVIn80luQvJgTCrZcjUPviCWz6nvRfqlZFOSFM"
}
```

and for a `createReservation`

```json
mutation {
  createReservation(createReservationInput: {
     startDate: "02-01-2025",
  endDate: "02-05-2025",
  charge: {
    amount: 20.03,
    card: {
      token: "tok_mastercard_debit"
    }
  }
  }) {
    startDate,
    endDate,
    invoiceId
  }
}
```

for `reservations`:

```json
query{
  reservations{
    startDate,
    endDate,
    invoiceId,
    userId
  }
}
```

for `reservations`:

```json
  query{
    reservation(id: "68840f881cf3a7e5419cfc1d"){
      startDate,
      endDate,
      _id
  }
}
```

### **<span style='color: #6e7a73'>Auth Service & Payments**

**<span style='color: #8accb3'> Note:** if we look at our docs, we can see we have the user's query and mutation added to our super graph in our gateway schema, which already had reservations queries and mutation. So as an end user, this is **all just one schema.**

Even though these are from different services underneath, it's all abstracted away, which makes this a great solution for exposing APIs like this.

for `users`:

```json
query{
  users{
    email,
    _id,
    roles
  }
}
```

**<span style='color: #8accb3'> Note:** And notice this is the same user ID associated with the reservation that we created so we can see our **current user decorator** is working.

and for a `createUser`

```json
mutation {
  createUser(createUserInput: {
    email: "test@test.com",
    password: "someTest!Pwd1@",
    roles: ["Admin"]
  
  }) {
    _id,
    roles,
    email
  }
}
```

#### **<span style='color: #6e7a73'>Payments Service**

let's go ahead and expose one more microservice. The payments microservice, which is currently actually locked down to the outside world because there's no way for an external service to call this TCP, TCP microservice.

for `payments`:

```json
query{
  payments{
    id,
    amount,
  }
}
```

## **<span style='color: #6e7a73'>Prisma**

### **<span style='color: #6e7a73'>Postgres**

#### **<span style='color: #6e7a73'>Postgres - Docker localhost**

**<span style='color: #ffc5a6'>pgAdmin:** <https://www.pgadmin.org/>

pgAdmin 4 / register new server

- name: local
- connection host: localhost
- password: postgres

#### **<span style='color: #6e7a73'>Postgres - Docker container**

**<span style='color: #ff3b3b'>Error:** "root" execution of the PostgreSQL server is not permitted. The server must be started under an unprivileged user ID to prevent possible system security compromise.

**<span style='color: #f3b4ff'> Copilot**

You're seeing that error because you're trying to run PostgreSQL commands (like `postgres` or `pg_ctl`) as the `root` user inside the container, but PostgreSQL is designed to be run under an unprivileged user (typically `postgres`), for security reasons.

To interact with the running PostgreSQL instance inside the container, **you should switch to the postgres user**, which is created by the official `postgres` image.

#### **<span style='color: #6e7a73'>Correct way to access the container's PostgreSQL shell**

`docker exec -it <container_id_or_name> bash`

Then switch to the postgres user:

`su - postgres`

Now you can access the PostgreSQL shell:

`psql`

Or combine everything in one line:

`docker exec -it --user postgres <container_id_or_name> psql`

##### **<span style='color: #6e7a73'>Basic  Navigation**

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `\l`              | List all databases                       |
| `\c <dbname>`     | Connect to a database                    |
| `\dt`             | List tables in the current database      |
| `\d "<table_name>"` | Show table schema (columns, types, etc.) |
| `\du`             | List users/roles                         |
| `\q`              | Quit `psql`                              |

##### **<span style='color: #6e7a73'>Database operations**

| Command                                            | Description                 |
| -------------------------------------------------- | --------------------------- |
| `CREATE DATABASE mydb;`                            | Create a new database       |
| `DROP DATABASE mydb;`                              | Delete a database           |
| `CREATE USER myuser WITH PASSWORD 'mypassword';`   | Create a new user           |
| `GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;` | Grant permissions to a user |
| `ALTER USER myuser WITH SUPERUSER;`                | Make a user a superuser     |

##### **<span style='color: #6e7a73'>Table operations**

| Command                                                    | Description    |
| ---------------------------------------------------------- | -------------- |
| `CREATE TABLE mytable (id SERIAL PRIMARY KEY, name TEXT);` | Create a table |
| `INSERT INTO mytable (name) VALUES ('Alice');`             | Insert a row   |
| `SELECT * FROM mytable;`                                   | Query data     |
| `UPDATE mytable SET name = 'Bob' WHERE id = 1;`            | Update data    |
| `DELETE FROM mytable WHERE id = 1;`                        | Delete data    |
| `DROP TABLE mytable;`                                      | Delete a table |

##### **<span style='color: #6e7a73'>Useful Info & Utilities**

| Command     | Description                                  |
| ----------- | -------------------------------------------- |
| `\conninfo` | Show current connection info                 |
| `\x`        | Toggle expanded output (great for wide rows) |
| `\timing`   | Show execution time for queries              |
| `\password` | Change password for the current user         |

#### **<span style='color: #6e7a73'>Prisma**

Let's go ahead and now plug in **Prisma** into our application so that we can get started with creating our own database for this application.

we create a `package.json` inside our `reservations` service. So just like we've done before in our auth service and notification service to get some dependencies specific to just this running service, we're going to do the same thing now in our reservation service, because I want to install Prisma client just for this one service here in our Monorepo.

I don't want to share this Prisma client with other services. Now, the reason why is because of the type generation that Prisma client offers us. We're going to be running this type generation in multiple different services, and we don't want these types to overwrite one another. We want each service to have its own independent Prisma client and its own set of types. As they are independent microservices.

**<span style='color: #aacb73'> apps/reservations/**

`pnpm i --save-dev dotenv-cli`  
`pnpm i --save @prisma/client prisma`

**<span style='color: #8accb3'> Note:** So we're going to want to install `@prisma/client` which is again going to be this client library that's going to establish the connection to our database and generate the types we need. However we're also going to install the `@prisma/dependency` in this Prisma dependency is essentially a CLI tool that's going to allow us to run migrations against the database based off of migration files we generate, to always ensure our database schema is in line with our schema definition.

### **<span style='color: #6e7a73'>Prisma Schema & Migrations**

- Install *Prisma* VSCODE

#### **<span style='color: #6e7a73'>schema.prisma**

`
generator client {
 provider = "prisma-client-js"
 output = "../node_modules/.prisma/client"
 binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}
`

our setup is going to be a little bit different because we're running in this mono repo. And remember we're going to actually be generating these types in our Docker container when we're running in production, which is actually a different runtime. Our Docker image is based off of Node Alpine, which in my case is obviously a different runtime. I'm running on Mac OS and this is going to be in Linux. So we need to do a couple of things to get our client types generated properly in all environments.

**<span style='color: #ffcd58'>IMPORTANT:** The connection string to our Postgres database is going to be different when we're running locally on our machine here versus when we're inside of Docker and utilizing this `.env`.

![image info](./_notes/15_sc1.png)

Go to `pgAdmin 4` / Databases *Reservations* / Schemas / Tables *Reservation*

#### **<span style='color: #6e7a73'>Reservations Prisma Refactor**

to connect to the database we use *nestJS* `onModuleInit`, the alternative would be to do this lazily. And the first time you interact with Prisma client it'll connect on its own.

**<span style='color: #8accb3'> Note:** we get `$connect` from `await this.$connect();` from extending the`./prisma/client` that we have defined manually in our `schema.prisma`
<!---
[comment]: it works with text, you can rename it how you want

![image info](./1_sc1.png)

**<span style='color: #ffcd58'>IMPORTANT:**
**<span style='color: #8accb3'> Note:**
**<span style='color: #ffc5a6'>Link:**
**<span style='color: #ff3b3b'>Error:**
**<span style='color: #aacb73'> TabButton.jsx**
**<span style='color: #f3b4ff'> Copilot**

**<span style='color: #6e7a73'> Section**

<ins>text to underline</ins>

--- : horizontal line

| Property    | Description | Default |
| -------- | ------- | ------- |
| view engine  | The default engine extension to use when omitted. NOTE: Sub-apps will inherit the value of this setting.    | |
| views |  A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array. | `process.cwd() + '/views'` |

-->

<!-- markdownlint-enable MD033 -->
<!-- markdownlint-enable MD024 -->
<!-- markdownlint-enable MD029 -->
<!-- markdownlint-enable MD046 -->