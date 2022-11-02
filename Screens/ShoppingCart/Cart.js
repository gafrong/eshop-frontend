import React from 'react';
import { Text, View, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

// allows to have access to state of store
import { connect } from "react-redux";
// need actions to clear the cart later
import * as actions from '../../Redux/Actions/cartActions';

var { height, width } = Dimensions.get("window");

const ShopCart = (props) => {
    var total = 0;
    // calculate the total of all products in the cart
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    return (
        // using react fragment acting as a view without occupying a node to encapsulate some code
        <>
            {props.cartItems.length ? (
                <View>
                    <Text>Your Cart</Text>
                    {props.cartItems.map(data => {
                        return (
                            <List.Section
                                key={Math.random()}
                            >
                                <List.Item 
                                    left={()=> 
                                        <List.Image source={{
                                            uri: data.product.image 
                                            ? data.product.image 
                                            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                                             }}/>
                                    }
                                    title={data.product.name}
                                    description={data.product.price}
                                />
                                <Divider/>
                            </List.Section>
                        )
                    })}
                    <View style={styles.bottomContainer}>
                        <Text style={styles.price}>{total}원</Text>
                    </View>
                    <Button title="Clear" />
                    <Button title="Checkout" 
                        onPress={()=> props.navigation.navigate('Checkout')} />
                </View>
            ): (
                <View style={styles.emptyContainer}>
                    <Text>Looks like your cart is empty</Text>
                    <Text>Add products to your cart to get started</Text>
                </View>
            )}
        </>
    )
}

// map the state to props
const mapStateToProps = (state) => {
    // because we create cartItems in Reducers
    const { cartItems } = state;
    return {
        cartItems: cartItems
    }
}

const styles = StyleSheet.create({
    emptyContainer:{
        height: height,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2
    }
})

// connect mapStateToProps to Cart, null because we dispatch item to state
export default connect(mapStateToProps, null)(ShopCart);