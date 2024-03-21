import { View, Text, Button,StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Link,useRouter} from 'expo-router'
import services from '../../utils/services'
import { client } from '../../utils/KindeConfig';
import { supabase } from '../../utils/SupabaseConfig';
import Header from '../../components/Header';
import Colors from "../../utils/Colors"
import CircularChart from '../../components/CircularChart';
import { Ionicons } from '@expo/vector-icons';
import CategoryList from '../../components/CategoryList';

const Home = () => {

  const router=useRouter()
  const [categoryList,setCategoryList]=useState()
  const [loading,setLoading]=useState(false)
 
  useEffect(()=>{
    checkUserAuth()
    getCategoryList()
  },[])

  /*Used to check User Auth i.e if user is alreadyt logged in*/
  const checkUserAuth=async()=>{
    const result=await services.getData('login')
    if(result!=='true'){
      router.replace('/login')
    }
  }

  const getCategoryList=async()=>{
    setLoading(true)
    const user=await client.getUserDetails()
    const{data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('created_by',user.email)
    console.log('Data:',data)
    setCategoryList(data)
    data&&setLoading(false)
  }
  return (
    <View style={{marginTop:20,flex:1,}}>
      <ScrollView refreshControl={<RefreshControl onRefresh={()=>getCategoryList()} refreshing={loading}/>}>
      <View style={{padding:20,backgroundColor:Colors.BLACK,height:150}}>
        <Header/>
      </View>
      <View style={{padding:20,marginTop:-95}}>
          <CircularChart categoryList={categoryList}/>
          <CategoryList categoryList={categoryList}/>
      </View>
      </ScrollView>
      <Link href="/add-new-category" style={styles.adbtnContainer}>
      <Ionicons name="add-circle" size={54} color={Colors.PRIMARY} />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize:20
  },
  adbtnContainer:{
    position:'absolute',
    bottom:16,
    right:16
  }

})

export default Home