import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Home = () => {
    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'),
    });

    async function signOut() {
        router.replace('/(auth)/signin/page')
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>MyWorkshop</Text>
                <Pressable style={styles.btnRetorno} onPress={signOut}>
                    <Feather name="arrow-left" size={30} color="white"/>
                </Pressable>
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
        fontSize: 33,
        marginTop: '10%',
        fontFamily: 'FonteRussoOne'
    },
    btnRetorno: {
        marginRight:"80%",
        marginTop: "-9%"
    }
})