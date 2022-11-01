import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Card, Title, Paragraph, List, Provider as PaperProvider} from 'react-native-paper';

//redux
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

const SingleProduct = (props) => {
    // receiving all the props from params and set it to item
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);

    return (
        <Card style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Card.Cover 
                    source={{
                        uri: item.image ? 
                        item.image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                    }}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Card.Content style={styles.contentContainer}>
                    <Title>
                        {item.name}
                    </Title>
                    <Text>{item.brand}</Text>
                    <Paragraph>
                        {item.description}
                    </Paragraph>
                </Card.Content>
                {/* Description, Rich Description and Availability */}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Text style={styles.price}>${item.price}</Text>
                <Button 
                    title={'Add'} 
                    color={'green'} 
                    onPress={()=>{
                        props.addItemToCart(item)
                    }}
                />
            </View>
        </Card>
    )
}

// dispatch our actions to the state container
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) =>
            dispatch(actions.addToCart({quantity: 1, product}))
    }
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
    },
    contentContainer: {

    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontsize: 30,
        margin: 20,
        color: 'red'
    }
})

export default connect(null, mapDispatchToProps)(SingleProduct);
