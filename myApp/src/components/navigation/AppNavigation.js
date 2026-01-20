
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Homescreen from "../screens/Homescreen"
import Loginscreen from "../screens/Loginscreen"
import Insights from "../screens/Insights"
import Create from "../screens/Create"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Register from "../screens/Register"
import Account from "../screens/Account"
import Category from "../screens/Category"
import Details from "../screens/Details"
import EditProfile from "../screens/EditProfile"
import AccDetails from "../screens/AccDetails"
import ChangePassword from "../screens/ChangePassword"
import DeleteAccount from "../screens/DeleteAccount"
import Security from "../screens/Security"
import Language from "../screens/Language"
import Theme from "../screens/Theme"
import { Home, BarChart2, PlusCircle, User } from "lucide-react-native";
// import Groups from "../screens/Groups"


const Tab=createBottomTabNavigator();

const Stack=createNativeStackNavigator();

function Mytabs(){
    return(
       <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      if (route.name === "Home") {
        return <Home color={color} size={size} />;
      } else if (route.name === "insights") {
        return <BarChart2 color={color} size={size} />;
      } else if (route.name === "Create") {
        return <PlusCircle color={color} size={size} />;
      } else if (route.name === "Account") {
        return <User color={color} size={size} />;
      }
    },
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "gray",
  })}
>
  <Tab.Screen name="Home" component={Homescreen} />
  <Tab.Screen name="insights" component={Insights} />
  <Tab.Screen name="Create" component={Create} />
  <Tab.Screen name="Account" component={Account} />
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
          {/* <Stack.Screen name="Groups" component={Groups}/> */}
         <Stack.Screen name="Category" component={Category} options={{presentation:"modal"}} />
         <Stack.Screen name="Details" component={Details}/>
         <Stack.Screen name="Accountstack" component={Accountstack}/>
         {/* <Stack.Screen name="Create" component={Create}/> */}
       



    </Stack.Navigator>
    );


 
}
     function Accountstack(){
        return(
            <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="AccountMain" component={Account} />
            <Stack.Screen name="AccDetails" component={AccDetails} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Security" component={Security} />
            <Stack.Screen name="Theme" component={Theme} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
 
      {/* Add more later:
          EditProfile
          ChangePassword
          Security
          Theme
          Language
          DeleteAccount
      */}



            </Stack.Navigator>


        );

    }