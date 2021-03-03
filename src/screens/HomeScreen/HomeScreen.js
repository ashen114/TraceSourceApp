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

import {goToWorkLocation, pingZhouLocation} from '../../mock/locations';
import {fetchData} from '../../utils/fetch';

const HomeScreen = () => {
  const [chartOptions, setChartOptions] = useState({
    labels: [''],
    datasets: [0],
  });

  const onItemPress = async () => {
    console.log('---onItemPress---');
    const updateData = await fetchData
      .put(
        'https://ad74yq1l.lc-cn-n1-shared.com/1.1/classes/Test/603f9ebbf8ac3a24dee42f8a',
        {
          labels: ['周一', '周二', '周三', '周四', '周五'],
          datasets: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
          ],
        },
      )
      .catch((error) => {
        console.log('error:', error);
      });

    let nowTime = new Date();
    console.info('-------------------START--------------------');
    console.info('------------' + nowTime + '------------');

    console.info('updateData:', updateData);

    const data = await fetchData
      .get(
        'https://ad74yq1l.lc-cn-n1-shared.com/1.1/classes/Test/603f9ebbf8ac3a24dee42f8a',
      )
      .catch((error) => {
        console.log('error:', error);
      });

    console.info('data:', data);
    console.info('-----------------END--------------------');
    /**
     * 如果get请求不知道某个objectid，会返回data.results: [{...}]否则只返回data: {...}
     */
    if (data) {
      let {labels, datasets} = data;
      setChartOptions({
        labels,
        datasets,
      });
    }
  };

  return (
    <View>
      <NoticeBar mode="closable" onPress={() => alert('will close')}>
        Notice: The arrival time of incomes and transfers of Yu 'E Bao will be
        delayed during National Day.
      </NoticeBar>
      <WhiteSpace size="lg" />
      <Button type="primary" onPress={() => onItemPress()}>
        Test
      </Button>
      <WhiteSpace size="lg" />
      {/* 图表 */}
      <WingBlank size="lg">
        <Text>Bezier Line Chart</Text>
        <LineChart
          data={{
            labels: chartOptions.labels,
            datasets: [
              {
                data: chartOptions.datasets,
              },
            ],
          }}
          width={Dimensions.get('window').width - 30} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </WingBlank>
    </View>
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
