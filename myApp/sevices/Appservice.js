
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Appservice={getData:async()=>{
    
        await axios.get("https://jsonplaceholder.typicode.com/posts")}.data

export  {Appservice}
