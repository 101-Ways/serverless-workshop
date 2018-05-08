## Removing stack

If you want to remove CloudFormation stack, you can simply run:

`npm run sls -- remove`

Remove both your api and react app. 

The only thing remaining will be S3 bucket where Serverless Framework kept deployment packages, and .

You can also go to AWS Console website and delete CloudFormation stacks from there: first time you try to delete CloudFormation stack it will fail, it's by design -- you don't want to accidentally delete S3 buckets. Try deleting them again and confirming that you want to delete buckets too.

<!-- Check that no more resources are there. React cleanup? -->
