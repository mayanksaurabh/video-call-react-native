import {Platform, ToastAndroid} from 'react-native';
import Toast from 'react-native-simple-toast';
import ConnectyCube from 'react-native-connectycube';
import InCallManager from 'react-native-incall-manager';
import Sound from 'react-native-sound';
import {users} from  '../config';

export default class CallService  {
    static MEDIA_OPTIONS = {audio: true, video: {facingMode: 'user'}};
    _session = null;
    mediaDevices = [];

    outgoingCall = new Sound(require('../../assets/sound/dialing.mp3'));
    incomingCall = new Sound(require('../../assets/sound/calling.mp3'));
    endCall = new Sound(require('../../assets/sound/end_call.mp3'));

    showToast = text => {
        const commonToast = Platform.OS === 'android' ? ToastAndroid : Toast;
    
        commonToast.showWithGravity(text, Toast.LONG, Toast.TOP);
    };

    setMediaDevices() {
        return ConnectyCube.videochat.getMediaDevices().then(mediaDevices => {
          this.mediaDevices = mediaDevices;
        });
    }

    acceptCall = session => {
        this.stopSounds();
        this._session = session;
        this.setMediaDevices();
    
        return this._session
          .getUserMedia(CallService.MEDIA_OPTIONS)
          .then(stream => {
            this._session.accept({});
            return stream;
          });
    };

    getUserById = (userId, key) => {
        const user = users.find(user => user.id == userId);
        if (typeof key === 'string') {
          return user[key];
        }
        return user;
    };

    stopCall = () => {
      this.stopSounds();
  
      if (this._session) {
        this.playSound('end');
        this._session.stop({});
        ConnectyCube.videochat.clearSession(this._session.ID);
        this._session = null;
        this.mediaDevices = [];
      }
    };

    rejectCall = (session, extension) => {
      this.stopSounds();
      session.reject(extension);
    };

    setAudioMuteState = mute => {
      if (mute) {
        this._session.mute('audio');
      } else {
        this._session.unmute('audio');
      }
    };

    setSpeakerphoneOn = flag => InCallManager.setSpeakerphoneOn(flag);

    //user not answering the call
    processOnUserNotAnswerListener(userId) {
      return new Promise((resolve, reject) => {
        if (!this._session) {
          reject();
        } else {
          const userName = this.getUserById(userId, 'name');
          const message = `${userName} did not answer`;
  
          this.showToast(message);
  
          resolve();
        }
      });
    }

    //incoming call
    processOnCallListener(session) {
      return new Promise((resolve, reject) => {
        if (session.initiatorID === session.currentUserID) {
          reject();
        }
  
        if (this._session) {
          this.rejectCall(session, {busy: true});
          reject();
        }
  
        this.playSound('incoming');
  
        resolve();
      });
    }

    // when call accepted
    processOnAcceptCallListener(session, userId, extension = {}) {
      return new Promise((resolve, reject) => {
        if (userId === session.currentUserID) {
          this._session = null;
          this.showToast('You have accepted the call on other side');
  
          reject();
        } else {
          const userName = this.getUserById(userId, 'name');
          const message = `${userName} has accepted the call`;
  
          this.showToast(message);
          this.stopSounds();
  
          resolve();
        }
      });
    }
    
    // when call rejected
    processOnRejectCallListener(session, userId, extension = {}) {
      return new Promise((resolve, reject) => {
        if (userId === session.currentUserID) {
          this._session = null;
          this.showToast('You have rejected the call on other side');
  
          reject();
        } else {
          const userName = this.getUserById(userId, 'name');
          const message = extension.busy
            ? `${userName} is busy`
            : `${userName} rejected the call request`;
  
          this.showToast(message);
          resolve();
        }
      });
    }

    //below 2 functions not understood
    processOnStopCallListener(userId, isInitiator) {
      return new Promise((resolve, reject) => {
        this.stopSounds();
  
        if (!this._session) {
          reject();
        } else {
          const userName = this.getUserById(userId, 'name');
          const message = `${userName} has ${
            isInitiator ? 'stopped' : 'left'
          } the call`;
  
          this.showToast(message);
  
          resolve();
        }
      });
    }
  
    processOnRemoteStreamListener = () => {
      return new Promise((resolve, reject) => {
        if (!this._session) {
          reject();
        } else {
          resolve();
        }
      });
    };

    playSound = type => {
      switch (type) {
        case 'outgoing':
          this.outgoingCall.setNumberOfLoops(-1);
          this.outgoingCall.play();
          break;
        case 'incoming':
          this.incomingCall.setNumberOfLoops(-1);
          this.incomingCall.play();
          break;
        case 'end':
          this.endCall.play();
          break;
  
        default:
          break;
      }
    };

    stopSounds = () => {
      if (this.incomingCall.isPlaying()) {
        this.incomingCall.pause();
      }
      if (this.outgoingCall.isPlaying()) {
        this.outgoingCall.pause();
      }
    };
  

}