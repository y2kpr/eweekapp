/*

@flow
*/

const React = require('React');
const Animated = require('Animated');
const {Alert, StyleSheet, TextInput, LayoutAnimation, Keyboard} = require('react-native');
const F8Button = require('F8Button');
var { Text } = require('F8Text');
var { connect } = require('react-redux');
var { postAttendee } = require('../actions/parse')
var { Form, InputField,
  Separator, SwitchField, LinkField ,
      PickerField, KeyboardAwareScrollView }  = require('react-native-form-generator');
var Metrics = require('../Metrics/')

  class InfoModal extends React.Component {

      keyboardDidShowListener: Object
      keyboardDidHideListener: Object

      constructor() {
          super();
          this.state = {
              formData:{name:"initial"},
              formMargin: {marginBottom: 0}
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
              formMargin: {marginBottom: 300}
          })
      }

      keyboardDidHide(e) {
          // Animation types easeInEaseOut/linear/spring
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          this.setState({
              formMargin: {marginBottom: 0}
          })
      }

    isValidFormData(formData){
      // Validate email
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

      if (reg.test(formData.email) == false)
      {
        Alert.alert(
          'Invalid Email Address',
          'Please enter a valid email address',
          [ {text: 'OK', onPress: () => console.log('OK Pressed')} ]
        );
        return false;
      }
      return true;
    }

    handleFormChange(formData){
      this.setState({formData:formData})
      console.log("Updating formData" + this.state.formData.name)
      this.props.onFormChange && this.props.onFormChange(formData);
    }

    handleSubmit(){
      console.log("Handling Submit with " + this.state.formData.name + this.state.formData.email + this.state.formData.year + this.state.formData.major);
      if(!this.isValidFormData(this.state.formData))
        return;
      // Calling an action to add an attendee to the db
       this.props.dispatch(postAttendee(this.state.formData.name, this.state.formData.email,
        this.state.formData.year, this.state.formData.major));
    }

      handleFormFocus(event, reactNode){
          this.refs.scroll.scrollToFocusedInput(event, reactNode).bind(this)
      }

      render() {
          return(
                  <Form
              ref="profile_info_form"
              label="Some general info about you"
              onChange={this.handleFormChange.bind(this)}
              style={this.state.formMargin}>
                  <InputField ref='name' label='Name' placeholder='Name'/>
                  <InputField ref='email' label='University email' placeholder='University Email'/>
                  <PickerField ref='year' label='Year'
                 options={{
                     freshman: 'Freshman',
                     sophomore: 'Sophomore',
                     junior: 'Junior',
                     senior: 'Senior',
                     graduate: 'Graduate',
                     not_applicable: 'Not Applicable'
                 }}/>
                 <InputField ref='major' label='Major' placeholder='N/A if not applicable'/>
                 <F8Button
                 type='primary' caption='Submit Profile'
                 onPress={this.handleSubmit.bind(this)}/>
                 </Form>
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

    // Dummy function so that connect() can be used
    function select(store) {
      return {
        isNotLoggedIn: store.user.hasSkippedLogin,
      };
    }
    //
    // function actions(dispatch) {
    //   return {
    //     postAttendee: (Name, Email, Year, Major) =>
    //       dispatch(postAttendee(Name, Email, Year, Major))
    //   }
    // }

    module.exports = connect(select)(InfoModal);
