import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {VideoScreen} from '../videoCallComponent/videoScreen';

const StackNavigator = createStackNavigator(
   { 
       VideoScreen: {
        screen: VideoScreen,
      }
    }
);

export default createAppContainer(StackNavigator);