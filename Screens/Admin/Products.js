import React, {useState, useCallback} from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { Header, Input } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListItem from './ListItem';

var { height, width } = Dimensions.get("window")

const Products = (props) => {

    const [productList, setProductList ] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })    

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }    
            },
            [],
        )
    )

    return(
        <View style={styles.container}>
            <View> 
                <Input  
                    leftIcon={
                        <Icon 
                            name="search"
                        />
                    }
                    placeholder='Search'
                    // onChange
                />
            </View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" color="red" />
                </View>

            ) : (
                <FlatList 
                    data={productFilter}
                    renderItem={({item, index}) => (
                        <ListItem 
                            {...item}
                            navigation={props.navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Products;