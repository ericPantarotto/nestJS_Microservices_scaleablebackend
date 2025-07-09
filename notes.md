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
  - Connect Github
  - IAM / Roles / Add EC2InstanceProfileForImageBuilderECRContainerBuilds to the build role
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
<!-- markdownlint-enable MD024 -->
