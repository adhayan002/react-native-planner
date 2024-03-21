import { View, Text, TextInput,StyleSheet, TouchableOpacity, ToastAndroid,ActivityIndicator} from 'react-native'
import { useState } from 'react'
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { supabase } from '../utils/SupabaseConfig';
import { client } from '../utils/KindeConfig';
import {useRouter} from 'expo-router'
export default function AddNewCategory() {
    const [selectedIcon,setSelectedIcon]=useState('')
    const [selectedColor,setSelectedColor]=useState(Colors.PURPLE)
    const [categoryName,setCategoryName]=useState()
    const [totalBudget,setTotalBudge]=useState()

    const [loading,setLoading]=useState(false)


    const router=useRouter()
    const onCreateCategory=async ()=>{
        setLoading(true)
        const user=await client.getUserDetails()
        const {data,error}=await supabase.from('Category').insert([
            {
                name:categoryName,
                assigned_budget:totalBudget,
                icon:selectedIcon,
                color:selectedColor,
                created_by:user.email
            }
        ]).select();
        console.log('Data:',data)
        if(data){
            router.replace({
              pathname:'/category-detail',
              params:{
                categoryId:data[0].id
              }

            })
            setLoading(false)
            ToastAndroid.show('Category Added Successfully',ToastAndroid.SHORT)
            
            setSelectedIcon('')
            setCategoryName('')
            setTotalBudge('')
            if(error){
              setLoading(false)
            }
        }

    }
  return (
    <View style={{marginTop:20,padding:20,flex:1,}}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TextInput style={[styles.textinput,{backgroundColor:selectedColor}]} maxLength={2}
        onChangeText={(value)=>setSelectedIcon(value)}>
        {selectedIcon}
        </TextInput>
        <ColorPicker selectedColor={selectedColor}
        setSelectedColor={(color)=>{setSelectedColor(color)}}/>
      </View>
      {/* ADD CATEGORY NAME AND BUDGET */}
      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.BLACK} />
        <TextInput placeholder='Enter Category Name' style={{width:'100%',fontSize:16,fontFamily:'inter'}}
        onChangeText={(value)=>setCategoryName(value)}/>
      </View>

      <View style={styles.inputView}>
        <FontAwesome6 name="hand-holding-dollar" size={24} color={Colors.BLACK} />
        <TextInput placeholder='Enter Budget Amount' keyboardType='numeric' style={{width:'100%',fontSize:16,fontFamily:'inter'}}
        onChangeText={(value)=>setTotalBudge(value)}/>
      </View>
      <TouchableOpacity style={styles.button}
      disabled={!categoryName||!totalBudget||loading} onPress={()=>onCreateCategory()}>
        {loading?<ActivityIndicator color={Colors.WHITE}/>
        :<Text style={{textAlign:'center',color:Colors.WHITE,fontFamily:'inter-b',fontSize:20}}>CREATE</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    textinput:{
        textAlign:'center',
        fontSize:30,
        fontFamily:'inter',
        padding:20,
        borderRadius:99,
        paddingHorizontal:28,
        color:Colors.WHITE
    },
    inputView:{
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        gap:5,
        padding:14,
        borderRadius:10,
        borderColor:Colors.GRAY,
        marginTop:20,
        backgroundColor:Colors.WHITE,
        alignItems:'center'
    },
    button:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:99,
        fontFamily:'inter-sb',
        marginTop:20
    }
})