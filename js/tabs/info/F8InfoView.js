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
 * @providesModule F8InfoView
 * @flow
 */
'use strict';

var CommonQuestions = require('./CommonQuestions');
var Linking = require('Linking');
var LinksList = require('./LinksList');
var ListContainer = require('ListContainer');
var PureListView = require('../../common/PureListView');
var React = require('React');
var Relay = require('react-relay');
var { Text } = require('F8Text');
var View = require('View');
var WiFiDetails = require('./WiFiDetails');
var StyleSheet = require('StyleSheet');
var F8Touchable = require('F8Touchable');
var F8Colors = require('F8Colors');


const POLICIES_LINKS = [{
  title: 'Terms of Service',
  url: 'https://m.facebook.com/terms?_rdr',
}, {
  title: 'Data Policy',
  url: 'https://m.facebook.com/policies?_rdr',
}];

const CREDIT_LINKS = [{
    title: 'MAN 337',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfZxGmPnJ19JGWiq3HUuuD4tLLkiXXGuEe7ECjnzMPa-dLPtQ/viewform?c=0&w=1'
}];

const VOLUNTEER_LINKS = [{
    title: 'Check-in Form',
    url: 'https://www.bit.ly/utleaeweek1'
}];


function F8InfoView() {
  return (
    <ListContainer
      title="Information"
      backgroundImage={require('./img/info-background.png')}
      backgroundColor={'#47BFBF'}>
      <InfoList />
    </ListContainer>
  );
}


function InfoList({viewer: {config, faqs, pages}, ...props}) {
  return (
    <PureListView
      renderEmptyList={() => (
        <View>
              <LinksList title="Extra Credit" links={CREDIT_LINKS} />
              <LinksList title="For Volunteers" links={VOLUNTEER_LINKS} />
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={2}>
            Link to Event Registration
          </Text>
        </View>
      )}
      {...(props: any /* flow can't guarantee the shape of props */)}
    />
  );
}

InfoList = Relay.createContainer(InfoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        config {
          wifiNetwork
          wifiPassword
        }
        faqs {
          question
          answer
        }
        pages {
          title
          url
          logo
        }
      }
    `,
  },
});
var styles = StyleSheet.create({
  separator: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 60,
  },
  title: {
    fontSize: 17,
    color: F8Colors.darkText,
    flex: 1,
  },
  button: {
    padding: 10,
  },
  like: {
    letterSpacing: 1,
    color: F8Colors.actionText,
    fontSize: 12,
  },
});

module.exports = F8InfoView;
