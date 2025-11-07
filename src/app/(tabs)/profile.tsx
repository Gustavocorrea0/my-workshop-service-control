import Colors from "@/constants/colors";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const Profile = () => {
    return (

        <View style={{flex:1}}>

            <View style={styles.header}>
                <Text style={styles.title}>Usuário</Text>
            </View>

            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>

                    <View style={styles.form}>

                        <View>
                            <Text style={styles.labelTitle}>Nome</Text>
                            <TextInput
                                placeholder=""
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Email</Text>
                            <TextInput
                                placeholder=""
                                style={styles.input}
                                inputMode='email'
                            />
                        </View>

                        <View style={{ height: 1.5, width: '100%', backgroundColor: '#000', marginTop:20}}></View>
                        
                        <View style={{ marginTop:20 }}>
                            <Text style={styles.labelTitle}>Senha Atual</Text>
                            <TextInput
                                placeholder=""
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Nova Senha</Text>
                            <TextInput
                                placeholder=""
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>

                        <Pressable style={styles.btnSave}>
                            <Text style={styles.buttonText}>Alterar Dados</Text>
                        </Pressable>

                    </View>

                </View>

            </ScrollView>
        </View>       
    );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
    },

    form: {
        flex: 2,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: '5%',
        paddingLeft: '3%',
        paddingRight: 14
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 8,
        marginBottom: 16,
        padding: 1,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14
    },
    
    inputDescription: { 
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        textAlignVertical: 'top', // garante que o texto comece no topo
        minHeight: 150, // altura mínima maior que a de um input comum
        fontSize: 16,
        backgroundColor: '#fff'
    },
    
    labelTitle: {
        fontSize: 17,
        marginBottom: 5,
        marginLeft: 10
    },

    buttonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },

    btnSave: {
        width: '100%',
        height: '10%',
        marginTop: '5%',
        backgroundColor: Colors.skyblue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

})