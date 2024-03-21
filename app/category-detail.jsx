import { View, Text,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useLocalSearchParams,Link} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../utils/SupabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import CourseInfo from '../components/CourseDetail/CourseInfo';
import { useRouter } from 'expo-router';
import CourseItemList from '../components/CourseDetail/CourseItemList';
export default function CategoryDetails() {
    const router=useRouter()
    const {categoryId}=useLocalSearchParams()
    const [categoryData,setCategoryData]=useState([])
    useEffect(()=>{
        categoryId&&getCategoryDetail()
    },[categoryId])
    const getCategoryDetail=async()=>{
        const {data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('id',categoryId)
        setCategoryData(data[0])
    }
  return (
    <SafeAreaView style={{padding:20,flex:1}}>
      <ScrollView showVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={()=>router.replace('/(tabs)')}>
      <Ionicons name="caret-back-circle-outline" size={44} color={Colors.PRIMARY}/>
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />
      <CourseItemList categoryData={categoryData} setUpdateRecord={()=>getCategoryDetail()}/>
      </ScrollView>

      <Link style={styles.floatingButton} href={{
        pathname:'/add-new-category-item',
        params:{
          categoryId:categoryData.id
        }
      }}>
        <Ionicons name="add-circle-outline" size={48} color={Colors.PRIMARY} />
      </Link>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  floatingButton:{
    position:'absolute',
    bottom:16,
    right:16
  }
})