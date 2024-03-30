import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList} from 'react-native';

import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackPramsList } from '../../routes/app.routes';

import { api } from '../../services/api';

type RouteDetailParams = {
    Order: {
        order_id: string;
        number: string | number;
        name: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    name: string | null;
    product_id: string;
    amount: number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [product, setProduct] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[]>([])

    const [observation, setObservation] = useState('');

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/category')
            
            setCategory(response.data)
            setCategorySelected(response.data[0])
        }

        loadInfo()
    }, [])

    useEffect(() => {

        async function loadProducts(){
            const response = await api.get('/category/product', {
                params: {
                    category_id: categorySelected?.id,
                }
            })
            console.log('produtos de uma categoria' + response.data)
            setProduct(response.data)
            setProductSelected(response.data[0])
        }
        loadProducts()

    }, [categorySelected])

    async function handleCloseOrder(){
        try{

            await api.delete('/order', {
                params:{
                    order_id: route.params?.order_id
                }
            })

            navigation.goBack()

        }catch(err){
            console.log(err)
        }
    }

    async function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

    async function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    async function handleAddItem() {
        try {
            const response = await api.post('order/add', {
                order_id: route.params?.order_id,
                product_id: productSelected?.id,
                amount: Number(amount)
            })
    
            let data = {
                id: response.data.id,
                product_id: productSelected?.id as string,
                name: productSelected?.name as string,
                amount: Number(amount)
            }
    
            const existingItemIndex = items.findIndex(item => item.product_id === data.product_id);
    
            if (existingItemIndex !== -1) {
                // Se o item já estiver na lista, atualize a quantidade
                const updatedItems = [...items];
                updatedItems[existingItemIndex].amount += data.amount;
                setItems(updatedItems);
            } else {
                // Se o item não estiver na lista, adicione-o normalmente
                setItems(oldArray => [...oldArray, data]);
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    }

    async function handleDeleteItem(item_id: string){
       await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
       })

       // após remover da api removemos esse item da nossa lista de items
       let removeItem = items.filter(item => {
         return (item.id !== item_id)
       })

       setItems(removeItem)
    }

    async function handleObservationChange(name: string) {
        console.log('Observation changed:', name);
        setObservation(name);
      };

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', { 
            number: route.params?.number,
            order_id: route.params?.order_id,
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pedido {route.params.number}</Text>
                <TouchableOpacity onPress={handleCloseOrder} style={[{opacity: items.length === 0 ? 1 : 0.3}]} disabled={items.length > 0}>
                    <Feather name="trash-2" size={28} color="#ff3f4b"/>
                </TouchableOpacity>
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {product.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                    style={[styles.input, {width: '60%', textAlign: 'center'}]}
                    placeholderTextColor="#fff"
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.iconText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                    >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
            />

                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    value={observation}
                    onChangeText={handleObservationChange}
                    placeholder="Digite sua observação aqui..."
                    placeholderTextColor="#CCDBDC"
                />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalCategoryVisible(false) }
                    options={category}
                    selectedItem={handleChangeCategory}
                />

            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalProductVisible(false) }
                    options={product}
                    selectedItem={handleChangeProduct}
                />

            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
        backgroundColor: '#003249',
    },

    header: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        marginTop: 24
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: '#007EA7',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20
    },

    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    buttonAdd: {
        backgroundColor: '#CCDBDC',
        height: 40,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },

    iconText: {
        color: '#051923',
        fontSize: 20,
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: '#051923',
        borderRadius: 4,
        height: 40,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        color: '#CCDBDC',
        fontSize: 20,
        fontWeight: 'bold'
    },

    textArea: {
        borderWidth: 1,
        borderColor: '#CCDBDC',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        color: '#CCDBDC',
      },
})