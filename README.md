# Serverless workshop

## Prerequisites

### AWS Account

In order to complete this workshop you'll need an AWS Account with access to create AWS IAM, DynamoDB, Lambda, and API Gateway resources. The code and instructions in this workshop assume only one student is using a given AWS account at a time. If you try sharing an account with another student, you'll run into naming conflicts for certain resources. You can work around these by appending a unique suffix to the serverless service name, but the instructions do not provide details on the changes required to make this work.

All of the resources you will launch as part of this workshop are eligible for the AWS free tier if your account is less than 12 months old. See the [AWS Free Tier page](https://aws.amazon.com/free/) for more details.

### Node.js

You need Node.js 8.10 or later LTS installed on your system. See the [Node.js website](https://nodejs.org/en/) for more details.

### Browser

We recommend you use the latest version of Chrome or Firefox when testing the web application UI.

### Text Editor

You will need a local text editor for making minor updates to configuration files.

# Workshop (sorry, more like tutorial)

## Step 1: Create Serverless application

### Create your NPM project

`npm init`

### Add Serverless Framework as local dependency

> While most examples gives steps to install Serverless Framework as global dependency (allowing you to directly call `serverless` in your terminal), global dependency will cause problems when two projects use different versions.

`npm install --save-dev serverless`

Add `sls` script to _package.json_:
```json
  "scripts": {
    "sls": "serverless",
    //...
  },
```

While it's not as nice as just `sls` or `serverless` you can now execute serverless in your terminal:

`npm run sls`

### Create serverless project

`npm run sls -- create --template aws-nodejs`

More information and list of supported templates available in Serverless Framework [CLI documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/create/).

Set default stage and region in `serverless.yml`:

```yml
provider:
  #...
  stage: dev
  region: eu-west-1
```

### Other recommendations

* Set your project as private so you don't accidentally publish to NPM registry. Add to your _package.json_:

  `"private": true,`

## Step 2: Deploy an API

### Setup API Gateway for your lambda

In _serverless.yml_ add http event for your lambda function:

```yml
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get
```

### Set AWS credentials

If you have AWS CLI installed, run:

```
$ aws configure
AWS Access Key ID [None]: ...
AWS Secret Access Key [None]: ...
Default region name [None]: eu-west-1
Default output format [None]: json
```

Alternatively you can set access key and secret via Environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`.

### Deploy

`npm run sls -- deploy`

Or simply add `deploy` script to _package.json_:

```json
  "scripts": {
    //...
    "deploy": "serverless deploy",
    //...
```

and you will be able to deploy using:

`npm run deploy`

Now try the URL from deployment step results in your terminal. You should be able to hit lambda function you just deployed!

## Step 3: Running locally (serverless-offline)

Install `serverless-offline` plugin:

`npm install --save-dev serverless-offline`

Enable plugin in `serverless.yml`:

```yml
plugins:
  - serverless-offline
```

Run offline:

`npm run sls -- offline`

Or add script to your `package.json`.

Your lambda function is available at http://localhost:3000/hello

### Update lambda runtime to node8.10

Update `serverless.yml`:

```yml
provider:
  ...
  runtime: nodejs8.10
```

You can now refactor your handler to be **async**. However, there is currently a bug in `serverless-offline` where it does not handle async handler well. You can add this simple wrapper fix to work around it. Here is how your `handler.js` could look like:

```js
const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

// Workaround for serverless-offline bug on async handlers: https://github.com/dherault/serverless-offline/issues/384
const offlineFix = asyncHandler => (event, context, callback) => 
  asyncHandler(event, context).then(
    result => callback(null, result),
    error => callback(error)
  );

module.exports = { hello: offlineFix(hello) };
```

Or better yet, use framework like `middy` where you will also get schema validation, error handling, and more: https://github.com/middyjs/middy

`$ npm install middy`

> Note: we are installing `middy` as normal dependency so it's deployed with our code.

```js
const middy = require("middy");
const { httpErrorHandler, jsonBodyParser } = require('middy/middlewares')

const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports = {
  hello: middy(hello)
    .use(jsonBodyParser())
    .use(httpErrorHandler())
}
```

## Removing stack

If you want to remove CloudFormation stack, you can simply run:

`npm run sls -- remove`

The only thing remaining will be S3 bucket where Serverless Framework kept deployment packages.

## Step 4: Create API

![owl](https://github.dev.global.tesco.org/storage/user/2885/files/01aa54c4-3e59-11e8-8ae2-e8a3db08aa2d)

You can install `aws-sdk` as dev dependency: it's already available to you from Node.js runtime in AWS Lambda, you don't need to include it in your deployment package.

`npm install --save-dev aws-sdk`

### Your task:

* Create DynamoDB in your `serverless.yml` (See [CF docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html) or [Serverless docs](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/))
* Create API to accept POST `/questions` with question text `{ "text": "What is capital of Lithuania?", "hint": "Sounds like 'will' and 'news'" }`, that returns newly created question id
* Validate schema using middy
