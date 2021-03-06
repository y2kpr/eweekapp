/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

const {LayoutAnimation, Keyboard} = require('react-native');
var Animated = require('Animated');
var Dimensions = require('Dimensions');
var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StatusBar = require('StatusBar');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Text } = require('F8Text');
var InfoModal = require('../common/InfoModal');
var LoginButton = require('../common/LoginButton');
var TouchableOpacity = require('TouchableOpacity');
var Metrics = require('../Metrics');

var { skipInfo } = require('../actions');
var { connect } = require('react-redux');

class LoginScreen extends React.Component {

    keyboardDidShowListener: Object
    keyboardDidHideListener: Object

    componentDidMount() {
        Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
    }

      constructor() {
          super();
          this.state = {
              visibleHeight: Metrics.screenHeight,
              topLogo: { width: Metrics.screenWidth },
              anim: new Animated.Value(0),
              h1FontSize: Math.round(74 * scale),
              h2FontSize: 17,
              h3FontSize: 12
          }
      }

      componentWillMount () {
          // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
          // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
          this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
          this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
      }

      componentWillUnmount () {
          this.keyboardDidShowListener.remove()
          this.keyboardDidHideListener.remove()
      }

      keyboardDidShow(e) {
          // Animation types easeInEaseOut/linear/spring
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          let newSize = Metrics.screenHeight - e.endCoordinates.height
          this.setState({
              visibleHeight: newSize,
              topLogo: {height: 70},
              h1: Math.round(37 * scale),
              h2: 8,
              h3: 6
          })
      }

      keyboardDidHide(e) {
          // Animation types easeInEaseOut/linear/spring
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          this.setState({
              visibleHeight: Metrics.screenHeight,
              topLogo: {width: Metrics.screenWidth},
              h1: {fontSize: Math.round(74 * scale)},
              h2: {fontSize: 17},
              h3: {fontSize: 12}
          })
      }

    render() {
        return (
                <Image
            style={styles.container}
            source={require('./img/login-background.png')}>
                <StatusBar barStyle="default" />
                <TouchableOpacity
            accessibilityLabel="Skip login"
            accessibilityTraits="button"
            style={styles.skip}
            onPress={() => this.props.dispatch(skipInfo())}>
                <Animated.Image
            style={this.fadeIn(2800)}
            source={require('./img/x.png')}
                />
                </TouchableOpacity>
                <View style={[styles.section, styles.topLogo]}>
                <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
                UT EWeek
            </Animated.Text>
                <Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
                Feb 26 - 02 March
            </Animated.Text>
                <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
                AUSTIN, TEXAS
            </Animated.Text>
                </View>
                <InfoModal />
                </Image>
        );
    }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
      fontSize: Math.round(74 * scale),
    color: F8Colors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: F8Colors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

module.exports = connect()(LoginScreen);
