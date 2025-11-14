import { default as colors, default as Colors } from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
    const [services, setServices] = useState<{ 
        id_service: string; 
        car_name: string, 
        car_plate: string, 
        service_status: BigInt 
    }[]>([]);

    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'),
    });

    const [refreshing, setRefreshing] = useState(false);

    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
            console.error("Erro ao desconectar:", error);
            Alert.alert("Erro", "Não foi possível desconectar. Tente novamente.");
            return;
            }

            // Sucesso
            Alert.alert("Sucesso", "Você foi desconectado!");
            router.replace("/(auth)/signin/page");

        } catch (err) {
            console.error("Erro inesperado no signOut:", err);
            Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
        }
    }
    
    async function readAllServices() {

        setRefreshing(true);
        const { data, error } = await supabase.from('service').select("id_service, car_name, car_plate, service_status");

        if (error) {
            Alert.alert("Falha", "Dados nao encontrados")
            return;
        }

        if (!data || data.length === 0) {
            Alert.alert("Atenção", "Nenhum serviço encontrado");
            return;
        }

        setServices(data);
        setRefreshing(false);

        //console.log("Dados Retornado: " + JSON.stringify(data, null, 2))
    }

    useEffect(() => {
        readAllServices();
    }, []);

    return (
        
        <View style={{flex:1, backgroundColor: colors.white}}>
            <View style={styles.header}>
                <Text style={styles.title}>MyWorkshop</Text>
                <Pressable style={styles.btnRetorno} onPress={signOut}>
                    <Feather name="arrow-left" size={30} color="white"/>
                </Pressable>
            </View>

            <View style={styles.container}>
                    <FlatList
                        refreshing={refreshing}
                        onRefresh={readAllServices}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={<View style={{ height: 300 }} />}
                        data={services}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.card}
                                onPress={() =>
                                        router.push({
                                            pathname: "/details/[id]",
                                            params: { id: item.id_service, name: item.car_name },
                                        })
                                    }
                                >
                                <Text style={styles.textTitleCard}>{item.car_name}</Text>
                                <Text style={styles.textPlateCard}>Plate: {item.car_plate}</Text>
                            </TouchableOpacity>
                        )}
                    />
            </View>
        </View>

    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        marginTop: '5%',
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
    },
    
    card: { 
        width:360,
        height: 95,
        backgroundColor: colors.skyblue,
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },

    textTitleCard: {
        marginTop: 10,
        color: Colors.white,
        fontFamily: 'FonteRussoOne',
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: "5%"
    },

    textPlateCard: {
        color: Colors.white,
        fontFamily: 'FonteRussoOne',
        fontSize: 15,
        marginLeft: "5%",
        fontWeight: "bold",
    }

})