'use strict';

const hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };
};

// Workaround for serverless-offline bug on async handlers: https://github.com/dherault/serverless-offline/issues/384
const offlineFix = asyncHandler => (event, context, callback) => 
  asyncHandler(event, context).then(
    result => callback(null, result),
    error => callback(error)
  );

module.exports = { hello: offlineFix(hello) };
