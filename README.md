# Serverless workshop

If you are familiar with AWS and Nodejs go to [Create Serverless API project](0_ServerlessProject) module to begin this workshop.

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

# Modules

This workshop is split up into several modules. You should complete each module before moving to the next one.

## <a name="api"></a> Serverless API

  0. [Create Serverless API project](0_CreateServerlessProject)
  1. [Deploy Serverless API](1_DeployServerlessAPI)
  2. [Run Serverless API locally (offline)](2_RunOffline)
  
## <a name="react"></a> React App

  3. [Create React app](react)


After you finished this workshop you can remove all resources that were created by following the [cleanup guide](9_Cleanup).
