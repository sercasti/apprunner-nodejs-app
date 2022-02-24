# aws-nodejs-app

This is a sample application using nodejs runtime, to pull data from an aurora database via RDS proxy

## AWS Copilot

### Pre-requisites

Create Aurora table, RDS proxy & configure access

To allow our app to function properly, we need an Aurora database/table, and grant AWS App Runner access.

```shell
$ aws cloudformation deploy \
  --stack-name $(basename $(pwd))-infra \
  --template-file infra/apprunner-prereqs-cfn.yaml \
  --capabilities CAPABILITY_IAM
```

Create envariables.env file on the root of this project, the file *must* use UTF-8 encoding:
DBUSER=databaseUsername
DBPWD=databasePassword
DBHOST=databaseHost

```shell
$copilot init --app demo                      \
  --name api                                  \
  --type 'Load Balanced Web Service'          \
  --deploy
```
