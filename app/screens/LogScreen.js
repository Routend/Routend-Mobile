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
import Router from '../navigation/Router';

export default class LogScreen extends React.Component {
  // static route = {
  //   navigationBar: {
  //     title: 'Links',
  //   },
  // }

  constructor(props) {
    super(props);
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>STATISTICS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {

    return (
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', top: 5}}>
          <View style={{justifyContent: 'center', top: 5, alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Logs</Text>
              <Text style={{color: "#D8D8D8"}}>   |   </Text>
              <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('stats')) }}>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Graphs</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container} >

          <Text style={styles.chart_title}>Time Spent Today</Text>

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