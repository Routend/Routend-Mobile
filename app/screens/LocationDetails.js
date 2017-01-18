import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, ArticleText, Button, GalleryOffset, AvatarHeader, RatingBox, DateItem } from 'react-native-uikit';

// {this.props.route.params.name}

let openinghours = [
            "Monday: 10:00 AM – 8:30 PM",
            "Tuesday: 10:00 AM – 8:30 PM",
            "Wednesday: 10:00 AM – 8:30 PM",
            "Thursday: 10:00 AM – 8:30 PM",
            "Friday: 10:00 AM – 8:30 PM",
            "Saturday: 10:00 AM – 8:30 PM",
            "Sunday: 10:45 AM – 7:00 PM"
         ];

let testingreviews = [
         {
            "aspects" : [
               {
                  "rating" : 1,
                  "type" : "overall"
               }
            ],
            "author_name" : "Kimberley Johnson",
            "author_url" : "https://www.google.com/maps/contrib/105015853784114053231/reviews",
            "language" : "en",
            "profile_photo_url" : "//lh4.googleusercontent.com/-LImyr5Nskcs/AAAAAAAAAAI/AAAAAAAAPUA/yyYrmXE4EDY/s128/photo.jpg",
            "rating" : 3,
            "relative_time_description" : "3 months ago",
            "text" : "0 stars for listening to what I ask for, 2 stars for food quality, 1 star because there's always someone there that tries to make it right. When I ask for ingredients, I get the wrong ones. When I ask for a little, I get a ladle full. Today I tried the new chorizo and it was charred black. The manager offered to make it again, and when I said I was in a hurry she paid for my lunch. What happened, Chipotle? You used to be the best!",
            "time" : 1475615298
         },
         {
            "aspects" : [
               {
                  "rating" : 0,
                  "type" : "overall"
               }
            ],
            "author_name" : "Bri A",
            "author_url" : "https://www.google.com/maps/contrib/112157346224909252921/reviews",
            "language" : "en",
            "profile_photo_url" : "//lh5.googleusercontent.com/-bDNrMOHnblo/AAAAAAAAAAI/AAAAAAAAHZU/luIlicwyfpE/s128/photo.jpg",
            "rating" : 2,
            "relative_time_description" : "6 months ago",
            "text" : "Food is good but for some reason I always get the bottom of what's left. There is also a sign while waiting in line to text a number for free chips and guac. It did not work. I told the cashier 'Ashley' so they would be aware. She shrugged her shoulders  rolled her eyes and asked \"for here or to go?\" Associate beside her wrapped my burrito and left it where i had to reach across for it. I know working at fast food sucks, but customer service should be used no matter what.",
            "time" : 1468893681
         },
         {
            "aspects" : [
               {
                  "rating" : 1,
                  "type" : "overall"
               }
            ],
            "author_name" : "Adriana Davis",
            "author_url" : "https://www.google.com/maps/contrib/105951873944690667996/reviews",
            "language" : "en",
            "profile_photo_url" : "//lh5.googleusercontent.com/-vmFRKAkUgs8/AAAAAAAAAAI/AAAAAAAAAZs/KT7DxvvbrzI/s128/photo.jpg",
            "rating" : 3,
            "relative_time_description" : "4 months ago",
            "text" : "I would love it more if they don't keep dismissing me for dinner. This was the third time I went and always they be closing. Gosh, I didn't know it was that time already. \n\nEdited Review: Two weeks ago, I went into this Chipotle inside the Westfield Mall wanting a burrito supreme, it was alright but for $10 I expected a fatter burrito. Therefore, I'm not impressed. I won't be going back. :( ",
            "time" : 1473892949
         },
         {
            "aspects" : [
               {
                  "rating" : 2,
                  "type" : "overall"
               }
            ],
            "author_name" : "Paul Pavlinovich",
            "author_url" : "https://www.google.com/maps/contrib/111514735588177976561/reviews",
            "language" : "en",
            "profile_photo_url" : "//lh4.googleusercontent.com/-R5SOboqHmr8/AAAAAAAAAAI/AAAAAAADZf8/AYTvZCrMoyo/s128/photo.jpg",
            "rating" : 4,
            "relative_time_description" : "4 months ago",
            "text" : "Quite nice for an early dose of Tex Mex in the leadup to #lgsummit16. Really enjoyed the burrito. ",
            "time" : 1473622648
         },
         {
            "aspects" : [
               {
                  "rating" : 1,
                  "type" : "overall"
               }
            ],
            "author_name" : "Miranda Claggette",
            "author_url" : "https://www.google.com/maps/contrib/118406199394317231241/reviews",
            "language" : "en",
            "profile_photo_url" : "//lh6.googleusercontent.com/-TU5K4ZlN_gI/AAAAAAAAAAI/AAAAAAAACiA/f6C0XsH_PoI/s128/photo.jpg",
            "rating" : 3,
            "relative_time_description" : "6 months ago",
            "text" : "I got a steak salad...food was bland.\nMy daughter got a steak quesadilla kids meal and it was a very small portion for a 10 yr old. Busy",
            "time" : 1467502900
         }
      ]

