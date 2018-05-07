# Create Your React App

Now you have a Serverless api setup and running. Lets create our react app.

For simplicity lets back up out of our lambda folder in the terminal:

```
cd ../
```

We will build our Serverless react app in a separate folder.

## Setup React App

Install and start your react app:

```
npx create-react-app sls-react
cd sls-react
npm run start
```

## Connect to your service

Add some logic to your client app to interact with our serverless api.

Open `src/App.js` component file.

Add a lifecycle method to the `App` class to initiate a fetch:

```
class App extends Component {
  componentDidMount() {
    fetch('<YOUR API URL>')
      .then(res => res.json())
      .then(data => this.setState({data}));
  }
  ...
```

`<YOUR API URL>` should be the deployed url provided in the output logs when you deployed your Serverless lambda.

## React to your service

We need to do something with the data from our lambda. To do this we will:

* create a state within our component to persist our fetched data
* change our component render method to respond to changes in the state

First, add a constructor with an initial state:

```
class App extends Component {
  constructor() {
    super();

    this.state = {
      data: null
    }
  }
  ...
```


Finally, replace the render method to display the fetched data from our state:

```
  render() {
    const { data } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{!data ? 'Loading...' : data.message }</h1>
        </header>
      </div>
    );
  }
```

**Note:** If the data has not loaded (data is null by default), a simple "Loading ..." message will be displayed by default whilst the data is being fetched.

*Why do this?* To visually see our component render data that has been fetched from our lambda service.

You should now be able to see the message, from your lambda, displayed in your browser.

## Build

Ok! Things are working locally. But **It Works On My Machine&trade;** is not good enough. We need to deploy this somewhere ... right? Yes!

Before we do this we need to build our application so its ready to run on any (modern 😅) browser.

Run the following command to build your app:
```
npm run build
```

Once complete you will see all the files we need to deploy inside the `./build` folder.

Run the following command to test that your built app will work as expected:

```
npx serve --open --single build
```

**Great!** Ready to deploy 💪!

## Deploy with Serverless

Because our react app runs in the browser and is not rendered server side, we can simply deploy our code to S3. Simple!?

### Serverless setup

First, install `serverless` as a dev dependency

```
npm install --save-dev serverless
```

Update your `package.json` with a script alias for `serverless` as `sls`

```
scripts: {
  ...
  "sls": "serverless"
  ...
}
...
```

Next, we need to initialise your project with severless:

```
npm run sls -- create --template hello-world
```

The `hello-world` template will create two files; `handler.js` and `serverless.yml`. **DELETE** `handler.js`. We do not need it.

**ASIDE** `serverless create` annoyingly overwrites your `.gitignore`, so double check that file is as you want. Not a big deal to just move on.

Next install the `serverless-s3-deploy` plugin:

```
npm run sls -- plugin install -n serverless-s3-sync
```

This will update your `serverless.yml` with a new dependency. Check it out!

## Configure Serverless to upload to S3

Ok we are going to cheat here! Replace your entire `serverless.yml` with the following:

```
service: <YOUR CLIENT APP NAME>

provider:
  name: aws
  runtime: nodejs8.10
  region: <YOUR DESIRED REGION>

plugins:
  - serverless-s3-sync

custom:
  bucketName: ${self:service}-assets
  s3Sync:
    - bucketName: ${self:custom.bucketName}
      localDir: build/
      acl: public-read
      params:
        - index.html

resources:
  Resources:
      AssetsBucket:
        Type: AWS::S3::Bucket
        Properties:
          BucketName: ${self:custom.bucketName}
          AccessControl: PublicRead
          WebsiteConfiguration:
            IndexDocument: index.html
```

**IMPORTANT** You need to make the following changes to the configuration:
* replace `<YOUR DESIRED REGION>` e.g eu-west-1
* replace `<YOUR CLIENT APP NAME>`
* replace `<YOUR DESIRED BUCKET NAME>` with a globally unique name

Time to deploy! Run the following command:

```
npm run sls -- deploy
```

😅: If you get an error from AWS please make sure you have your aws credentials setup and correct permissions! Click [here](http://bit.ly/aws-creds-setup) for more information on how to configure or visit http://bit.ly/aws-creds-setup.

No errors `===` **SUCCESS**. You should now be able to access your app at the following url:

`http://<YOUR DESIRED BUCKET NAME>.s3-website-<YOUR DESIRED REGION>.amazonaws.com`

🙌🙌🙌🙌🙌🙌🙌🙌🙌🙌
