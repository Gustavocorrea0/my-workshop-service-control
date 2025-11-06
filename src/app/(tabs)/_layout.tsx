import { TabBar } from "@/components/TabBar";
import { Tabs } from "expo-router";
import React from "react";


const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // remove o texto superior
            }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{title: "Home"}}/>
            <Tabs.Screen name="explore" options={{title: "Add"}}/>
            <Tabs.Screen name="profile" options={{title: "Profile"}}/>
        </Tabs>
    );
}

export default TabLayout;