import colors from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Singup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    async function clearFields() {
        setName("")
        setEmail("")
        setPassword("")
    }

    async function handleSignup() {
        setLoading(true)

        //criar validacoes
        if (!email || !password || !name) {
            Alert.alert("Erro", "Preencha todos os campos!");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            Alert.alert("Erro", "A senha deve possuir no mínimo 8 caracteres");
            setLoading(false);
            return;
        }

        // Criar conta
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name } 
            }
        });

        if (error) {
            console.error("error create account: " + error.message)
            Alert.alert("Falha", "Não foi Possível Criar uma Conta");
            setLoading(false);
            return;
        } else {
            Alert.alert("Sucesso", "Cadastro Efetuado Com Sucesso")
            clearFields()
        }

        setLoading(false);
        //router.replace('/')
    }

    return (
        <View style={{flex:1, backgroundColor: colors.skyblue}}>
            
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '15%', width: '110%' }}>
                <Text style={styles.title}>MyWorkshop</Text>
            </View>
            
            <View style={styles.container}>
                <View style={styles.form}>


                    <View style={{ marginTop: '5%' }}>
                        <Text style={styles.labelTitle}>Nome</Text>
                        <TextInput
                            placeholder="Digite seu Nome"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View>
                        <Text style={styles.labelTitle}>Email</Text>
                        <TextInput
                        placeholder="Digite seu email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"   
                        autoCapitalize="none"          
                        autoCorrect={false}            
                        textContentType="emailAddress" 
                        />
                    </View>

                    <View>
                        <Text style={styles.labelTitle}>Senha</Text>
                        <TextInput
                            placeholder="Digite sua senha"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.btnLogin} onPress={handleSignup}>
                            <Text style={styles.buttonText}>
                                {loading ? "Carregando..." : "Criar Conta"}
                            </Text>
                    </TouchableOpacity>

                    <Link 
                        href={'/(auth)/signin/page'} 
                        style={styles.link}>
                        <Text>Entrar</Text>
                    </Link>
                    
                </View>
            </View>
        </View>
    )

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
        marginRight: '7%'
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