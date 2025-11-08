import colors from "@/constants/colors";
import { useFonts } from 'expo-font';
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../../assets/fonts/RussoOne-Regular.ttf'),
    });

    // dados inseridos
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={{flex:1, backgroundColor: colors.skyblue}}>
            
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15%', width: '110%' }}>
                <Text style={styles.title}>MyWorkshop</Text>
            </View>
            
            <View style={styles.container}>
                <View style={styles.form}>

                    <View style={{ marginTop: '5%' }}>
                        <Text style={styles.labelTitle}>Email</Text>
                        <TextInput
                            placeholder="Digite seu email"
                            style={styles.input}
                        />
                    </View>

                    <View>
                        <Text style={styles.labelTitle}>Senha</Text>
                        <TextInput
                            placeholder="Digite sua senha"
                            secureTextEntry
                            style={styles.input}
                        />
                    </View>

                    <Pressable style={styles.btnLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </Pressable>

                    <Link 
                        href={'/(auth)/signup/page'} 
                        style={styles.link}>
                        <Text>Cadastre-se</Text>
                    </Link>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 1,
        backgroundColor: colors.white,
        marginTop: '20%',
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
    },

    title: {
        color: colors.white,
        fontSize: 35,
        marginTop: '15%',
        fontFamily: 'FonteRussoOne',
        alignItems: 'center',
        marginRight: '8.5%'
    },

    form: {
        flex: 2,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: '5%',
        paddingLeft: '3%',
        paddingRight: 14
    },

    input: {
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 8,
        marginBottom: 16,
        padding: 1,
        paddingHorizontal: 8,
        paddingTop: 14,
        paddingBottom: 14
    },

    labelTitle: {
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 10,
        fontWeight: 'medium'
    },

    buttonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },

    btnLogin: {
        width: '100%',
        height: '7%',
        marginTop: '5%',
        backgroundColor: colors.skyblue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    link: {
        marginTop: '5%',
        textAlign: 'center',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})