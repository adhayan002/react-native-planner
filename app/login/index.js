import { View, Text,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import loginBg from './../../assets/images/loginbg.png';
import Colors from '../../utils/Colors';
import { client } from './../../utils/KindeConfig';
import services from '../../utils/services'
import {useRouter} from 'expo-router'

export default function LoginScreen() {
  const router=useRouter()
  const handleSignIn = async () => {
    const token = await client.login();
    if (token) {
      // User was authenticated
      await services.storeData('login','true')
      router.replace('/')
    }
  };
  return (
    <View style={{display:'flex',alignItems:'center'}}>
      <Image source={loginBg} style={styles.bgImage} />
      <View style={styles.card}>
        <Text style={styles.textheading}>Personal Budget Planner</Text>
        <Text style={styles.textSubHeading}>Stay on Track,Event by Event: Your Personal Budget App!</Text>
        <TouchableOpacity style={styles.btn} onPress={handleSignIn} >
          <Text style={styles.btnText}>Login/SignUp</Text>
        </TouchableOpacity>
        <Text style={styles.texttnc}>* By Login/SignUp you agree to our Terms and Conditions</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:Colors.PRIMARY,
      width:'100%',
      height:'100%',
      padding:20,
      marginTop:-30,
      borderTopLeftRadius:30,
      borderTopRightRadius:30
    },
    bgImage:{
        width:200,
        height:400,
        marginTop:70,
        borderWidth:3,
        borderRadius:20,
        borderColor:Colors.BLACK
    },
    card:{
      backgroundColor:Colors.PRIMARY,
      width:'100%',
      height:'100%',
      padding:20,
      marginTop:-30,
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
    },
    textheading:{
      fontSize:35,
      textAlign:'center',
      color:Colors.WHITE,
      fontFamily:'inter-sb'
    },
    textSubHeading:{
      fontSize:18,
      textAlign:'center',
      color:Colors.WHITE,
      marginTop:20,
      fontFamily:'inter-sb'
    },
    btn:{
      backgroundColor:Colors.WHITE,
      padding:15,
      paddingHorizontal:5,
      borderRadius:99,
      marginTop:30
    },
    btnText:{
      textAlign:'center',
      color:Colors.PRIMARY,
      fontSize:13,
      fontFamily:'inter'
    },
    texttnc:{
      fontFamily:'inter',
      fontSize:10,
      color:Colors.GRAY,
      textAlign:'center',
      marginTop:10
    }
})