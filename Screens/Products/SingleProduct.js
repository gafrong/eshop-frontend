import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Image 
                        source={{
                            uri: item.image ? 
                            item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                    <Text style={styles.center}>
                        {item.name}
                    </Text>
                    <Text style={styles.center}>
                        {item.description}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    scrollView: {
        marginBottom: 80,
        padding: 5
    },
    imageContainer: {
        backgroundColor: 'white',
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    center: {
        textAlign: 'center'
    }
})


export default SingleProduct;
