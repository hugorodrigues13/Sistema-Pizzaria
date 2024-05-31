import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList, Alert} from 'react-native';

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
        name: string | null;
        price: string | null;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

export type ProductProps = {
    id: string;
    name: string;
    price?: string | null;
}

type ItemProps = {
    id: string;
    name: string | null;
    product_id: string;
    amount: number;
    price: string;
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

    const [amount, setAmount] = useState(1)
    const [items, setItems] = useState<ItemProps[]>([])

    const [observation, setObservation] = useState('');
    const [totalPrice, setTotalPrice] = useState('0,00');

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
            });
    
            if (!response.data.success) {
                Alert.alert('AVISO', response.data.message);
                return;
            }
    
            const priceString = productSelected?.price || '0';
            const numericPrice = parseFloat(priceString.replace('R$', '').replace('.', '').replace(',', '.'));
            const totalPriceItem = numericPrice * Number(amount);
    
            console.log(`Produto: ${productSelected?.name}, Preço Unitário: ${priceString}, Quantidade: ${amount}, Preço Total do Item: ${totalPriceItem}`);
    
            setItems(oldArray => [
                ...oldArray,
                {
                    id: response.data.order.id,
                    product_id: productSelected?.id as string,
                    name: productSelected?.name as string,
                    amount: Number(amount),
                    price: `R$ ${totalPriceItem.toFixed(2).replace('.', ',')}`, // Armazena o preço total do item como string formatada
                }
            ]);
    
            setTotalPrice(prevPrice => {
                const prevPriceNumber = parseFloat(prevPrice.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
                const newTotalPrice = prevPriceNumber + totalPriceItem;
                const formattedTotalPrice = `R$ ${newTotalPrice.toFixed(2).replace('.', ',')}`;
                console.log(`Preço Total Anterior: ${prevPrice}, Novo Preço Total: ${formattedTotalPrice}`);
                return formattedTotalPrice;
            });
            setAmount(1);
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    }

    async function handleDeleteItem(item_id: string){
        try {
            await api.delete('/order/remove', {
                params: {
                    item_id: item_id
                }
            });
    
            setItems(prevItems => prevItems.filter(item => item.id !== item_id));
    
            // Recalcula o preço total após excluir o item
            setTotalPrice(prevPrice => {
                const removedItem = items.find(item => item.id === item_id);
                if (removedItem) {
                    const prevPriceNumber = parseFloat(prevPrice.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
                    const newTotalPrice = prevPriceNumber - parseFloat(removedItem.price.replace('R$', '').replace('.', '').replace(',', '.')) || 0;
                    const formattedTotalPrice = `R$ ${newTotalPrice.toFixed(2).replace('.', ',')}`;
                    console.log(`Preço Total Anterior: ${prevPrice}, Novo Preço Total: ${formattedTotalPrice}`);
                    return formattedTotalPrice;
                } else {
                    return prevPrice;
                }
            });
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    }
    

    function handleFinishOrder(){
        navigation.navigate('FinishOrder', { 
            number: route.params?.number,
            order_id: route.params?.order_id,
            name: observation,
            price: totalPrice
        })
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    const increaseAmount = () => {
        setAmount(amount + 1);
    };

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
                    <Text style={styles.qtdText}>Quantidade:</Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={decreaseAmount} style={styles.iconContainer}>
                        <Feather name="minus" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputQtd, {width: '65%', textAlign: 'center'}]}
                        keyboardType='numeric'
                        value={amount.toString()}
                        onChangeText={(text) => {
                            const parsedAmount = parseInt(text, 10);
                            setAmount(isNaN(parsedAmount) || parsedAmount < 1 ? 1 : parsedAmount);
                        }}
                    />
                    <TouchableOpacity onPress={increaseAmount} style={styles.iconContainer}>
                        <Feather name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
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
                    onChangeText={setObservation}
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

    inputQtd: {
        backgroundColor: '#007EA7',
        borderRadius: 4,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20
    },

    inputContainer: {
        width: '65%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007EA7',
        borderRadius: 5,
    },

    iconContainer: {
        padding: 10,
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
        width: '100%',
        marginTop: 16,
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