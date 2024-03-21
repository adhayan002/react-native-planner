import { View, Text,Image,StyleSheet,TouchableOpacity} from 'react-native'
import services from '../../utils/services'
import { client } from '../../utils/KindeConfig';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserAvatar from 'react-native-user-avatar';
import { useWindowDimensions } from 'react-native';
import Colors from '../../utils/Colors'
import { supabase } from '../../utils/SupabaseConfig';
import {useRouter} from 'expo-router'
export default function Profile() {
  const [user,setUser]=useState()
  const [total,settotal]=useState()
  const backgroundURL='https://tzzmxbcrsiaqujlaxmdm.supabase.co/storage/v1/object/public/images/colorkit.png'
  const router=useRouter()
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
        //DELETE THE DATA FROM ASYNC STORAGE
        await services.storeData('login','false')
        router.replace('/login');
        // User was logged out
    }
  };
  
  
  const { width } = useWindowDimensions();
  const checkUserAuth=async()=>{
    const user=await client.getUserDetails()
    const{data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('created_by',user.email)
   console.log(data.length)
   settotal(data.length)
    setUser(user)
  }

  useEffect(()=>{
    checkUserAuth()
  },[])
  
  return (
    <SafeAreaView style={{flex:1}}>
      <Image source={{uri:backgroundURL}} style={styles.image}/>
      <UserAvatar size={80} name={user?.given_name} style={styles.avatar} bgColor={Colors.PRIMARY} />
      <View style={{padding:20,marginTop:40,}}>
        <Text style={{color:Colors.PRIMARY,fontFamily:'inter-b',fontSize:20}}>WELCOME,</Text>
        <Text style={{color:Colors.PRIMARY,fontFamily:'inter-sb',fontSize:16}}>{user?.given_name}</Text>
        <Text style={{color:Colors.PRIMARY,fontFamily:'inter',fontSize:10}}>{user?.email}</Text>
      </View>
      <Text style={{color:Colors.PRIMARY,fontFamily:'inter-b',fontSize:20,paddingLeft:20}}>Categories Created: <Text style={{color:Colors.PRIMARY,fontFamily:'inter',fontSize:20}}>{total}</Text> </Text>
      <TouchableOpacity style={[styles.btn,{left:width/8-10}]} onPress={()=>handleLogout()} >
          <Text style={styles.btnText}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image:{
    width:'100%',
    height:150
  },
  avatar:{
    width:100,
    height:100,
    borderRadius:99,
    position:'absolute',
    top:125,
    left:30,
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    padding:15,
    paddingHorizontal:5,
    borderRadius:99,
    position:'absolute',
    bottom:10,
    width:'80%'
  },
  btnText:{
    textAlign:'center',
    color:Colors.WHITE,
    fontSize:13,
    fontFamily:'inter'
  },
})