import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import { Input, Icon } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/native';

// import functions to access database
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { width, height } = Dimensions.get('window');

// const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

const ProductContainer = (props) => {

    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);

    // react navigation when in focus a screen will use callback. useful when we have several products in the same navigation
    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
                // Products from database
                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setProductsCtg(res.data);
                        setInitialState(res.data);
                    })
                    .catch((error) => {
                        console.log(error.message)
                    })
                // Categories from database
                axios
                    .get(`${baseURL}categories`)
                    .then((res) => {
                        setCategories(res.data);
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
        
                return () => {
                    setProducts([])
                    setProductsFiltered([])
                    setFocus()
                    setCategories([])
                    setActive()
                    setInitialState()
                }
            },
            [],
        )
    ))



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

    // Categories
    const changeCtg = (ctg) => {
    {
        ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
                products.filter((i) => i.category ? i.category._id === ctg : null),
                setActive(true)
            ),
            ];
    }
    };

    return (
        <View>
            <View style={{width:width}}>
                <Input 
                    placeholder='Search'
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                />
                {focus == true ? (
                    <Icon onPress={onBlur} name="clear"/>
                ): null}
            </View>

            {focus == true ? (
                <SearchedProduct
                    navigation={props.navigation}
                    productsFiltered ={productsFiltered}
                />
            ) : (
                <ScrollView>
                    <View>
                        <Banner/>
                    </View>
        
                    <View>
                        <CategoryFilter
                            categories={categories}
                            categoryFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                        />
                    </View>
                    {productsCtg.length > 0 ? (
                        <View style={styles.listContainer}>
                            {productsCtg.map((item) => {
                                return(
                                    <ProductList
                                        /* first thing to se for navigation */
                                        navigation={props.navigation}
                                        key={item._id.$oid}
                                        item={item}
                                    />
                                )
                            })}
                        </View>
                    ) : (
                        <View style={[styles.center, {height: height / 2}]}>
                            <Text>No products found</Text>
                        </View>
                    )}

                </ScrollView>
            )}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      height: "100%",
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default ProductContainer;