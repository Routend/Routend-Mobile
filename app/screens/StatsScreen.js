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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Router from '../navigation/Router';
import styles from '../stylesheets/GraphStyles.js';

class StatsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
      currStats: [],
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }

  componentWillMount() {
    this.state.totalHours = 0;
    for (var i = 0; i < this.props.currLogs.length; i++) {
      this.state.totalHours = this.state.totalHours + this.props.currLogs[i].time_spent;
    }
    for (var i = 0; i < this.props.currLogs.length; i++) {
    this.state.currStats.push({number: Math.round(((this.props.currLogs[i].time_spent / this.state.totalHours) * 100)), name: this.props.currLogs[i].category})
    }
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
        <View style={styles.mainView}>
          <View style={styles.bar}>
              <TouchableOpacity onPress={() => { this.props.navigator.pop() }}>
              <Text style={styles.log}>Logs</Text>
            </TouchableOpacity>
              <Text style={styles.divider}>   |   </Text>
              <Text style={styles.graph}>Graphs</Text>
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
            data={this.state.currStats} />
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


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currLogs: state.userStats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);
