# Module 0: Serverless Project

<!-- TODO: Add introduction. -->

## Serverless Framework Overview

<!-- TODO: Add Serverless framework overview. -->

## Create Serverless project

**Goal:** Create AWS Lambda handler code using `serverless create` command. Invoke function locally to confirm that it returns:

```json
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":\"\"}"
}
```

<!-- TODO: Add info about handler result: API Gateway lambda-proxy etc. -->

<details>
<summary><b>HOW TO create serverless project</b></summary><p>

1. Create a directory for your serverless project.

    ```
    mkdir workshop
    cd workshop
    ```

1. Initialise the project:
    
    `npm init`
    
    Name the project accordingly and you can accept the rest of the defaults.

1. Install the serverless framework in our project.

    `npm install --save-dev serverless`

    Add `sls` to npm scripts by editing your _package.json_ so your `scripts` section looks like this:

    ```json
      "scripts": {
        "sls": "serverless"
      },
    ```
    
    Now you can run serverless using `npm run sls [-- <args>...]`

    The special option `--` is used to delimit the end of the options for `npm run` and pass all the arguments after the `--` directly to your script

    > _Pro tip:_ Most examples gives steps to install and run Serverless Framework globally (allowing you to directly call `serverless` in your terminal). However, global package dependency will likely to cause issues in the future between two projects depending on different versions, especially when used by build and deploy steps on your CI.

1. Create nodejs Serverless project using one of the default templates:

    `npm run sls -- create --template aws-nodejs`

    See more information about `serverless create` command on [CLI documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/create/) page.
</p></details>

<details>
<summary><b>HOW TO invoke function locally</b></summary><p>

1. Run `invoke local` command:

    `npm run sls -- invoke local --function hello`

    See more information about `invoke local` command on [CLI documentation](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) page.
</p></details>
<p></p>

Congratulations! You have successfully successfully created a Serverless API project.

## Completion

You have successfully created Serverless project and tested handler locally. In the next [Deploy API](../1_Deploy) module, you will learn more about API Gateway and deploy your first serverless API.
