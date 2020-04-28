import React, {PureComponent} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {AuthService} from '../../services';
import {users} from '../../config';

export default class AuthScreen extends PureComponent {
    state = {isLogging: false};
    setIsLogging = isLogging => this.setState({isLogging});

    login = currentUser => {
                const _onSuccessLogin = () => {
                console.log("this.props auth Screen ------->",this.props)
                const {navigation} = this.props;
                const opponentsIds = users
                    .filter(opponent => opponent.id !== currentUser.id)
                    .map(opponent => opponent.id);
            
                navigation.push('VideoScreen', {opponentsIds});
            };

        const _onFailLogin = (error = {}) => {
            alert(`Error.\n\n${JSON.stringify(error)}`);
          };
      
        this.setIsLogging(true);
      
        AuthService.login(currentUser)
            .then(_onSuccessLogin)
            .catch(_onFailLogin)
            .then(() => this.setIsLogging(false));
    };        
}