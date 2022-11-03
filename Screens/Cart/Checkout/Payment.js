import React, { useState } from "react";
import { View, SafeAreaView } from 'react-native';
import { CheckBox, Header, ListItem, Text, Button  } from '@rneui/themed';
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";

const methods = [
    { name: 'Bank Transfer', value: 1},
    { name: 'Card Payment', value: 2}
]

const paymentCards = [
    { value: 'Visa', key: 1},
    { value: 'Master', key: 2},
    { value: 'Other', key: 3}
]

// function to find the object in an array using key value
function selectedItem(e) {
    return e.key === selected;
}

const Payment = (props) => {
    // catch order data passed through params from Checkout
    const order = props.route.params;
console.log(order)
    const [ selected, setSelected ] = useState();
    const [ card, setCard ] = useState();
    return(
        <SafeAreaView>
            <Header 
                centerComponent={"Select Payment Method"}
            />
            <View>
                {methods.map((item,index) => {
                    return(
                        <ListItem key={item.name} onPress={()=> setSelected(item.value)}>
                            <ListItemTitle>{item.name}</ListItemTitle>
                            <CheckBox 
                                checked={selected == item.value}
                                checkedIcon="check"
                                iconType="material"
                                uncheckedIcon=""    
                                iconRight
                            />
                        </ListItem>    
                    )
                })}
                {selected == 2 ? (
                    <Text>Hello card</Text>
                ) : null}
                <View>
                    <Button
                        title={"Confirm"}
                        onPress={()=> props.navigation.navigate("Confirm", {order})}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}



export default Payment;