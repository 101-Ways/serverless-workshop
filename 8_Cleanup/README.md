## Removing stack

If you want to remove CloudFormation stack, you can simply run:

`serverless remove`

The only thing remaining will be S3 bucket where Serverless Framework kept deployment packages.

You can also go to AWS Console website and delete CloudFormation stack from there. Still: don't forget to clean up S3 buckets.

<!-- Check that no more resources are there. React cleanup? -->