import React, {useContext, useState} from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AuthContext } from "../contexts/AuthContext"

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

import { SimpleLineIcons } from '@expo/vector-icons';


export type StackPramsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        name: string | null;
        order_id: string;
    };
}

const Stack = createNativeStackNavigator<StackPramsList>();

function AppRoutes(){
    const {signOut} = useContext(AuthContext)

    return(
            <Stack.Navigator>
                   <Stack.Screen 
                        name="Dashboard" 
                        component={Dashboard} 
                        options={{
                            headerTitle: () => (
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>
                                    <Text style={{ color: '#FFFFFF' }}>Sujeito</Text>
                                    <Text style={{ color: '#FF0707' }}> Pizza</Text>
                                </Text>
                            ),
                            headerStyle: {
                                backgroundColor: '#003249',
                            },
                        headerTintColor: '#fff',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={signOut}
                                style={{alignItems: 'center'}}
                            >
                               <SimpleLineIcons name="logout" size={20} color="#CCDBDC" />
                            </TouchableOpacity>
                        ),
                        }}
                    />

            <Stack.Screen 
                name="Order" 
                component={Order} 
                options={{headerShown: false, title: '',}}
             />

             <Stack.Screen
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    title: 'Finalizando',
                    headerStyle: {
                        backgroundColor: '#003249',
                    },
                    headerTintColor: '#fff',
                }}
             
             />
        </Stack.Navigator>
    )
}

export default AppRoutes;