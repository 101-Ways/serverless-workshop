# Module 1: Deploying Serverless API

In this module we will add HTTP Endpoint for your lambda function and deploy the serverless api to AWS.

## Create HTTP endpoint for your Lambda

**Goal:** Configure HTTP Endpoint trigger for your AWS Lambda function, and deploy to AWS. Open HTTP endpoint url in the browser confirming it returns:

```
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":\"...\"}"
}
```

<details>
<summary><b>HOW TO setup AWS credentials</b></summary><p>

* By using AWS CLI, if you have it installed, by running:

    `aws configure`

* By setting environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`

    _Linux, macOS, or Unix_

    ```
    $ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    $ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    $ export AWS_DEFAULT_REGION=us-west-2
    ```

    _Windows_

    ```
    > set AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    > set AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    > set AWS_DEFAULT_REGION=us-west-2
    ```
</p></details>

<details>
<summary><b>HOW TO add HTTP Endpoint (trigger) in Serverless project</b></summary><p>

1. Set default `stage` and `region` in _serverless.yml_:

    ```yml
    provider:
      name: aws
      runtime: nodejs6.10
      stage: dev
      region: eu-west-1
    ```

    You can use `eu-west-1` or any other AWS region that support AWS Lambda and API Gateway.

1. Add HTTP Endpoint as a event trigger for your Lambda function by adding `events` section with `http` trigger in _serverless.yml_:

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
</p></details>


<details>
<summary><b>HOW TO deploy Serverless project</b></summary><p>

1. Run `deploy` serverless command:

    `npm run sls -- deploy`

    You can simplify this by adding `deploy` script to your `package.json`:

    ```json
    "scripts": {
      "deploy": "serverless deploy",
      "sls": "serverless"
    },
    ```

    Now you can deploy using:

    `npm run deploy`

    See more information about `deploy` command on [CLI documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/deploy/) page.
    
1. Open deployed endpoint in the browser confirming it's returning valid response.
</p></details>
<p></p>

Congratulations! You have successfully deployed your Lambda function with API Gateway endpoint 

## Completion

You have successfully deployed serverless API. In the next [Create a React app](../2_React) module you will learn how to create React app.
