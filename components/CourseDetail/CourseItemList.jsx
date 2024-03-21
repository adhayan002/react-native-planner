import { View, Text,StyleSheet,Image,TouchableOpacity,ToastAndroid,ScrollView,Linking} from 'react-native'
import {useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import {supabase} from '../../utils/SupabaseConfig'

export default function CourseItemList({categoryData,setUpdateRecord}) {
  const [expandItem,setExpand]=useState()
  
  const onDeleteItem=async(id)=>{
    const {error}=await supabase.from('CategoryItems').delete().eq('id',id)
    ToastAndroid.show('Item Deleted Successfully',ToastAndroid.SHORT)
    setUpdateRecord(true)
  }

  const openUrl=(url)=>{
    if(url){
      Linking.openURL(url)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Item List</Text>

      <View>
        {categoryData?.CategoryItems?.map((item,index)=>{
            return(
              <>
                 <TouchableOpacity key={index} style={styles.itemContainer} onPress={()=>setExpand(index)}>
                    <Image source={{uri:item.image}} style={styles.image}/>
                    <View style={{flex:1,marginLeft:10}}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.url} numberOfLines={2}>{item.url}</Text>
                    </View>
                    <Text style={styles.cost}>${item.cost}</Text>
               </TouchableOpacity>
               {expandItem==index&&
                  <View style={styles.actionItemContainer}>
                    <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                      <Ionicons name="trash-bin-outline" size={30} color={Colors.DELETE}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>openUrl(item.url)}>
                      <AntDesign name="link" size={30} color={Colors.LINK} />
                    </TouchableOpacity>
                    
                  </View>
               }
               {categoryData?.CategoryItems.length-1!==index&&<View style={{borderWidth:0.5,borderBottomColor:'#5D737E',marginTop:10}}/>}
              </>
            )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20
    },
    heading:{
        fontFamily:'inter-b',
        fontSize:20
    },
    image:{
        width:80,
        height:80,
        borderRadius:15
    },
    itemContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
         alignItems:'center',
         marginTop:20
    },
    name:{
        fontSize:20,
        fontFamily:'inter-b'
    },
    url:{
        fontFamily:'inter',
        color:'#5D737E',
        fontSize:12,
        marginRight:5
    },
    cost:{
        fontFamily:'inter-sb',
        fontSize:15,
        marginTop:-45,
        marginLeft:5
    },
    actionItemContainer:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        justifyContent:'flex-end',
    }
})