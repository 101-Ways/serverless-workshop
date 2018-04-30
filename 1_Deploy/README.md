# Module 1: Deploying Serverless API

In this module we will deploy the serverless api to AWS.

### Set AWS credentials

If you have AWS CLI installed, run:

```
$ aws configure
AWS Access Key ID [None]: ...
AWS Secret Access Key [None]: ...
Default region name [None]: eu-west-1
Default output format [None]: json
```

Or alternatively you can set access key and secret via Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`.

### Setup API Gateway and the lambda integration

Set default stage and region in _serverless.yml_:

```yml
provider:
  #...
  stage: dev
  region: eu-west-1
```
User `eu-west-1` or any other AWS region.

In _serverless.yml_ add http event for your lambda function:

```yml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get
          cors: true
```

### Deploy

`npm run sls -- deploy`

Or simply add `deploy` script to _package.json_:

```json
  "scripts": {
    //...
    "deploy": "serverless deploy",
    //...
  }
```

and you will be able to deploy using:

`npm run deploy`

Now try the URL from deployment step results in your terminal. You should be able to hit lambda function you just deployed!

## Completion

You have successfully ... In the next [Create a React app](../2_React)
