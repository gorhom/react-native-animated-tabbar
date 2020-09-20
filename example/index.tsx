import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

/**
 * @DEV
 * this code is helpful to monitor communication that reanimated use
 * via the native bridge.
 */

// import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

// let count = 0;
// const spyFunction = msg => {
//   if (msg.module === 'ReanimatedModule') {
//     console.log(++count, msg);
//   }
// };

// MessageQueue.spy(spyFunction);
