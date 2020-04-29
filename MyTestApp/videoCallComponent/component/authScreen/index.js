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
                console.log("this.props auth Screen ------->",this.props);
                const {navigation} = this.props;
                const opponentsIds = users
                    .filter(opponent => opponent.id !== currentUser.id)
                    .map(opponent => opponent.id);
                console.log("opponent user ids auth screen------>", opponentsIds);    
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
    
    render() {
        const {isLogging} = this.state;
        return (
            <View style={[styles.container, styles.f1]}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <SafeAreaView style={[styles.centeredChildren, styles.f1]}>
                <View
                    style={[
                    styles.f1,
                    styles.centeredChildren,
                    {flexDirection: 'row'},
                    ]}>
                    <Text>{isLogging ? 'Connecting... ' : 'Video Chat'}</Text>
                    {isLogging && <ActivityIndicator size="small" color="#1198d4" />}
                </View>
                </SafeAreaView>
                <SafeAreaView style={[styles.authBtns, styles.f1]}>
                {users.map(user => (
                    <TouchableOpacity key={user.id} onPress={() => this.login(user)}>
                    <View
                        style={[styles.authBtn(user.color), styles.centeredChildren]}>
                        <Text style={styles.authBtnText}>
                        {`Log in as ${user.name}`}
                        </Text>
                    </View>
                    </TouchableOpacity>
                ))}
                </SafeAreaView>
            </View>
        );
    }
}