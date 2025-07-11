import {Tabs} from "expo-router";
import Octicons from "@expo/vector-icons/Octicons"

export default function CharacterLayout() {
    return (
        <Tabs initialRouteName={'index'}>
            <Tabs.Screen name="index" options={{
                title: "Character",
                tabBarIcon: (props) => <Octicons name={"person"} {...props} />
            }} />
            <Tabs.Screen name="create" options={{
                title: "Create character" ,
                tabBarIcon: (props) =>  <Octicons name={"plus"} {...props} />
            }} />
        </Tabs>
    );
}