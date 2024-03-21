import { View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../utils/Colors';
import {useRouter} from 'expo-router'

export default function CategoryList({ categoryList }) {
    const router=useRouter()
    const onCategoryClick=(category)=>{
        router.push({
            pathname: '/category-detail',
            params: { 
                categoryId:category.id
            },
        })
    }

    const calculateTotalCost=(categoryItems)=>{
      let totalCost=0
      categoryItems.forEach(item=>{
        totalCost=totalCost+item.cost
      })
      return totalCost
    }
    if (!categoryList) {
      return null; // or return a placeholder, loading indicator, or message
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.headingStyle}>Latest Budget</Text>
        <View>
          {categoryList.map((category, index) => {
            return (
              <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => onCategoryClick(category)}>
                <View style={styles.iconContainer}>
                  <Text style={[styles.iconText, { backgroundColor: category.color }]}>
                    {category.icon}
                  </Text>
                </View>
                <View style={styles.iconSubContainer}>
                    <View>
                        <Text style={styles.categoryText}>{category.name}</Text>
                        <Text style={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
                    </View>
                   <Text style={styles.totalAmountText}>${calculateTotalCost(category?.CategoryItems)}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginTop:20
    },
    headingStyle:{
        fontFamily:'inter-b',
        fontSize:25,
        marginBottom:10,
    },
    itemContainer:{
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:10,
        borderRadius:15
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'baseline'
    },
    iconText:{
        fontSize:35,
        padding:16,
        borderRadius:15
    },
    categoryText:{
        fontFamily:'inter-b',
        fontSize:20
    },
    itemCount:{
        fontFamily:'inter'
    },
    iconSubContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'70%'
    },
    totalAmountText:{
        fontFamily:'inter-sb',
        fontSize:15,
    }
})