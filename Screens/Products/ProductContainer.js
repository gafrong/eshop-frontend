import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from 'react-native';
import { Input, Icon } from '@rneui/themed';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

var { height } = Dimensions.get('window');

const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

var { width } = Dimensions.get('window');

const ProductContainer = () => {

    const [ products, setProducts ] = useState([]);
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ focus, setFocus] = useState();
    const [ categories, setCategories ] = useState([]);
    const [ productsCtg, setProductsCtg ] = useState([]);
    const [ active, setActive ] = useState();
    const [ initialState, setInitialState ] = useState([]);

    useEffect(()=>{
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories);
        setProductsCtg(data);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            setCategories([])
            setActive()
            setInitialState()
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

    // Categories
    const changeCtg = (ctg) => {
    {
        ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
                products.filter((i) => i.category._id === ctg),
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
      height: height,
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