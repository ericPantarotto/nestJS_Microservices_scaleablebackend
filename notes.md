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
