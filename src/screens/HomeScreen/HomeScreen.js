import React, {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions,
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

const HomeScreen = () => {
  // const [contactList, setContactList] = useState([]);
  // useLayoutEffect(() => {
  //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //     title: 'Contacts',
  //     message: 'This app would like to view your contacts.',
  //     buttonPositive: 'Please accept bare mortal',
  //   })
  //     .then(() => Contacts.getAll())
  //     .then((contacts) => {
  //       console.log('contacts:', contacts);
  //       setContactList(contacts);
  //     });
  // }, []);

  // const [chartOptions, setChartOptions] = useState();

  // useEffect(()=>{
  //   setChartOptions([
  //     [
  //       [0, 1],
  //       [1, 3],
  //       [3, 7],
  //       [4, 9],
  //     ],
  //   ];)
  // }, [])

  // const showActionSheet = (phoneItem, item) => {
  //   const BUTTONS = ['电话', '短信', '取消'];
  //   console.info('showActionSheet');
  //   ActionSheet.showActionSheetWithOptions(
  //     {
  //       title: 'Title',
  //       message: 'Description',
  //       options: BUTTONS,
  //       cancelButtonIndex: 2,
  //     },
  //     (buttonIndex) => {
  //       console.log('buttonIndex:', buttonIndex);
  //       switch (+buttonIndex) {
  //         case 0:
  //           Communications.phonecall(phoneItem.number, true);
  //           break;
  //         case 1:
  //           const smsText =
  //             'Hi~' +
  //             item.displayName +
  //             '🎉,after a period of testing, the system is running well, and achieved the desired results.🎨';
  //           Communications.text(phoneItem.number, smsText);
  //           break;
  //         default:
  //           Toast.info('取消了', 1);
  //           console.info('取消了');
  //           break;
  //       }
  //     },
  //   );
  // };

  const [location, setLocation] = useState([]);
  useLayoutEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: '位置',
        message: '要读取你的位置.',
        buttonPositive: '行吧',
      },
    ).then((isPermission) => {
      if (isPermission === 'granted') {
        console.log('isPermission:', isPermission);
      }
    });
  }, []);
  const [center, setCenter] = useState({
    latitude: 22.567055,
    longitude: 113.873149,
  });
  useEffect(() => {
    console.log('----------');
    console.log('location:', location);
    console.log('center:', center);
    console.log('----------');
    setLocation([...location, center]);
    return () => {
      setLocation([]);
    };
  }, [center.latitude, center.longitude]);

  const onItemPress = () => {
    console.log('---onItemPress---');
    // alert(JSON.stringify(location));
    Clipboard.setString(JSON.stringify(location));
  };
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        locationEnabled
        coordinate={{
          latitude: 22.567055,
          longitude: 113.873149,
        }}
        locationEnabled
        locationInterval={10000}
        distanceFilter={10}
        onLocation={(center) => {
          if (center != null) {
            setCenter(center);
          }
        }}>
        <MapView.Polyline
          width={10}
          color="rgba(255, 0, 0, 0.5)"
          coordinates={location}
        />
        {/* <MapView.MultiPoint
          image="point"
          points={location}
          onItemPress={() => onItemPress()}
        /> */}
        <MapView.Marker
          active
          coordinate={{
            latitude: 22.567055,
            longitude: 113.873149,
          }}>
          <View style={styles.infoWindow}>
            <Text onPress={() => onItemPress()}>
              {JSON.stringify(location)}
            </Text>
          </View>
        </MapView.Marker>
      </MapView>
    </View>

    // <View>
    //   {/* <NoticeBar mode="closable" onPress={() => alert('will close')}>
    //     Notice: The arrival time of incomes and transfers of Yu 'E Bao will be
    //     delayed during National Day.
    //   </NoticeBar> */}
    //   {/* <WhiteSpace size="lg" /> */}
    //   {/* 图表 */}
    //   {/* <WingBlank size="lg">
    //     <Text>Bezier Line Chart</Text>
    //     <LineChart
    //       data={{
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //         datasets: [
    //           {
    //             data: [
    //               Math.random() * 100,
    //               Math.random() * 100,
    //               Math.random() * 100,
    //               Math.random() * 100,
    //               Math.random() * 100,
    //               Math.random() * 100,
    //             ],
    //           },
    //         ],
    //       }}
    //       width={Dimensions.get('window').width - 30} // from react-native
    //       height={220}
    //       yAxisLabel="$"
    //       yAxisSuffix="k"
    //       yAxisInterval={1} // optional, defaults to 1
    //       chartConfig={{
    //         backgroundColor: '#e26a00',
    //         backgroundGradientFrom: '#fb8c00',
    //         backgroundGradientTo: '#ffa726',
    //         decimalPlaces: 2, // optional, defaults to 2dp
    //         color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //         labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //         style: {
    //           borderRadius: 16,
    //         },
    //         propsForDots: {
    //           r: '6',
    //           strokeWidth: '2',
    //           stroke: '#ffa726',
    //         },
    //       }}
    //       bezier
    //       style={{
    //         marginVertical: 8,
    //         borderRadius: 16,
    //       }}
    //     />
    //   </WingBlank> */}
    //   <WhiteSpace size="lg" />
    //   <Text>地图：</Text>
    //   {/* <MapView
    //     style={StyleSheet.absoluteFill}
    //     center={{
    //       latitude: 39.91095,
    //       longitude: 116.37296,
    //     }}
    //   /> */}
    //   <MapView
    //     style={StyleSheet.absoluteFill}
    //     locationEnabled
    //     onLocation={({nativeEvent}) => {
    //       console.log('nativeEvent:', nativeEvent);
    //       if (nativeEvent) {
    //         console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`);
    //       }
    //     }}
    //   />
    //   {/* <WhiteSpace size="lg" /> */}
    //   {/* 通讯录 */}
    //   {/* <WingBlank size="lg">
    //     {contactList.map((item, index) => {
    //       return (
    //         <Card key={index}>
    //           <Card.Header
    //             title={item.displayName}
    //             thumbStyle={{width: 30, height: 30}}
    //             thumb={
    //               item.thumbnailPath != '' ? item.thumbnailPath : undefined
    //             }
    //             extra=""
    //           />
    //           <Card.Body>
    //             <View>
    //               {item.phoneNumbers.map((phoneItem, phoneIndex) => {
    //                 return (
    //                   <Text
    //                     key={phoneIndex}
    //                     style={{marginLeft: 16}}
    //                     onPress={() => showActionSheet(phoneItem, item)}>
    //                     {phoneItem.label}: {phoneItem.number}
    //                   </Text>
    //                 );
    //               })}
    //             </View>
    //           </Card.Body>
    //           <Card.Footer
    //             content="footer content"
    //             extra="footer extra content"
    //           />
    //         </Card>
    //       );
    //     })}
    //   </WingBlank> */}
    // </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  infoWindow: {
    backgroundColor: '#8bc34a',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#689F38',
  },
});
