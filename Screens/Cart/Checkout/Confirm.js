import React from "react";
import { View, Text } from 'react-native';

const Confirm = (props) => {

    console.log(props.route.params.order)
    return(
        <View>
            <Text>Confirm Screen</Text>
        </View>
    )
}

export default Confirm;