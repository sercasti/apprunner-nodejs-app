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
