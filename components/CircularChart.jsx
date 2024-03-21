import { View, Text,StyleSheet } from 'react-native'
import {useEffect, useState} from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CircularChart({categoryList}) {
    const widthAndHeight=150
    const [values,setValue]=useState([1])
    const [sliceColor,setSliceColor]=useState([Colors.GRAY])
    const [totalSpend,setTotalSpend]=useState(0)

    useEffect(()=>{
      updateCirculatChart()
    },[categoryList])
    
    const updateCirculatChart=()=>{
      if(categoryList){
        let totalEstimates=0
      setSliceColor([])
      setValue([])
      let otherCost=0

     
      categoryList.forEach((item,index)=>{
        if(index<4){
          let itemTotalCost=0
          item.CategoryItems?.forEach((item_)=>{
            itemTotalCost=itemTotalCost+item_.cost
            totalEstimates=totalEstimates+item_.cost
          })
          setSliceColor(sliceColor=>[...sliceColor,Colors.COLOR_LIST[index]])
          setValue(values=>[...values,itemTotalCost])
        }
        else{
          item.CategoryItems?.forEach((item_)=>{
            otherCost=otherCost+item_.cost
            totalEstimates=totalEstimates+item_.cost
          })
        }
      })
      setTotalSpend(totalEstimates)
      setSliceColor(sliceColor=>[...sliceColor,Colors.COLOR_LIST[4]])
      setValue(values=>[...values,otherCost])
      }
    }
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20,fontFamily:'inter-sb',}}>Total Estimate:<Text style={{fontFamily:'inter-b'}}>${totalSpend}</Text></Text>
      <View  style={styles.subContainer}>
      <PieChart
            widthAndHeight={widthAndHeight}
            series={values}
            sliceColor={sliceColor}
            coverRadius={0.60}
            coverFill={'#FFF'}
          />
        {categoryList?.length===0?
        <View style={styles.chartNameContainer}>
          <MaterialCommunityIcons 
          name="checkbox-blank-circle" 
          size={24} color={Colors.GRAY} />
          <Text style={{fontFamily:'inter'}}>NA</Text>
        </View>:
       <View>
       {categoryList?.map((category, index) => index<=4 &&(
         <View key={index} style={styles.chartNameContainer}>
           <MaterialCommunityIcons 
             name="checkbox-blank-circle" 
             size={24} 
             color={Colors.COLOR_LIST[index]} 
           />
           <Text style={{ fontFamily: 'inter' }}>{index<4?category.name:'Other'}</Text>
         </View>
       ))}
      </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
       marginTop:20,
       backgroundColor:'#fff',
       padding:20,borderRadius:20,
       elevation:1,
    },
    subContainer:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        gap:40
    },
    chartNameContainer:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      gap:5
    }
})