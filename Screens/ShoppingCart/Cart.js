import React from 'react';
import { Text, View } from 'react-native';

// allows to have access to state of store
import { connect } from "react-redux";

const Cart = (props) => {
    return (
        <View style={{flex:1}}>
            {props.cartItems.map(x => {
                return(
                    <Text>{x.product.name}</Text>
                )
            })}
        </View>
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

// connect mapStateToProps to Cart, null because we dispatch item to state
export default connect(mapStateToProps, null)(Cart);