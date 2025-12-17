import React from "react";
import { View, Text ,Button,Pressable,StyleSheet} from "react-native";
import { FlatList } from "react-native";
import tailwind from "twrnc";
import Emptylist from "../Emptylist";


const Homescreen=({navigation})=> {
  return (
    <View>
      <View style={tailwind`p-4 bg-blue-500`}>
        <Text style={tailwind`text-white text-lg font-bold`}>Home Screen</Text>
      </View>
      <Text>Welcome to Home</Text>
      <Button onPress={()=>navigation.navigate("Profile")} title="profile"/>

        <FlatList 
        //data={[1,2,3]}
        data={[]} // sample data array real data come from expenses table
          //keyExtractor={(item)=>item.toString()} // unique key for each item
          renderItem={({item})=><Expenseitemcard item={item}/>}
          ListEmptyComponent={<Emptylist/>}

        
        
        
        />
          




        
      
    </View>
  );
}

export default Homescreen;

const styles=StyleSheet.create({})
