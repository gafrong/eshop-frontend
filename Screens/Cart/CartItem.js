import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Text, List, Divider } from 'react-native-paper';

var { height } = Dimensions.get('window');

const CartItem = (props) => {
    const data = props.item.item.product
    const [quantity, setQuantity] = useState(props.item.quantity)

    return (
        <List.Section
            key={Math.random()}
            style={styles.listItem}
        >
            <List.Item 
                left={()=> 
                    <List.Image source={{
                        uri: data.image 
                        ? data.image 
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                        }}/>
                }
                title={data.name}
                description={data.price}
                style={styles.body}
            />
            <Divider/>
        </List.Section>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginTop: -18
    },
    body: {
        paddingLeft: 5,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default CartItem;