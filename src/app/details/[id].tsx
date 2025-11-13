import colors from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
    { label: 'Novo', value: '0' },
    { label: 'Parado', value: '1' },
    { label: 'Aguardando', value: '2' },
    { label: 'Em Atendimento', value: '3' },
    { label: 'Aguardando Fornecedor', value: '4' },
    { label: 'Aguardando Cliente', value: '5' },
    { label: 'Concluido', value: '6' },
];

const ServiceDetail = () => {
    const [loading, setLoading] = useState(false); 
    const [value, setValue] = useState(1);

    const [services, setServices] = useState<{ 
        id_service: string;
        datetime_create: string,
        datetime_update: string, 
        car_name: string,
        car_brand: string,
        car_plate: string,
        car_color: string,
        car_year: BigInt,
        service_description: string,
        mechanic_responsible: string,
        service_status: BigInt,
        user_create: string,
        user_update: string,
    }[]>([]);

    const [fontsLoaded] = useFonts({
        FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'),
    });

    async function signOut() {
        router.replace("/(tabs)")
    }

    const { id } = useLocalSearchParams();

    async function selectService() {
        const { data, error } = await supabase.from('service').select().eq('id_service', id)
        if (error) {
            Alert.alert("Falha", "Dados nao encontrados")
            return;
        }
        
        if (!data || data.length === 0) {
            Alert.alert("Atenção", "Nenhum serviço encontrado");
            return;
        }
        
        setServices(data);
        //console.log("Dados Retornado: " + JSON.stringify(data, null, 2))
    }

    useEffect(() => {
        selectService();
    }, [])

    // criar apresentacao em tela
    return (
        <View style={{flex:1, backgroundColor: colors.white}}>
            <View style={styles.header}>

                {services.length > 0 ? (
                    <>
                        <Text style={styles.title}>{services[0].car_name}</Text>
                    </>
                ) : (
                    <Text style={styles.title}>Carregando...</Text>
                )}

                <Pressable style={styles.btnRetorno} onPress={signOut}>
                    <Feather name="arrow-left" size={30} color="white"/>
                </Pressable>
            </View>
            
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        {services.length > 0 ? (
                            <>  
                                <Text style={styles.labelTitle}>Carro</Text>
                                <TextInput 
                                    editable={false}
                                    value={services[0].car_name} 
                                    style={styles.input}
                                />

                                <Text style={styles.labelTitle}>Marca</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={services[0].car_brand} 
                                />

                                <Text style={styles.labelTitle}>Placa</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={services[0].car_plate} 
                                />

                                <Text style={styles.labelTitle}>Cor</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={services[0].car_color} 
                                />

                                <Text style={styles.labelTitle}>Ano</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={services[0].car_year.toString()} 
                                />

                                <Text style={styles.labelTitle}>Descrição</Text>
                                <TextInput 
                                    placeholder="Digite a descrição do serviço"
                                    style={styles.inputDescription}
                                    numberOfLines={4}
                                    value={services[0].service_description} 
                                />

                                <Text style={styles.labelTitle}>Mecânico:</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={services[0].mechanic_responsible}
                                />

                                <View style={{ height: 1.5, width: '100%', backgroundColor: '#000', marginTop:10 }}/>
                                <View style={{ marginTop: 15 }}></View>

                                <Text style={styles.labelTitle}>Criador:</Text>
                                <TextInput 
                                    editable={false}
                                    style={styles.input}
                                    value={services[0].user_create}
                                />

                                <Text style={styles.labelTitle}>Data e Hora Criação:</Text>
                                <TextInput 
                                    editable={false}
                                    style={styles.input}
                                    value={services[0].datetime_create}
                                />

                                <Text style={styles.labelTitle}>Alterador:</Text>
                                <TextInput 
                                    editable={false}
                                    style={styles.input}
                                    value={services[0].user_update}
                                />

                                <Text style={styles.labelTitle}>Data e Hora Alteração:</Text>
                                <TextInput 
                                    editable={false}
                                    style={styles.input}
                                    value={services[0].datetime_update}
                                />

                                <View style={{ height: 1.5, width: '100%', backgroundColor: '#000', marginTop:10 }}/>

                                <View style={{ marginTop: 20 }}>
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
                                        value={services[0].service_status.toString()} 
                                        onChange={item => setValue(item.value)}
                                    />
                                </View>
                            </>
                        ) : (
                            <Text>Carregando...</Text>
                        )}

                        <TouchableOpacity style={styles.btnSave} 
                                        //onPress={createService}
                                        activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Salvar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnDelete} 
                                        //onPress={createService}
                                        activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Excluir'}
                            </Text>
                        </TouchableOpacity>

                        <View style={{ height: 200, width:'100%', backgroundColor: colors.white}}></View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default ServiceDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: '5%'
    },    
    
    header: {
        height: "15%",
        width: "100%",
        backgroundColor: colors.skyblue,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
    },
    
    btnRetorno: {
        marginRight:"80%",
        marginTop: "-9%"
    },

    title: {
        color: colors.white,
        fontSize: 25,
        marginTop: '10%',
        fontFamily: 'FonteRussoOne'
    },

    labelTitle: {
        fontSize: 17,
        marginBottom: 5,
        marginLeft: 10
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

    form: {
        flex: 2,
        backgroundColor: colors.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: '5%',
        paddingLeft: '3%',
        paddingRight: 14
    },

    inputDescription: { 
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        paddingVertical: 12,
        textAlignVertical: 'top', 
        minHeight: 150, 
        fontSize: 16,
        backgroundColor: '#fff'
    },

    btnSave: {
        width: '100%',
        height: '3%',
        marginTop: '5%',
        backgroundColor: colors.skyblue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    btnDelete: {
        width: '100%',
        height: '3%',
        marginTop: '3%',
        backgroundColor: colors.red,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold'
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
})