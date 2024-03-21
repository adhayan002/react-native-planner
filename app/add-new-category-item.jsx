import { View, Text,StyleSheet,Image,TextInput, ScrollView, KeyboardAvoidingView,ToastAndroid,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../utils/Colors';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer'
import {supabase} from '../utils/SupabaseConfig'
import {useLocalSearchParams} from 'expo-router'
import { useRouter } from 'expo-router';
const placeholder='https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=740&t=st=1710867896~exp=1710868496~hmac=8132ed3f72d4361b8aa90bb5035de59008929a71d7ec50435825d94930b72908'
export default function AddNewCategoryItem() {

    const {categoryId}=useLocalSearchParams()
    const [image,setImage]=useState(placeholder)
    const [previewImage,setPreviewImage]=useState(placeholder)

    const [name,setName]=useState()
    const [url,setUrl]=useState()
    const [cost,setCost]=useState()
    const [note,setNote]=useState()
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const onImagePick=async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.7,
        base64:true
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setPreviewImage(result.assets[0].uri);
        setImage(result.assets[0].base64)
      }
    }

    const onClickAdd=async()=>{
      setLoading(true)
      const fileName=Date.now()
      const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName+'.png', decode(image), {
          contentType: 'image/png'
        })
        if(data){
          const fileUrl='https://tzzmxbcrsiaqujlaxmdm.supabase.co/storage/v1/object/public/images/'+fileName+'.png'
          console.log(fileUrl)
          const {data,error}=await supabase.from('CategoryItems')
          .insert([{
            name:name,
            url:url,
            cost:cost,
            note:note,
            category_id:categoryId,
            image:fileUrl
          }]).select()
          ToastAndroid.show('Item Added Successfully',ToastAndroid.SHORT)
          console.log(data)
          setLoading(false)
          router.replace({
            pathname: '/category-detail',
            params: { 
                categoryId:categoryId
            },
        })
        }
        
    }


  return (
    <KeyboardAvoidingView>
      <ScrollView style={{padding:20}}>
      <TouchableOpacity onPress={()=>onImagePick()}>
        <Image source={{uri:previewImage}} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textInputContainer}>
        <Ionicons name="pencil-outline" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Item Name' style={styles.input} onChangeText={(value)=>setName(value)}/>
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons name="cash-outline" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Item Cost' style={styles.input} keyboardType='number-pad' onChangeText={(value)=>setCost(value)}/>
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons name="link" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Enter A Url' style={styles.input} onChangeText={(value)=>setUrl(value)}/>
      </View>
      <View style={styles.textInputContainer}>
        <Ionicons name="book-outline" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Note' style={styles.input} numberOfLines={3} onChangeText={(value)=>setNote(value)}/>
      </View>
      <TouchableOpacity style={styles.button} disabled={!name||!cost||loading} onPress={()=>onClickAdd()}>
            {loading?<ActivityIndicator color={Colors.WHITE}/>:
            <Text style={{textAlign:'center',color:Colors.WHITE,fontFamily:'inter-b'}}>ADD</Text>}  
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    image:{
        width:150,
        height:150,
        borderRadius:15
    },
    textInputContainer:{
        marginTop:20,
        padding:10,
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        borderRadius:10,
        borderColor:Colors.GRAY
    },
    input:{
        fontSize:17,
        width:'100%'
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:20
    }
})