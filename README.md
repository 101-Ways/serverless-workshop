# Serverless workshop

## Step 1: Create Serverless application

### Create your NPM project

`npm init`

### Add Serverless Framework as local dependency

> While most examples gives steps to install Serverless Framework as global dependency (allowing you to directly call `serverless` in your terminal), global dependency will cause problems when two projects use different versions.

`npm install --save-dev serverless`

Add `sls` script to _package.json_:
```
  "scripts": {
    "sls": "serverless",
    ...
  },
```

While it's not as nice as just `sls` or `serverless` you can now execute serverless in your terminal:

`npm run sls`

### Create serverless project

`npm run sls -- create --template aws-nodejs`

More information and list of supported templates available in Serverless Framework [CLI documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/create/).

### Other recommendations

* Set your project as private so you don't accidentally publish to NPM registry. Add to your _package.json_:

  `"private": true,`

## Step 2: Deploy an API

### Setup API Gateway for your lambda

In _serverless.yml_ add http event for your lambda function:

```
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

```
  "scripts": {
    ...
    "deploy": "serverless deploy",
    ...
```

and you will be able to deploy using:

`npm run deploy`

Now try the URL from deployment step results in your terminal. You should be able to hit lambda function you just deployed!

## Step 3: Run offline (locally)

You can run your lambda functions locally. You just need to install `serverless-offline` plugin:

`npm install --save-dev serverless-offline`

Enable this plugin in `serverless.yml` by adding:

```
plugins:
  - serverless-offline
```

To simplify running it, you can add script to your package.json:

```
  "scripts": {
    ...
    "offline": "serverless offline",
    ...
```

You should be able to run it now:

`npm run offline`

## Step 4: Create API with DynamoDB back

(WIP)

`npm install --save-dev mocha chai`

# Further reading

* [Custom authorizers](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
* 