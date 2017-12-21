/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource(
        {
          rowHasChanged: (row1, row2) => { return row1 !== row2 },
        }
      ),
    };
  }

  componentDidMount() {
    this.setState(
      {
        dataSource: this.state.dataSource.cloneWithRows([{title: 'Pizza'}])
      }
    );
  }

  _renderItem(item) {
    return (
      <ListItem item={item} onpress={ () => {} }/>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List"/>
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listView}/>
        <ActionButton title="Add" onpress={ () => {""}}/>
      </View>
    );
  }
}
