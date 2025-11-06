import Colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>MyWorkshop</Text>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    header: {
        height: "15%",
        width: "100%",
        backgroundColor: Colors.skyblue,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
    },
    title: {
        color: Colors.white,
        fontSize: 35,
        marginTop: '10%'
    }
})