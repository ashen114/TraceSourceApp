/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Provider} from '@ant-design/react-native';

import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const App: () => React$Node = () => {
  return (
    <>
      <Provider>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <HomeScreen></HomeScreen>
        </SafeAreaView>
      </Provider>
    </>
  );
};

export default App;
