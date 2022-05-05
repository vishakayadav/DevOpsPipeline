# Pipeline Project - DevOps-17

## Description for the Projects used in this exam
The first project I use in this exam is [Spring Petclinic](https://github.com/spring-projects/spring-petclinic). Petclinic is an open source Spring Boot application built using Maven.

The second project is [linkding](https://github.com/sissbruecker/linkding). Linkding is a simple open source bookmark service. It is build over django framework for api and node server for the UI.

You can find all the information of these two projects, including APIs, codes, and instructions, by clicking the link above.

## New Feature
In this exam, I implement a **code coverage** step as a step in pipeline before the deployment for these two projects mentioned above.

## Coverage Report
* The coverage report are stored under codeCoverage directory.
* For application developed with python, the code coverage is also visible on terminal at the time of execution.
* For java application, the code coverage report is html format, so open index.html (at codeCoverage/<app-name>-report) in browser to get complete overview of code review.
* In addition to the reports, we have .cov files (<app-name>.cov) that contains the total percentage of code coverage in recent execution. These files would also be found under codeCoverage/.


## Process to start Pipeline
This project is implemented on MacOS Intel chip. Thus, please check if you install bakerx already.

In this project, there are different yaml files desigened for different projects. *Please run the following commands* to start the server:
```
node index.js init

node index.js build petclinic-build build-petclinic.yml 
node index.js code-coverage petclinic-code-coverage build-petclinic.yml

node index.js build linkding-build build-linkding.yml
node index.js code-coverage linkding-code-coverage build-linkding.yml

node index.js prod up
node index.js deploy inventory.txt deploy-petclinic build-petclinic.yml 
node index.js deploy inventory.txt deploy-linkding build-linkding.yml 

```
Notice that we need to run `code-coverage` before running `deploy` because the deploy command would need the coverage report to check if the current code has satified the minimum code coverage criteria for deployment.

After running the command above, we can click the following links to check if the servers start successfully.
+ [Spring Petclinic](http://localhost:3091/)
+ [Linkding](http://localhost:3092/)

## Changes Made in already developed commands:
In the already developed feature, only develop command included some changes.
* The deployment happens only if code coverage is greater thans or equal to a defined minimum code coverage
* The structure of deploy job in build.yml has been changed
```
  - name: deploy-<repo-name>
    covfile: <path to file with numberic percentage of code coverage (generally with extension .cov)>
    zipfile: <path to the compressed file for this application>
    mincov: <the minimum required code coverage to allow deployment>
    port: <port on which the application would run>
    healthcheck: <health-check end point with '/' prefix. eg: '/health'>
    steps:
      - name: move the project to the remote server
        scp:
          params:
            src: <path of the file on local that is copied to server>
            dest: <absolute path of file (include name of file)>
      - name: 
        cmd:
      - name:
      - cmd:
    proxyport: <port on which you want to proxy for blue green deployment strategy>
```
Here, any path mentioned(except for desc under scp) is relative path from root this repo, i.e., DEVOPS-17.
