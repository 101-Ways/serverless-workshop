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

You can now refactor your handler to be **async**. Here is how your `handler.js` could look like:

```js
async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

module.exports = { hello };
```
