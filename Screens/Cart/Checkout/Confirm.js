import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';

// connect to redux to clear cart later
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var { width, height } = Dimensions.get('window');

const Confirm = (props) => {

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            //use the StackScreen name ShopCart in CartNavigator to navigate
            props.navigation.navigate("ShopCart")
        }, 500);
    }

    const orderProps = props.route.params;
    
    console.log(orderProps)
    return(
        <ScrollView contentContainerStyle={StyleSheet.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>Confirm Order</Text>       
                { orderProps ?
                    <View style={{borderWidth:1, borderColor:"orange"}}>
                        <Text style={styles.title}>Shipping to:</Text>
                        <View style={{ padding: 8}}>
                            <Text>Adress: {orderProps.order.order.ScrollViewshippingAdress1}</Text>
                            <Text>Adress2: {orderProps.order.order.shippingAdress2}</Text>
                            <Text>City: {orderProps.order.order.city}</Text>
                            <Text>Zip code: {orderProps.order.order.zip}</Text>
                            <Text>Country: {orderProps.order.order.country}</Text>
                        </View>
                        <Text style={styles.title}>Items:</Text>
                            {orderProps.order.order.orderItems.map((x)=>{
                                return(
                                    <ListItem
                                        bottomDivider
                                        style={styles.listItem}
                                        key={x.product.name}
                                        avatar
                                    >
                                        <Avatar source={{uri: x.product.image}}/>
                                        <ListItem.Content>
                                            <ListItem.Title>{x.product.name}</ListItem.Title>
                                        </ListItem.Content>
                                        <ListItem.Subtitle>{x.product.price}원</ListItem.Subtitle>

                                    </ListItem>
                                )
                            })}
                    </View>
                : null }
                <View style={{alignItems:'center', margin:20}}>
                    <Button 
                        title={'Place Order'} 
                        onPress={()=>confirmOrder()}/>
                </View> 
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearCart()),
    };
  };
  
  const styles = StyleSheet.create({
    container: {
      height: height,
      padding: 8,
      alignContent: "center",
      backgroundColor: "white",
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    title: {
      alignSelf: "center",
      margin: 8,
      fontSize: 16,
      fontWeight: "bold",
    },
    listItem: {
      alignItems: "center",
      backgroundColor: "white",
      justifyContent: "center",
      width: width / 1.2,
    },
    body: {
      margin: 10,
      alignItems: "center",
      flexDirection: "row",
    },
  });
  
  export default connect(null, mapDispatchToProps)(Confirm);