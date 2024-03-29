import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    FinishOrder: {
        number: string | number;
        order_id: string;
        name: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){
    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

    async function handleFinish(){
        try{
            await api.put('/order/send', {
                order_id: route.params?.order_id,
            })

            navigation.popToTop()
        }catch(err){
            console.log("ERRO AO FINALIZAR, tente mais tarde")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.alert}>Pedido: {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar Pedido</Text>
                <Feather name="shopping-cart" size={20} color="#CCDBDC" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003249',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    alert:{
        fontSize: 20,
        color: '#CCDBDC',
        fontWeight: 'bold',
        marginBottom: 14
    },

    title: {
        fontSize: 30,
        color: '#FFF',
        marginBottom: 14
    },

    button:{
        backgroundColor: '#051923',
        flexDirection: 'row',
        width: '65%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12
    },

    textButton:{
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#CCDBDC',
    }
    
})