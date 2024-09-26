1\. Install the SDK
```sh
npm install unleash-proxy-client
```

2\. Initialize Unleash
```js
const { UnleashClient } = require('unleash-proxy-client');

const unleash = new UnleashClient({
    url: '<YOUR_API_URL>',
    clientKey: '<YOUR_API_TOKEN>',
    appName: 'unleash-onboarding-javascript',
    refreshInterval: 5000,
});

unleash.start();
```

3\. Check feature flag status
```js
setInterval(() => {
    console.log('Is enabled', unleash.isEnabled('<YOUR_FLAG>'));
}, 1000);
```