import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {VideoScreen} from '../videoCallComponent/videoScreen';

const StackNavigator = createStackNavigator(
  {
    AuthScreen: {
      screen: AuthScreen,
    },
    VideoScreen: {
      screen: VideoScreen,
    },
  },
  {
    initialRouteName: 'AuthScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(StackNavigator);