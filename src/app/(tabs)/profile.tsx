import Colors from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { useFonts } from 'expo-font';
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Profile = () => {

    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'),
    });
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [idUser, setIdUser] = useState('')
    const [loading, setLoading] = useState(false)

    async function fetchDataCurrentUser() {
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError || !authData.user) {
            Alert.alert("Falha", "Usuário não encontrado");
            return;
        }

        const userId = authData.user.id;
        const { data, error } = await supabase.from('users').select("name, email").eq('id', userId).single();

        if (error) {
            Alert.alert("Falha", "Informações do usuário não encontradas");
            return;
        }

        setEmail(data.email);
        setName(data.name);
        setIdUser(userId)
    }

    async function updatePasswordUser() {

        if (oldPassword == "" || newPassword == "") {
            Alert.alert("Falha", "Preencha todos os campos.");
            return 
        }
        
        setLoading(true)
        const { data: authData, error: authError } = await supabase.auth.getUser();
            
        if (authError || !authData.user) {
            Alert.alert("Falha", "Usuário não encontrado.");
            setLoading(false);
            return;
        }
            
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: email,
            password: oldPassword
        });
        
        if (signInError) {
            Alert.alert("Falha", "Senha atual incorreta.");
            setLoading(false);
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (updateError) {
            Alert.alert("Falha", "Não foi possível alterar sua Senha");
            setLoading(false);
            return;
        }

        Alert.alert("Sucesso", "Senha Atualizada com Sucesso")
        setOldPassword('');
        setNewPassword('');
        setLoading(false);
    }

    async function updateNameUser() {

    }

    useFocusEffect( // realiza a busca a cada selecao do campo profile - Gustavo Alfredo
        useCallback(() => {
            fetchDataCurrentUser();
        }, [])
    );

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
                                editable={false}
                                placeholder="Digite seu Nome"
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Email</Text>
                            <TextInput
                                editable={false}
                                placeholder="Digite seu Email"
                                style={styles.input}
                                inputMode='email'
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={{ height: 1.5, width: '100%', backgroundColor: '#000', marginTop:20}}></View>
                        
                        <View style={{ marginTop:20 }}>
                            <Text style={styles.labelTitle}>Senha Atual</Text>
                            <TextInput
                                placeholder="Digite a senha Atual"
                                secureTextEntry
                                style={styles.input}
                                onChangeText={setOldPassword}
                                value={oldPassword}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Nova Senha</Text>
                            <TextInput
                                placeholder="Digite a nova senha"
                                secureTextEntry
                                style={styles.input}
                                onChangeText={setNewPassword}
                                value={newPassword}
                            />
                        </View>

                        <TouchableOpacity style={styles.btnSave} onPress={updatePasswordUser}>
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Alterar Senha'}
                            </Text>
                        </TouchableOpacity>

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
        fontSize: 33,
        marginTop: '10%',
        fontFamily: 'FonteRussoOne'
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
        textAlignVertical: 'top', 
        minHeight: 150, 
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