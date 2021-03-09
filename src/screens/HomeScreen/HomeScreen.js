import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  NoticeBar,
  Accordion,
  List,
  Card,
  WhiteSpace,
  WingBlank,
  ActionSheet,
  Button,
  Provider,
  Toast,
} from '@ant-design/react-native';
import Contacts from 'react-native-contacts';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Communications from 'react-native-communications';
import {MapView} from 'react-native-amap3d';
import {RNCamera} from 'react-native-camera';
import {goToWorkLocation, pingZhouLocation} from '../../mock/locations';
import {fetchData} from '../../utils/fetch';
import RNFS from 'react-native-fs';

import {pictureList} from './../../mock/pictureList';

const HomeScreen = () => {
  const imgUrl =
    'http://lc-ad74yq1l.cn-n1.lcfile.com/b665853a3299e1a312c5.png/VRChat_1920x1080_2021-01-01_00-00-05.072.png';

  const [picList, setPicList] = useState([]);

  useEffect(() => {
    let picPathList = pictureList.map((item) => {
      return 'file://' + item.path;
    });
    console.log('picPathList:', picPathList);
    setPicList(picPathList);
  }, []);

  const takePicture = async (camera) => {
    if (camera) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');

          const data = await camera.takePictureAsync();
          console.warn('picture url ', data.uri);
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );

  return (
    <View>
      <NoticeBar mode="closable" onPress={() => alert('will close')}>
        Notice: The arrival time of incomes and transfers of Yu 'E Bao will be
        delayed during National Day.
      </NoticeBar>
      <WhiteSpace size="lg" />
      {/* 'file:///data/user/0/com.tracesourceapp/cache/Camera/034fb64d-328a-40dc-a199-01e6e4020a4e.jpg', */}
      <Image
        source={{
          uri:
            'file:///data/user/0/com.tracesourceapp/cache/Camera/76c437a4-ca8b-4bd3-b162-eb95418b0def.jpg',
        }}
        style={{
          width: Dimensions.get('window').width - 10,
          height: 200,
          margin: 5,
        }}
      />
      <View>
        {picList.map((path, index) => {
          return (
            <Image
              key={index}
              source={{
                uri: path,
              }}
              style={{
                width: Dimensions.get('window').width - 10,
                height: 200,
                margin: 5,
              }}
            />
          );
        })}
      </View>
      <WhiteSpace size="lg" />
      <View style={styles.camera}>
        <RNCamera style={styles.preview} type={RNCamera.Constants.Type.back}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
      <WhiteSpace size="lg" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  picture: {
    width: Dimensions.get('window').width,
    height: 100,
  },
  camera: {
    height: 100,
    width: 100,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
