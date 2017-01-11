import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
} from 'react-native';
// import {
//   ExponentConfigView,
// } from '@exponent/samples';
import { List, ListItem } from 'react-native-elements';
import { ProfileHeader } from 'react-native-uikit';

const list = [
  {
    name: 'Kanye East',
    avatar_url: 'http://i0.kym-cdn.com/photos/images/newsfeed/000/470/860/69d.jpeg',
    subtitle: 'East Asia'
  },
  {
    name: 'Kanye West',
    avatar_url: 'http://www.relatably.com/m/img/kanye-west-memes-tumblr/kanye-west.jpg',
    subtitle: 'The OG'
  },
  {
    name: 'Steve Graves',
    avatar_url: 'http://i0.kym-cdn.com/entries/icons/original/000/020/253/gravescigar.jpg',
    subtitle: 'League of Legos'
  },
  {
    name: 'Michael Dwyer',
    avatar_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk0NjM2MTE5M15BMl5BanBnXkFtZTcwODIxMzcyNw@@._V1_UX214_CR0,0,214,317_AL_.jpg',
    subtitle: 'Magneto FTW'
  },
  {
    name: 'Kanye South',
    avatar_url: 'http://i1.kym-cdn.com/photos/images/facebook/000/273/972/7b3.jpg',
    subtitle: 'South West'
  },
  {
    name: 'Kanye North',
    avatar_url: 'http://www.freakingnews.com/pictures/81000/Kanye-West-Chin-Head--81349.jpg',
    subtitle: 'North Pole'
  }
]

export default class Social extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  renderRow (rowData, sectionID) {
  return (
    <ListItem
      roundAvatar
      key={sectionID}
      title={rowData.name}
      subtitle={rowData.subtitle}
      avatar={{uri:rowData.avatar_url}}
    />
  )
  }

  render() {
    return (
      <View
        style={styles.container}>
          <ProfileHeader
          profileImg={'http://images.hngn.com/data/thumbs/full/50109/650/0/0/0/arrow.png'}
          backgroundImg={'http://download.4-designer.com/files/20130905/Creative-graphics-background-vector-material-49766.jpg'}
          />
          <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                onPress={() => console.log('something')}
                avatar={l.avatar_url}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
          </List>
      </View>
    );
  }
}

/*
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('something')}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});