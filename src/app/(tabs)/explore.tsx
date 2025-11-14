import Colors from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { useFonts } from 'expo-font';
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Novo', value: '0' },
    { label: 'Parado', value: '1' },
    { label: 'Aguardando', value: '2' },
    { label: 'Em Atendimento', value: '3' },
    { label: 'Aguardando Fornecedor', value: '4' },
    { label: 'Aguardando Cliente', value: '5' },
    { label: 'Concluido', value: '6' },
];

const Explore = () => {

    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'),
    });

    const [value, setValue] = useState(1);
    const [name, setNameCar] = useState(''); 
    const [brand, setBrandCar] = useState(''); 
    const [plate, setPlateCar] = useState(''); 
    const [color, setColorCar] = useState(''); 
    const [year, setYearCar] = useState(''); 
    const [mechanic, setMechanicCar] = useState(''); 
    const [description, setDescriptionCar] = useState(''); 
    const [emailUser, setEmailUser] = useState('');
    const [situation, setSituationCar] = useState(0); 
    const [loading, setLoading] = useState(false); 
    
    const clearFields = () => {
        setNameCar('');
        setBrandCar('');
        setPlateCar('');
        setColorCar('');
        setYearCar('') ;
        setMechanicCar('');
        setDescriptionCar('');
        setSituationCar(0);
    };

    async function getEmailUser() {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            return null;
        }

        const emailUsuario = data.user?.email;
        setEmailUser(emailUsuario || '');

        return emailUsuario;
    }   

    async function createService() {

        if (name == "") {
            Alert.alert("Falha", "Nome Inválido");
            return;
        }

        if (brand == "") {
            Alert.alert("Falha", "Marca Inválida");
            return;
        }

        if (plate.length != 7) {
            Alert.alert("Falha", "Placa Inválida");
            return;
        }

        if (color == "") {
            Alert.alert("Falha", "Cor Inválida");
            return;
        }

        if (               
            year == "" ||
            Number(year) > Number(new Date().getFullYear() + 1) 
        ) {
            Alert.alert("Falha", "Ano Inválido");
            return;
        }

        if (mechanic == "") {
            Alert.alert("Falha", "Mecânico Inválido");
            return;
        }

        if (description == "") {
            Alert.alert("Falha", "Descrição Inválida");
            return;
        }
        
        const email = await getEmailUser();
        
        if (email == "") {
            Alert.alert("Falha", "Usuario não Logado");
            return;
        }

        const { data, error } = await supabase.from('service').insert([
            {
                car_name: name,
                car_brand: brand,
                car_plate: plate.toUpperCase(),
                car_color: color,
                car_year: Number(year),
                service_description: description,
                mechanic_responsible: mechanic,
                service_status: value,
                user_create: email,
                user_update: email,
            }
        ])
        
        if (error) {
            Alert.alert("Erro", "Não foi possível salvar as Informações");
            setLoading(false);
            return;
        } else {
            Alert.alert("Sucesso", "Informações Cadastradas");
            clearFields();
            return;
        }
    }

    return (
        <View style={{flex:1}}>

            <View style={styles.header}>
                <Text style={styles.title}>New Service</Text>
            </View>

            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.labelTitle}>Carro</Text>
                            <TextInput
                                placeholder="Digite o nome do carro"
                                style={styles.input}
                                onChangeText={setNameCar}
                                value={name}
                            />
                        </View>
                        
                        <View>
                            <Text style={styles.labelTitle}>Marca</Text>
                            <TextInput
                                placeholder="Digite a marca do carro"
                                style={styles.input}
                                onChangeText={setBrandCar}
                                value={brand}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Placa</Text>
                            <TextInput
                                placeholder="Digite a placa do carro"
                                style={styles.input}
                                onChangeText={setPlateCar}
                                value={plate}
                                
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Cor</Text>
                            <TextInput
                                placeholder="Digite a cor do carro do carro"
                                style={styles.input}
                                onChangeText={setColorCar}
                                value={color}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Ano</Text>
                            <TextInput
                                placeholder="Digite o ano do carro"
                                style={styles.input}
                                onChangeText={setYearCar}
                                value={year}
                                keyboardType="numeric"
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Mecânico</Text>
                            <TextInput
                                placeholder="Digite o nome do mecânico responsavél"
                                style={styles.input}
                                onChangeText={setMechanicCar}
                                value={mechanic}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Descrição</Text>
                            <TextInput
                                placeholder="Digite a descrição do serviço"
                                style={styles.inputDescription}
                                numberOfLines={4}
                                onChangeText={setDescriptionCar}
                                value={description}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Situação</Text>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Selecione"
                                    searchPlaceholder="Buscar..."
                                    value={value}
                                    onChange={item => setValue(item.value)}
                                />
                        </View>

                        <TouchableOpacity style={styles.btnSave} 
                                          onPress={createService}
                                          activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Salvar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnCancel} 
                                          onPress={ clearFields }
                                          activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <View style={{ height: 400, width:'100%', backgroundColor: Colors.white}}></View>

                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
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
        fontFamily: 'FonteRussoOne',
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

    dropdown: {
        height: 50,
        borderColor: '#888',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    placeholderStyle: { color: '#999', fontSize: 16 },

    selectedTextStyle: { color: '#000', fontSize: 16 },

    iconStyle: { width: 20, height: 20 },

    inputSearchStyle: { height: 40, fontSize: 16 },
    
    result: { marginTop: 20, fontSize: 18 },

    btnSave: {
        width: '100%',
        height: '3.5%',
        marginTop: '5%',
        backgroundColor: Colors.skyblue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnCancel: {
        width: '100%',
        height: '3.5%',
        marginTop: '3%',
        backgroundColor: Colors.red,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    }

});