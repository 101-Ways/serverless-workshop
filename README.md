# Serverless workshop

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

However, there is currently a bug in `serverless-offline` where it does not handle async handler well. You can add this simple wrapper fix to work around it:

```js
// Workaround for serverless-offline bug on async handlers: https://github.com/dherault/serverless-offline/issues/384
const offlineFix = asyncHandler => (event, context, callback) => 
  asyncHandler(event, context).then(
    result => callback(null, result),
    error => callback(error)
  );

```

## Step 4: Create API with DynamoDB

You can install `aws-sdk` as dev dependency: it's already available to you from Node.js runtime in AWS Lambda, you don't need to include it in your deployment package.

`npm install --save-dev aws-sdk`

...

Update your `serverless.yml`:

```yml
provider:
  #...
  stage: dev
  region: us-east-1
```

# Further reading

* [Custom authorizers](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
* 