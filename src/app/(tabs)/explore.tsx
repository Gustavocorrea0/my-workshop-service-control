import Colors from "@/constants/colors";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    { label: 'Aguardando', value: '1' },
    { label: 'Em Atendimento', value: '2' },
    { label: 'Concluido', value: '3' },
    { label: 'Aguardando Fornecedor', value: '4' },
    { label: 'Aguardando Cliente', value: '5' },
];

const Explore = () => {
    const [value, setValue] = useState(null);
    
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
                                placeholder="Digite o nome"
                                style={styles.input}
                            />
                        </View>
                        
                        <View>
                            <Text style={styles.labelTitle}>Marca</Text>
                            <TextInput
                                placeholder="Digite a marca"
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Placa</Text>
                            <TextInput
                                placeholder="Digite a placa"
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Cor</Text>
                            <TextInput
                                placeholder="Digite a cor"
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Cor</Text>
                            <TextInput
                                placeholder="Digite o ano"
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Mecanico</Text>
                            <TextInput
                                placeholder="Digite o nome do mecanico responsavel"
                                style={styles.input}
                            />
                        </View>

                        <View>
                            <Text style={styles.labelTitle}>Descrição</Text>
                            <TextInput
                                placeholder="Digite a descrição do serviço"
                                style={styles.inputDescription}
                                numberOfLines={4}
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

                        <Pressable style={styles.btnSave}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </Pressable>

                        <Pressable style={styles.btnCancel}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>

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

})