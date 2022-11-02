import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, List } from 'react-native-paper';


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
        </List.Section>
    )
}

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default CartItem;