export default class LocationDetails extends React.Component {
  // state = {
  //   fontLoaded: false,
  // };

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>ACTIVITY</Text>),
      backgroundColor: '#25272A',
    },
  }

  componentDidMount() {
    console.log('matchdetails', this.props);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <View style={{left: (Dimensions.get('window').width * 0.11), top: (Dimensions.get('window').height * 0.00), bottom: (Dimensions.get('window').height * 0.05)}}>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 15, color: '#404d5b', fontWeight: 'bold'}}>Chipotle</Text>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 11, color: '#404d5b', fontWeight: 'bold'}}>(415) 500-4491</Text>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 11, color: '#404d5b', fontWeight: 'bold'}}>865 Market St C10, San Francisco, CA 94103, USA</Text>
        </View>

        <View style={{top: (Dimensions.get('window').width * 0.03)}}>
          <GalleryOffset
            imagesArray={[
              'https://lh6.googleusercontent.com/-k34IWbsK5m0/UT_jweuXsAI/AAAAAAAAEM0/Qr9f14VZ2z05DWmwrA-umJ4aTBOVYz-8QCJkC/s1600-w400/',
              'https://lh5.googleusercontent.com/-TZ0b4mn-KdU/WAAyvGrlW1I/AAAAAAAAEp8/NRWexdAUWDcIdKsZ8kbEWVmWDB0gyhpZgCLIB/s1600-w400/',
              'https://lh6.googleusercontent.com/-3kCzyds3xeQ/VlrS5b9-5ZI/AAAAAAAAIuI/H3eSzAqDeyYcXrp1iui_9ucG8884kkDAgCJkC/s1600-w400/',
            ]}
            display={'row'}
          />
        </View>

           <View style={{alignItems: 'center', justifyContent: 'center', width: (Dimensions.get('window').width * 0.95), top: (Dimensions.get('window').height * 0.03), paddingVertical: (Dimensions.get('window').height * 0.01), borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, }, left: (Dimensions.get('window').width * 0.022)}}>
          <Text style={{fontWeight: 'bold', opacity: 0.9}}>Opening Hours</Text>
          {
            openinghours.map((l, i) => (
              <Text style={{fontSize: 12}} key={i}>{l}
              </Text>
            ))
          }
          </View>
          {
            testingreviews.map((l, i) => (
          <View key={i} style={{width: (Dimensions.get('window').width * 0.95), top: (Dimensions.get('window').height * 0.03), borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, }, left: (Dimensions.get('window').width * 0.022)}}>
            <AvatarHeader src={'http:' + l.profile_photo_url}
              heading={l.author_name}
              timestamp={l.time}
              circle={true}
              backgroundColor={'#fff'}
              height={(Dimensions.get('window').height * 0.08)}
              gutter={10}
            />
            <RatingBox rating={l.rating} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.044), left: (Dimensions.get('window').width * 0.2)}}/>
            <View style={{paddingHorizontal: 15, paddingBottom: 5}}>
            <Text style={{fontSize: 13}}>{l.text}</Text>
            </View>
          </View>
            ))
          }
          <View style={{top: (Dimensions.get('window').height * 0.060), left: (Dimensions.get('window').width * 0.02)}}>
          <Button
            color={'#fff'}
            backgroundColor={'#26a69a'}
            style={{width: (Dimensions.get('window').width * 0.96)}}
            radius={5}>
            Accept
          </Button>
          <Button
            color={'#fff'}
            backgroundColor={'#25272A'}
            style={{width: (Dimensions.get('window').width * 0.96), bottom: (Dimensions.get('window').height * 0.01)}}
            radius={5}>
            Reject
          </Button>
          </View>
          <View style={{height: (Dimensions.get('window').height * 0.04)}}>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});