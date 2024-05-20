import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ProductProps } from '../../pages/Order';

interface ProductModalPickerProps {
    options: ProductProps[];
    handleCloseModal: () => void;
    selectedItem: (item: ProductProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

export function ModalPicker({ options, handleCloseModal, selectedItem }: ProductModalPickerProps) {

    async function onPressItem(item: ProductProps) {
        selectedItem(item)
        handleCloseModal()
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <ScrollView>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                    {option}
                </ScrollView>
            </ScrollView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4
    },

    option: {
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },

    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }

})
