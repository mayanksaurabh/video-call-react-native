import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {VideoScreen} from '../videoCallComponent/component/videoScreen/index';
import {AuthScreen} from '../videoCallComponent/component/authScreen/index'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


const routes: () => React$Node = () =>{
  return (
    <>    
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="VideoScreen" component={VideoScreen} />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default routes;