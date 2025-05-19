<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD024 -->
# **<span style='color: #6e7a73'>NestJS Microservices: Build & Deploy a scalable Backend**

## **<span style='color: #6e7a73'>Generic Comments**

### **<span style='color: #6e7a73'>Eslint**

**<span style='color: #ffc5a6'>Eslint - getting started:** [https://eslint.org/docs/latest/use/getting-started]

`npm init @eslint/config@latest`

### VSCode Editor - fold level

`CTRL + SHIFT + P: Fold level 2`

## **<span style='color: #6e7a73'>Introduction**

### **<span style='color: #6e7a73'>System Architecture**

![image info](./_notes/1_sc1.png)

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
