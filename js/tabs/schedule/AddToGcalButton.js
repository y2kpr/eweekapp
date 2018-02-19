'use strict';

var Image = require('Image');
import LinearGradient from 'react-native-linear-gradient';
var React = require('React');
var StyleSheet = require('StyleSheet');
var { Text } = require('F8Text');
var TouchableOpacity = require('TouchableOpacity');
var View = require('View');
var Animated = require('Animated');

type Props = {
  onPress: () => void;
  style?: any;
}

type State = {
  anim: Animated.Value;
};

const LABEL = 'Add to GCal'

class AddToGcalButton extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      anim: new Animated.Value(props.isAdded ? 1 : 0),
    };
  }

  render() {
    const colors = ['#6A6AD5', '#6F86D9'];

    const addOpacity = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 40],
        }),
      }],
    };

    const addOpacityImage = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
        }),
      }],
    };

    const addedOpacity = {
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0],
        }),
      }],
    };

    const addedOpacityImage = {
      opacity: this.state.anim.interpolate({
        inputRange: [0.7, 1],
        outputRange: [0, 1],
      }),
      transform: [{
        translateY: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [-80, 0],
        }),
      }],
    };

    return (
      <TouchableOpacity
        accessibilityLabel={LABEL}
        accessibilityTraits='button'
        onPress={this.props.onPress}
        activeOpacity={0.9}
        style={[styles.container, this.props.style]}>
        <LinearGradient
          start={[0.5, 1]} end={[1, 1]}
          colors={colors}
          collapsable={false}
          style={styles.button}>
          <View style={{flex: 1}}>
            <View style={styles.content}>
              <Animated.Image
                source={require('./img/add.png')}
                style={[styles.icon, addOpacityImage]}
              />
              <Animated.Text style={[styles.caption, addOpacity]}>
                <Text>{LABEL.toUpperCase()}</Text>
              </Animated.Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const HEIGHT = 50;

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: HEIGHT,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 12,
  },
  caption: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
  },
});

module.exports = AddToGcalButton;
