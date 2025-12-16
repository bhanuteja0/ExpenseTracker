
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Homescreen from "../screens/Homescreen"
import Loginscreen from "../screens/Loginscreen"
import Insights from "../screens/Insights"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

const Tab=createBottomTabNavigator();

const Stack=createNativeStackNavigator();

function Mytabs(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name="Home" component={Homescreen}/>
            <Tab.Screen name="login" component={Loginscreen}/>
            <Tab.Screen name="insights" component={Insights}/>



        </Tab.Navigator>



    );


}

export default function AppNavigation(){
    return(

    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="bottomtabs" component={Mytabs}/>



    </Stack.Navigator>
    );
}