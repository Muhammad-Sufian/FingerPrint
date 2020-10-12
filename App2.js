import React from "react"
import {
    Alert,
    Image,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes,
    Platform,TouchableHighlight
  } from 'react-native';
import TouchID from 'react-native-touch-id';
//or import TouchID from 'react-native-touch-id'

export default class App2 extends React.Component {
  pressHandler() {
    const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
      };
      try{
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        alert('Authenticated Successfully');
      })
      .catch(error => {
        alert('Authentication Failed');
        console.log(error)
      });}
      catch(error){
        console.log('catched: ',error)
      }
  }

  check=()=>{
    const optionalConfigObject = {
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
      }
      
      TouchID.isSupported(optionalConfigObject)
        .then(biometryType => {
          // Success code
          if (biometryType === 'FaceID') {
              console.log('FaceID is supported.');
          } else {
              console.log('TouchID is supported.');
          }
        })
        .catch(error => {
          // Failure code
          console.log(error);
        });
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.pressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.check}>
          <Text>
            Check if supported or not
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}