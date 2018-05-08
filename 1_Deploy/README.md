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
<summary><b>HOW TO create AWS service account</b></summary><p>

<!-- Service account creation steps taken from https://www.thorntech.com/2017/02/aws-tutorial-intro-using-lambda-serverless-framework/  -->

Serverless needs access keys in order to perform actions within your AWS account. So you need to create a service account with a set of access keys.

Perform the following steps within the AWS console:

1. Go to IAM
1. On the left, select the Users tab
1. Click the Add user button
1. For the User name, type serverless
1. Next to Access type, check the box for Programmatic access
1. Click the Next: Permissions button

![](https://dnp94fjvlna2x.cloudfront.net/wp-content/uploads/2017/01/iam-create-user.gif)

Using the Add user wizard, you begin the process of creating a service account named serverless. You also select Programmatic access, which generates access keys for you.

Continue with the next section of the Add User wizard.

1. On the Set permissions for serverless page, click Attach existing policies directly
1. Type AdministratorAccess in the search filter
1. Check the box next to the AdministratorAccess policy
1. Click the Next: Review button
1. On the Review page, click the Create user button
1. Click the Download .csv button
1. Click Close

![](https://dnp94fjvlna2x.cloudfront.net/wp-content/uploads/2017/01/iam-admin-access2.gif)

You grant admin privileges to your service account by attaching the AdministratorAccess policy. Once the account is created, you download a CSV file containing the access keys. This is the only chance you get to download these keys.

> Note: In a production environment, you should tailor down access to least privilege. This tutorial uses a blanket admin access policy to keep things simple. Be sure to detach this policy when you’re done.

</p></details>


<details>
<summary><b>HOW TO setup AWS credentials</b></summary><p>

* By using AWS CLI, if you have it installed, by running:

    `aws configure`

* By setting environment variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`

    _Linux, macOS, or Unix_

    ```
    $ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    $ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    $ export AWS_DEFAULT_REGION=eu-west-1
    ```

    _Windows_

    ```
    > set AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
    > set AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    > set AWS_DEFAULT_REGION=eu-west-1
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
1. Finally add CORS headers to the handler response function as described below. The reason for this is to allow any origin (including your localhost) to access the service.

    ```javascript
    statusCode: 200,
    headers: {
       'Access-Control-Allow-Origin' : '*',
       'Access-Control-Allow-Credentials' : true
    },
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
