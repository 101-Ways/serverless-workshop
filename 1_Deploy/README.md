# Module 1: Deploying Serverless API

In this module ...

## Deploy Serverless API

<!-- TODO: Clean up this whole section -->

Set default stage and region in `serverless.yml`:

```yml
provider:
  #...
  stage: dev
  region: eu-west-1
```

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


## Pro Tips

### Add Serverless Framework as local dependency

<!-- TODO: Should this be placed in Run offline section? -->

> Most examples gives steps to install and run Serverless Framework globally (allowing you to directly call `serverless` in your terminal). However, global package dependency will likely to cause issues in the future between two projects depending on different versions, especially when used by build and deploy steps on your CI.

<details>
<summary><b>HOW TO use Serverless as dev dependency</b></summary>

`npm install --save-dev serverless`

Add `sls` script to your _package.json_:
```json
  "scripts": {
    "sls": "serverless"
  },
```

While it's not as neat as `sls` or `serverless` you can now execute serverless in your terminal:

`npm run sls [-- <args>...]`

The special option `--` is used to delimit the end of the options for `npm run` and pass all the arguments after the `--` directly to your script:

`npm run sls -- invoke local --function hello`
</details>


## Completion

You have successfully ... In the next []() module, you will ...