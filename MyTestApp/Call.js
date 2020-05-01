import React,{Component} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';
  import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  import {AuthService} from '../MyTestApp/videoCallComponent/services'
  import Navigator from '../MyTestApp/videoCallComponent/navigator'


  export default class Call extends Component () {
    constructor(props) {
      super(props);
  
      AuthService.init();
    }
    render = () => <Navigator />;

      // return (
      //       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //           <Text> Inside Call Screen</Text>
      //           <Text> We will make an awesome call feature</Text>
      //           <Button title = "Video Call Mayank" 
      //             color = 'blue' 
      //           />
      //             <Button title = "Audio Call Mayank" 
      //             color = 'purple' 
      //            />
      //       </View>

      // );
  }