import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    ImageBackground,
    KeyboardAvoidingView,
  } from 'react-native';

 
  import colors from '../assets/colors/colors';
  import Feather from 'react-native-vector-icons/Feather';
  import Entypo from '@expo/vector-icons/Entypo';
  import activitiesData from '../assets/data/activitiesData';
  import discoverCategoriesData from '../assets/data/discoverCategoriesData';
  import learnMoreData from '../assets/data/learnMoreData';
  import discoverData from '../assets/data/discoverData';
  import {SafeAreaView} from 'react-native-safe-area-context';
  import profile from '../assets/images/person.png';
  import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
  import { LinearGradient } from 'expo-linear-gradient'


  Feather.loadFont();
Entypo.loadFont();

export default function Test({navigation}) {


    const renderDiscoverItem = ({item}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', {
                item: item,
              })
            }>
            <ImageBackground
              source={item.image}
              style={[
                styles.discoverItem,
                {marginLeft: item.id === 'discover-1' ? 20 : 0},
              ]}
              imageStyle={styles.discoverItemImage}>
              <Text style={styles.discoverItemTitle}>{item.title}</Text>
              <View style={styles.discoverItemLocationWrapper}>
                <Entypo name="location-pin" size={18} color={colors.white} />
                <Text style={styles.discoverItemLocationText}>{item.location}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      };
    
      const renderActivityItem = ({item}) => {
        return (
          <View
            style={[
              styles.activityItemWrapper,
              {
                marginLeft: item.id === 'activities-1' ? 20 : 0,
              },
            ]}>
            <Image source={item.image} style={styles.activityItemImage} />
            <Text style={styles.activityItemText}>{item.title}</Text>
          </View>
        );
      };
    
      const renderLearnMoreItem = ({item}) => {
        return (
          <ImageBackground
            source={item.image}
            style={[
              styles.learnMoreItem,
              {
                marginLeft: item.id === 'learnMore-1' ? 20 : 0,
              },
            ]}
            imageStyle={styles.learnMoreItemImage}>
            <Text style={styles.learnMoreItemText}>{item.title}</Text>
          </ImageBackground>
        );
      };
    


    return (
        
        <View style={styles.container}>

            
                {/* <View style={{
               backgroundColor:"#4C5EFB",
               height:"18%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
               


<Feather
              name="menu"
              size={32}
              color={colors.white}
              style={{
            
            
                marginTop:30
            }}
            />
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                  
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:28,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Hi Ibad</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        <Image
                           source={{
                            uri: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
                          }}
                            style={{height:60,width:60,borderRadius:60}}
                        />
                   </View>
               </View>
           </View> */}


         
         



      <ScrollView>
     
      <View style={{
               backgroundColor:"#4CCDFB",
               height:150,
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>



<Feather
              name="menu"
              size={32}
              color={colors.white}
              style={{
            
            
                marginTop:30
            }}
            />
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                  
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:28,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Hi Ibad</Text>
                   </View>
                   <View style={{width:"50%",alignItems:"flex-end"}}>
                        <Image
                           source={{
                            uri: 'https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg',
                          }}
                            style={{height:60,width:60,borderRadius:60}}
                        />
                   </View>
               </View>


               </View>



        <SafeAreaView>
        <View style={{
                   backgroundColor:"#FFF",
                   paddingVertical:8,
                   paddingHorizontal:20,
                   marginHorizontal:20,
                   borderRadius:15,
                   marginTop:10,
                 
               }}>
                   <TextInput
                        placeholder="Search"
                        placeholderTextColor="#b1e5d3"
                        style={{
                            fontWeight:"bold",
                            fontSize:18,
                            width:260
                        }}
                   />
                   {/* <Image
                    // source={require('../images/3.png')}
                    style={{height:20,width:20}}
                   /> */}
               </View>
          
          
          {/* <View style={styles.menuWrapper}>
            <Feather
              name="menu"
              size={32}
              color={colors.black}
              style={styles.menuIcon}
            />
            <Image source={profile} style={styles.profileImage} />
          </View>
          
          */}
        </SafeAreaView>

        {/* Discover */}
        <View style={styles.discoverWrapper}>
          <Text style={styles.discoverTitle}>Discover</Text>
          <View style={styles.discoverCategoriesWrapper}>
            <Text style={[styles.discoverCategoryText, {color: colors.orange}]}>
              All
            </Text>
            <Text style={styles.discoverCategoryText}>Destinations</Text>
            <Text style={styles.discoverCategoryText}>Cities</Text>
            <Text style={styles.discoverCategoryText}>Experiences</Text>
          </View>
          <View style={styles.discoverItemsWrapper}>
            <FlatList
              data={discoverData}
              renderItem={renderDiscoverItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Activities */}
        <View style={styles.activitiesWrapper}>
          <Text style={styles.activitiesTitle}>Category</Text>
          <View style={styles.activitiesItemsWrapper}>
            <FlatList
              data={activitiesData}
              renderItem={renderActivityItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Learn More */}
        <View style={styles.learnMoreWrapper}>
          <Text style={styles.learnMoreTitle}>Near by</Text>
          <View style={styles.learnMoreItemsWrapper}>
            <FlatList
              data={learnMoreData}
              renderItem={renderLearnMoreItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: colors.white,
    },
    menuWrapper: {
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    profileImage: {
      width: 52,
      height: 52,
      borderRadius: 10,
    },
    discoverWrapper: {
      // marginHorizontal: 20,
     marginTop:10
    },
    discoverTitle: {
      marginHorizontal: 20,
      color:'black',
      fontFamily: 'Lato-Bold',
      fontSize: 32,
    },
    discoverCategoriesWrapper: {
      marginHorizontal: 20,
      flexDirection: 'row',
      marginTop: 20,
    },
    discoverCategoryText: {
      marginRight: 30,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.gray,
    },
    discoverItemsWrapper: {
      paddingVertical: 20,
    },
    discoverItem: {
      width: 170,
      height: 250,
      justifyContent: 'flex-end',
      paddingHorizontal: 10,
      paddingVertical: 15,
      marginRight: 20,
    },
    discoverItemImage: {
      borderRadius: 20,
    },
    discoverItemTitle: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.white,
    },
    discoverItemLocationWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    discoverItemLocationText: {
      marginLeft: 5,
      fontFamily: 'Lato-Bold',
      fontSize: 14,
      color: colors.white,
    },
    activitiesWrapper: {
      marginTop: 10,
    },
    activitiesTitle: {
      marginHorizontal: 20,
      fontFamily: 'Lato-Bold',
      fontSize: 24,
      color: colors.black,
    },
    activitiesItemsWrapper: {
      paddingVertical: 20,
    },
    activityItemWrapper: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 20,
    },
    activityItemImage: {
      width: 36,
    },
    activityItemText: {
      marginTop: 5,
      fontFamily: 'Lato-Bold',
      fontSize: 14,
      color: colors.gray,
    },
    learnMoreWrapper: {
      marginTop: 10,
    },
    learnMoreTitle: {
      marginHorizontal: 20,
      fontFamily: 'Lato-Bold',
      fontSize: 24,
      color: colors.black,
    },
    learnMoreItemsWrapper: {
      paddingVertical: 20,
    },
    learnMoreItem: {
      width: 170,
      height: 180,
      justifyContent: 'flex-end',
      marginRight: 20,
    },
    learnMoreItemImage: {
      borderRadius: 20,
    },
    learnMoreItemText: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color: colors.white,
      marginHorizontal: 10,
      marginVertical: 20,
    },
  });