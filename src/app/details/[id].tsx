import colors from "@/constants/colors";
import { supabase } from "@/src/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { format } from 'date-fns';
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

    const [nameCarTitle, setNameCarTitle] = useState(''); 
    const [name, setNameCar] = useState(''); 
    const [brand, setBrandCar] = useState(''); 
    const [plate, setPlateCar] = useState(''); 
    const [color, setColorCar] = useState(''); 
    const [year, setYearCar] = useState(''); 
    const [mechanic, setMechanicCar] = useState(''); 
    const [description, setDescriptionCar] = useState(''); 
    
    const [emailUserCreate, setEmailUserCreate] = useState('');
    const [dateTimeCreate, setDateTimeCreate] = useState('');
    const [emailUserUpdate, setEmailUserUpdate] = useState('');
    const [dateTimeUpdate, setDateTimeUpdate] = useState('');
    
    const [emailUserNow, setEmailUserNow] = useState('');

    const [situation, setSituationCar] = useState(0); 
    const [fontsLoaded] = useFonts({ FonteRussoOne: require('../../../assets/fonts/RussoOne-Regular.ttf'), });
    const { id } = useLocalSearchParams();

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

    function formatDateTime(value?: string) {
        if (!value) { return '' };
        const date = new Date(value);
        if (isNaN(date.getTime())) return '';
        return format(date, 'dd/MM/yyyy | HH:mm');
    }

    function getDateNow(): string {
        const now = new Date();
        const spTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000 - 3 * 3600000);
        const date = spTime.toISOString().replace('T', ' ').split('Z')[0];
        const [main, ms] = date.split('.');
        const microseconds = (ms ? ms.padEnd(6, '0') : '000000').slice(0, 6);
        return `${main}.${microseconds}-03`;
    }

    async function getEmailUser() {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
            console.error('Erro ao obter usuário:', error);
            return null;
        }

        const emailUsuario = data.user?.email;
        setEmailUserNow(emailUsuario || '');

        return emailUsuario;
    }   

    async function signOut() { 
        router.replace("/(tabs)") 
    }
    
    async function fetchService() {
        try {
            setLoading(true);

            const { data, error } = await supabase.from('service').select().eq('id_service', id);

            if (error) {
                Alert.alert("Falha", "Erro ao buscar dados: " + error.message);
                return;
            }

            if (!data || data.length === 0) {
                Alert.alert("Atenção", "Nenhum serviço encontrado");
                return;
            }

            const s = data[0]; 
            setServices(data);
            
            setNameCarTitle(s.car_name)
            setNameCar(s.car_name);
            setBrandCar(s.car_brand);
            setPlateCar(s.car_plate);
            setColorCar(s.car_color);
            setYearCar(s.car_year);
            setMechanicCar(s.mechanic_responsible);
            setDescriptionCar(s.service_description);
            setEmailUserCreate(s.user_create);
            setDateTimeCreate(s.datetime_create);
            setEmailUserUpdate(s.user_update);
            setDateTimeUpdate(s.datetime_update);
            setValue(Number(s.service_status));
        } catch (err) {
            Alert.alert("Erro", "Falha ao carregar dados do serviço");
        } finally {
            setLoading(false);
        }
    }
    
    async function updateService() {

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
            Alert.alert("Falha", "Usuario não Encontrado");
            return;
        }

        const { data, error } = await supabase.from('service').update({       
                                                    car_name: name,
                                                    car_brand: brand,
                                                    car_plate: plate.toUpperCase(),
                                                    car_color: color,
                                                    car_year: Number(year),
                                                    mechanic_responsible: mechanic,
                                                    service_description: description,
                                                    service_status: value,
                                                    user_update: email,
                                                    datetime_update: getDateNow()
                                                }).eq('id_service', id);

        if ( error ) {
            console.log(error)
            Alert.alert("Falha", "Não foi possível Alterar as Informações, tente Novamente");
            return;
        }
        
        console.log(data)
        Alert.alert("Sucesso", "Alteração Realizada")
        fetchService();
    }

    async function deleteService() {

        const { data, error } = await supabase.from('service').delete().eq('id_service', id);

        if ( error ) {
            Alert.alert("Falha", "Não foi possível Excluir este veiculo");
            return;
        }

        Alert.alert("Sucesso", "Veiculo Removido")
        router.replace("/(tabs)")
        
    }

    const confirmDeletion = () =>
        Alert.alert(
            "Confirmar", // Título da mensagem
            "Você tem certeza que deseja realizar Excluir este Veiculo?", // Corpo da mensagem
            [
                {
                    text: "Não", 
                    onPress: () => Alert.alert("Cancelado", "Processo Cancelado"),
                    style: "cancel" 
                },
                {
                    text: "Sim", 
                    onPress: () => deleteService()
                }
            ],
            { cancelable: false } 
    );

    useEffect(() => {
        fetchService();
    }, []);

    return (
        <View style={{flex:1, backgroundColor: colors.white}}>
            <View style={styles.header}>

                <Text style={styles.title}>{nameCarTitle}</Text>

                <Pressable style={styles.btnRetorno} onPress={signOut}>
                    <Feather name="arrow-left" size={30} color="white"/>
                </Pressable>
            </View>
            
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.form}>
                        <Text style={styles.labelTitle}>Carro</Text>
                        <TextInput
                            placeholder="Digite o nome do carro"
                            value={name} 
                            style={styles.input}
                            onChangeText={setNameCar}
                        />

                        <Text style={styles.labelTitle}>Marca</Text>
                        <TextInput 
                            style={styles.input}
                            value={brand} 
                            onChangeText={setBrandCar}
                        />

                        <Text style={styles.labelTitle}>Placa</Text>
                        <TextInput 
                            placeholder="Digite a placa do carro"
                            style={styles.input}
                            value={plate} 
                            onChangeText={setPlateCar}
                        />

                        <Text style={styles.labelTitle}>Cor</Text>
                        <TextInput 
                            placeholder="Digite a cor do carro"
                            style={styles.input}
                            value={color} 
                            onChangeText={setColorCar}
                        />

                        <Text style={styles.labelTitle}>Ano</Text>
                        <TextInput 
                            placeholder="Digite o ano do carro"
                            style={styles.input}
                            value={year.toString()} 
                            keyboardType="numeric"
                            onChangeText={setYearCar}
                        />

                        <Text style={styles.labelTitle}>Mecânico:</Text>
                        <TextInput 
                            placeholder="Digite o nome do mecânico responsavél"
                            style={styles.input}
                            value={mechanic}
                            onChangeText={setMechanicCar}
                        />

                        <Text style={styles.labelTitle}>Descrição</Text>
                        <TextInput 
                            placeholder="Digite a descrição do serviço"
                            style={styles.inputDescription}
                            numberOfLines={4}
                            value={description} 
                            onChangeText={setDescriptionCar}
                        />

                        <View style={{ height: 1.5, width: '100%', backgroundColor: '#000', marginTop:10 }}/>
                        <View style={{ marginTop: 15 }}></View>

                        <Text style={styles.labelTitle}>Criador:</Text>
                        <TextInput 
                            editable={false}
                            style={styles.input}
                            value={emailUserCreate}
                        />

                        <Text style={styles.labelTitle}>Data e Hora Criação:</Text>
                        <TextInput 
                            editable={false}
                            style={styles.input}
                            value={formatDateTime(dateTimeCreate)}
                        />
                                
                        <Text style={styles.labelTitle}>Alterador:</Text>
                        <TextInput 
                            editable={false}
                            style={styles.input}
                            value={emailUserUpdate}
                        />

                        <Text style={styles.labelTitle}>Data e Hora Alteração:</Text>
                        <TextInput 
                            editable={false}
                            style={styles.input}
                            value={formatDateTime(dateTimeUpdate)}
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
                                value={value} 
                                onChange={item => setValue(item.value)}
                            />
                        </View>
                                
                        <TouchableOpacity style={styles.btnSave} 
                                          onPress={updateService}
                                          activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Alterar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnDelete} 
                                          onPress={confirmDeletion}
                                          activeOpacity={0.5}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Carregando...' : 'Excluir Serviço'}
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