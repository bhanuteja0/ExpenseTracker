import { View ,Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Loginscreen from "./src/components/screens/Loginscreen";
import Homescreen from "./src/components/screens/Homescreen";
import AppNavigation from "./src/components/navigation/AppNavigation";


export default function App() {
  return (
    
    <NavigationContainer>
    <AppNavigation/>
    </NavigationContainer>
    
  
  );
}