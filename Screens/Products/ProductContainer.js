import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();

    useEffect(()=>{
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    return (
        <View>
            <View>
                <Input 
                    placeholder='Search'
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    name='clear'
                />
                {focus == true ? (
                    <Icon onPress={onBlur} />
                ): null}
            </View>

            {focus == true ? (
                <SearchedProduct
                    productsFiltered ={productsFiltered}
                />
            ) : (
                <View>
                    <FlatList 
                        numColumns={2}
                        data={products}
                        renderItem={({item}) => <ProductList
                        key={item.id}
                        item={item}
                        keyExtractor={item => item.name}/>}
                    />
                </View>
            )}


        </View>
    )
}

export default ProductContainer;