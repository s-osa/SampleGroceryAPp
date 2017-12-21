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
  AlertIOS,
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

    this.itemsRef = firebaseApp.database().ref();

    this.state = {
      dataSource: new ListView.DataSource(
        {
          rowHasChanged: (row1, row2) => { return row1 !== row2 },
        }
      ),
    };
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  _renderItem(item) {
    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        'Would you like to remove this item?',
        [
          {
            text: 'Complete',
            onPress: (text) => { this.itemsRef.child(item._key).remove() },
          },
          {
            text: 'Cancel',
            onPress: (text) => { console.log('Cancel') },
          },
        ],
        'default',
      );
    };

    return (
      <ListItem item={item} onPress={onPress}/>
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      'Please input item name.',
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({title: text});
          },
        }
      ],
      'plain-text',
    );
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // Get children as an array
      let items = [];

      snap.forEach((child) => {
        items.push(
          {
            title: child.val().title,
            _key: child.key,
          }
        )
      });

      this.setState(
        {
          dataSource: this.state.dataSource.cloneWithRows(items),
        }
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List"/>
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listView}/>
        <ActionButton title="Add" onPress={this._addItem.bind(this)}/>
      </View>
    );
  }
}
