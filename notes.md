<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
# **<span style='color: #6e7a73'>NestJS Microservices: Build & Deploy a scalable Backend**

## **<span style='color: #6e7a73'>Generic Comments**

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

#### **<span style='color: #6e7a73'>Google console**

<https://console.cloud.google.com/>

Select a Project / New Project

Select the created project / API & Services Section / OAuth Consent screen

Under the *authorized redirect Uris* section, click add Uri and then paste <https://developers.google.com/oauthplayground>, which is the OAuth playground for Developers.google.com, which is what we're going to use to obtain a refresh token with this OAuth application we're creating.

## **<span style='color: #6e7a73'>Production Deployment**

### **<span style='color: #6e7a73'>Google Cloud Engine Setup**

- Container Registry
- Artifact Registry
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
<!-- markdownlint-enable MD024 -->
