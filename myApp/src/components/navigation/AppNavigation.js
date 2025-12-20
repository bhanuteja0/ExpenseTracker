
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Homescreen from "../screens/Homescreen"
import Loginscreen from "../screens/Loginscreen"
import Insights from "../screens/Insights"
import Create from "../screens/Create"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Register from "../screens/Register"
import Account from "../screens/Account"
import Category from "../screens/Category"
const Tab=createBottomTabNavigator();

const Stack=createNativeStackNavigator();

function Mytabs(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="Home" component={Homescreen}/>
            <Tab.Screen name="insights" component={Insights}/>
            <Tab.Screen name="Create" component={Create}/>
            <Tab.Screen name="Account" component={Account}/>



        </Tab.Navigator>



    );


}

export default function AppNavigation(){
    return(

    <Stack.Navigator screenOptions={{headerShown:false}}>

{/*         
        <Stack.Screen name="Loginscreen" component={Loginscreen}/>
         <Stack.Screen name="Register" component={Register}/> */}
          <Stack.Screen name="bottomtabs" component={Mytabs}/>
         <Stack.Screen name="Category" component={Category} options={{presentation:"modal"}} />
         {/* <Stack.Screen name="Create" component={Create}/> */}
       



    </Stack.Navigator>
    );
}