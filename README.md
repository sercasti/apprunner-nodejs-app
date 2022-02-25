# aws-nodejs-app

This is a sample application using nodejs runtime, to pull data from an aurora database via RDS proxy
It can be deployed with Copilot to run with the App Runner Service, or Fargate.

## AWS Copilot

### Pre-requisites

- aws cli installed and configured with credentials
- aws copilot installed: <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Copilot.html>

### Deploy

To run on Fargate, use this command:

```shell
$copilot init --app demo --name api --type 'Load Balanced Web Service' --deploy
```

To run on App Runner, use this command:

```shell
$copilot init --app demo --name api --type 'Request-Driven Web Service' --deploy
```

### Configuration

- Copilot config is here: [/copilot/api/manifest.yml](/copilot/api/manifest.yml)
- Cloudformation to create Aurora DB and RDS Proxy is on [/copilot/api/addons/database.yml](/copilot/api/addons/database.yml) and it is run automatically by _copilot init_

### Benchmarks

Use [K6](https://k6.io/docs/getting-started/running-k6/) to run the test on /loadtest. See [README.md](/loadtest/README.md) for instructions.

### Customization

You can use this project as is, but the idea is for you to extend this by doing the following:

- replace the code in [index.js](index.js) with your own,
- use the Public Database instance to load a dataset for your code to read/write,
- test that the URL is working,
- use that URL on the load test tool at the /loadtest folder to get benchmarks,
- check the RDS Proxy and Aurora metrics to confirm no connection bottlenecks

### Design

- First, copilot as the main tool for deploy. Everything begins when copilot init executes:
  
  1. It reads the manifest.yml file to look for config values, picks up the placeholders file for environment variables
  2. It creates a VPC, subnets, roles, ECS Service automatically on the account
  3. It builds the Dockerfile and uploads the results to an ECR registry on the account
  4. It executes the attached cloudformation template on the addons folder to:
     - create the Aurora Database, RDS Proxy, and database credentials on Secrets Manager,
     - sets the "DBUSER", "DBHOST" and "DBPWD" environment variables over the placeholders
  5. Copilot deploys the container as an ECS task with the environment variables set as configured on the manifest.yml
  6. The code on index.js creates the initial table

- The endpoints published on the nodejs script can be accesed publicly and benchmarked
- Copilot can also deploy this same code on App Runner to compare performance.
