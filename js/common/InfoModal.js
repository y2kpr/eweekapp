/*

@flow
*/

const React = require('React');
const Animated = require('Animated');
const {StyleSheet, TextInput} = require('react-native');
const F8Button = require('F8Button');
var { Text } = require('F8Text');

class InfoModal extends React.Component {
  constructor() {
    super();
  }

  render() {
    return(
      <Animated.View style={[styles.section]}>
        <Text>
          Some general info about you.
        </Text>
        <TextInput
          value="First Name"
        />
        <F8Button
          style={[styles.button, this.props.style]}
          icon={require('../login/img/f-logo.png')}
          caption="Submit Info"
          onPress={() => this.submitInfo()}
        />
      </Animated.View>

    );
  }

  async submitInfo() {
    
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  button: {
    alignSelf: 'center',
    width: 270,
  },
});
module.exports = InfoModal;
