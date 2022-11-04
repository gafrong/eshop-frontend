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
            props.navigation.navigate("CompleteMessage");
            console.log(props.order)
        }, 500);
    }

    const orderProps = props.route.params;
    
    return(
        <ScrollView contentContainerStyle={StyleSheet.container}>
            <View style={styles.titleContainer}>
                     
                { orderProps && typeof orderProps?.order?.order !== 'undefined' ?
                    <View>
                        <Text style={{fontSize:20,fontWeight:"bold"}}>Confirm Order</Text>  
                        <View style={{borderWidth:1, borderColor:"orange"}}>
                            <Text style={styles.title}>배송지:</Text>
                            <View style={{ padding: 8}}>
                                <Text>주소: {orderProps.order.order.shippingAddress1}</Text>
                                <Text>상세주소: {orderProps.order.order.shippingAddress2}</Text>
                                <Text>도시: {orderProps.order.order.city}</Text>
                                <Text>우편번호: {orderProps.order.order.zip}</Text>
                                <Text>국가: {orderProps.order.order.country}</Text>

                                <Text>연락처: {orderProps.order.order.phone}</Text>
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
                        <Button 
                                title={'Place Order'} 
                                onPress={()=>confirmOrder()}/>
                    </View>    
                : 
                    <View>
                        <Text>Shipping information is missing. Please start again.</Text>
                    </View>
                }

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