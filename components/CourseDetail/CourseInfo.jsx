import { View, Text,StyleSheet,TouchableOpacity,Alert,ToastAndroid} from 'react-native'
import React, { useEffect,useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import {supabase} from '../../utils/SupabaseConfig'
import {useRouter} from 'expo-router'

export default function CourseInfo({categoryData}) {
    const [totalCost,setTotalCost]=useState()
    const router=useRouter()
    useEffect(()=>{
        categoryData&&calculateTotalPerc()
    },[categoryData])
    const calculateTotalPerc=()=>{
        let total=0
        categoryData?.CategoryItems?.forEach(item=>{
            total=total+item.cost
        })
        setTotalCost(total)
    }

    const onDeleteCategory=()=>{
        Alert.alert('Are you sure?','Do you want to delete this category?',[
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text:'Yes',
                style:'destructive',
                onPress:async()=>{
                    const { error } = await supabase
                    .from('CategoryItems')
                    .delete()
                    .eq('category_id', categoryData.id)
                    await supabase.from('Category').delete().eq('id',categoryData.id)

                    ToastAndroid.show('Category Deleted Successfully',ToastAndroid.SHORT)
                    router.replace('/(tabs)')
                    
                }
            }
        ])
    }
  return (
   <View>
     <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Text style={[styles.textIcon,{backgroundColor:categoryData.color}]}>{categoryData.icon}</Text>
        </View>
        <View style={{flex:1,marginLeft:20}}>
            <Text style={styles.categoryName}>{categoryData?.name}</Text>
            <Text style={styles.categoryItemText}>{categoryData?.CategoryItems?.length} Items</Text>
        </View>
        <TouchableOpacity onPress={()=>onDeleteCategory()}>
            <Ionicons name="trash-bin-outline" size={28} color={Colors.DELETE}/>
        </TouchableOpacity>
    </View>
    {/* Progress Bar */}
    <View style={styles.amountContainer}>
        <Text style={{fontFamily:'inter'}}>${totalCost}</Text>
        <Text style={{fontFamily:'inter'}}>Total Budget:${categoryData.assigned_budget}</Text>
    </View>
    <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer, { width: `${Math.min((totalCost / categoryData.assigned_budget) * 100, 100)}%` }]}></View>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textIcon:{
        fontSize:35,
        padding:20,
        borderRadius:15
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'baseline',
    },
    categoryName:{
        fontFamily:'inter-b',
        fontSize:24
    },
    categoryItemText:{
        fontFamily:'inter-sb',
        fontSize:16
    },
    amountContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:15
    },
    progressBarMainContainer:{
        width:'100%',
        height:12,
        backgroundColor:Colors.GRAY,
        borderRadius:99,
        marginTop:7
    },
    progressBarSubContainer:{
        borderRadius:99,
        backgroundColor:Colors.PRIMARY,
        height:12,
    }

})