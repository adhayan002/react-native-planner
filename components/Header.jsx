import { View, Text, Image,StyleSheet } from 'react-native'
import {useEffect, useState} from 'react'
import { client } from '../utils/KindeConfig'
import Colors from '../utils/Colors';
import { Shadow } from 'react-native-shadow-2';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from 'react-native-user-avatar';

export default function Header() {
    const [user, setUser] = useState();
    useEffect(()=>{
        getUserData()
    },[])
    const getUserData=async()=>{
        const user=await client.getUserDetails()
        setUser(user)
    }

  return (
    
    <View style={styles.container}>
      <Shadow startColor={Colors.SECONDARY}>
      <View style={styles.imageContainer}>
      <UserAvatar size={50} name={user?.given_name} style={styles.avatar} bgColor="#FF2C55" />
      </View>
      </Shadow>
      <View style={styles.notifcontainer}>
        <View>
            <Text style={{color:Colors.WHITE,fontFamily:'inter-b',fontSize:16}}>WELCOME</Text>
            <Text style={{color:Colors.WHITE,fontFamily:'inter-sb',fontSize:20}}>{user?.given_name}</Text>
        </View>
        <Ionicons name="notifications" size={24} color={Colors.WHITE} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        gap:14,
        alignItems:'center',
    },
    notifcontainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'83%'
    },

    imageContainer:{
        width:50,
        height:50,
        borderRadius:99,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:99,
        
    }
})