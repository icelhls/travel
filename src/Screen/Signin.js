import React from 'react';
import { View, Text, ScrollView, StyleSheet,Image,StatusBar } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
//  import * as Animatable from 'react-native-animatable';



export default function Signin({navigation}) {
  return (
    < ScrollView style={ styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />

<Image
          style={{ width:"100%", height: 200 }}
          source={require('../assets/images/logo.png')}
          resizeMode="contain"
        />

                <Text style={{ fontSize: 25,color: 'black', marginTop: 10 }}>Welcome Back! </Text>
                <Text style={{ fontSize: 16, color: 'gray', marginTop: 20 }}>Sign in to continue</Text>

              
                <TextInput
                    style={{ marginTop: 40, borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 20 }}
                    placeholder="Username"
                 
                />

                <TextInput
                    style={{ marginTop: 40, borderBottomColor: '#ddd', borderBottomWidth: 1, paddingBottom: 20 }}
                    placeholder="Password"
                    secureTextEntry={true}
                 

                />
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}></Text>
                
            
                

                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Home')
                        }
                        style={{ width: 200, backgroundColor: '#0d47a1', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, marginTop: 30 }}
                    >
                        <Text style={{ textAlign: 'center', color: '#FFF', fontSize: 16 }}>Login Now</Text>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 20 }}>Forgot Password ?</Text>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ height: 40, width: 40, borderRadius: 40/2, backgroundColor: '#3f51b5', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>f</Text>
                        </View>
                        <View style={{ height: 40, width: 40, borderRadius: 40/2, backgroundColor: '#f44336', marginHorizontal: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>G</Text>
                        </View>
                        <View style={{ height: 40, width: 40, borderRadius: 40/2, backgroundColor: '#1565c0', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>in</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row',marginTop: 10 }}>
                    <Text style={{ color: 'black' }}>Don't have an account?</Text>
                    <Text style={{ fontWeight: 'bold' }}> Sign Up</Text>
                    </View>
                </View>
            
            </ ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
      padding: 20
  }
})