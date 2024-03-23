import React, {useContext, useState} from "react"
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native"

import { AuthContext } from "../../contexts/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackPramsList } from "../../routes/app.routes"

import { api } from "../../services/api"

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    const {signOut} = useContext(AuthContext)

    const [number, setNumber] = useState('');

    async function openOrder(){
        if(number === ''){
            return;
        }

        const response = await api.post('/order', {
            table: Number(number)
        })

        //precisa fazer a requisição e abrir a mesa e navegar para proxima tela
        navigation.navigate('Order', { number: number, order_id: response.data.id})

        setNumber('')
    }


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder="Número do pedido"
                placeholderTextColor="#CCDBDC"
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Criar pedido</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#003249'
    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,

    },

    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#007EA7',
        paddingHorizontal: 8,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 22,
        color: '#FFF'
    },

    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#051923',
        borderRadius: 12,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText:{
        fontSize: 18,
        color: '#CCDBDC',
        fontWeight: 'bold',
    },
})