import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ShopCart from '../Screens/ShoppingCart/Cart';

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ShopCart'
                component={ShopCart}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />
}