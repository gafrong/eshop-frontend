import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Card, ListItem, Text, Image } from "@rneui/base";
import { List } from "react-native-paper";

var { width } = Dimensions.get('window');

const SearchedProduct = (props) => {
    const { productsFiltered} = props;
    return(

        <View style={{ width: width }}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("ProductDetail", {item: item})
                        }}
                        key={item._id.$oid}
                        avatar
                    >
                        <List.Image
                            source={{uri: item.image ?
                                item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" 
                            }}
                        />
                        <Text>{item.name}</Text>
                        <Text>{item.description}</Text>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center'}}>
                        No products match the criteria
                    </Text>
                </View>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SearchedProduct;