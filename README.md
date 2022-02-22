# apprunner-nodejs-app

repostatus-gh-demo
This is a sample application using app runner with nodejs runtime, to pull data from an aurora database via RDS proxy

## AWS App Runner

### Pre-requisites
Create Aurora table, RDS proxy & configure access

To allow our app to function properly, we need an Aurora database/table, and grant AWS App Runner access.

```shell
$ aws cloudformation deploy \
  --stack-name $(basename $(pwd))-infra \
  --template-file infra/apprunner-prereqs-cfn.yaml \
  --capabilities CAPABILITY_IAM
```
