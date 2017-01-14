import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import AreaSpline from './js/charts/AreaSpline';
import Pie from './js/charts/Pie';
import Theme from './js/theme';
import data from './resources/data';
import Router from '../navigation/Router';

export default class StatsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>STATISTICS</Text>),
      backgroundColor: '#175785',
    },
  }

  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(data.spendingsPerYear)});
  }

  _shuffle(a) {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }

  render() {
    const height = 200;
    const width = (Dimensions.get('window').width * 0.96);

    return (
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', top: 5}}>
          <View style={{justifyContent: 'center', top: 5, alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
              <TouchableOpacity onPress={() => { this.props.navigator.pop() }}>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Logs</Text>
            </TouchableOpacity>
              <Text style={{color: "#D8D8D8"}}>   |   </Text>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Graphs</Text>
          </View>
        </View>
        <View style={styles.container} >

          <Text style={styles.chart_title}>Time Spent Today</Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={data.spendingsLastMonth} />
          <Text style={styles.chart_title}>Time Spent Per Day in a Month - {data.spendingsLastMonth[this.state.activeIndex].name} </Text>
          <AreaSpline
            width={width}
            height={height}
            data={this.state.spendingsPerYear}
            color={Theme.colors[this.state.activeIndex]} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 10,
  },
  chart_title : {
    justifyContent: 'center',
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor:'white',
    color: '#404d5b',
    opacity: 0.8,
    fontWeight:'bold',
  }
});

      // <View>
      //   <TouchableOpacity onPress={() => {console.log('route', route, 'props', props) } }><View style={{top: 16, left: 15}}><Text style={{fontSize: 12}}>Go Back</Text></View></TouchableOpacity>
      // </View>
