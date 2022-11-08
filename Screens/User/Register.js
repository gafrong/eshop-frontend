import React, {useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const Register = (props) => {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const register = () => {
        if (email === '' || name === '' || phone === '' || password === ''){
            setError("Please fill in the form")
        }

        // collect the information on onchange method from the inputs
        let user = {
            name:name,
            email:email,
            password:password,
            phone,phone,
            isAdmin:false
        }

        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if(res.statue==200){
                    setTimeout(()=> {
                        props.navigation.navigate("Login");
                    }, 500)
                }
            })
            .catch((error) => {
                
            })
    }

    return(
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Register"}>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text)=>setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text)=>setName(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numerica"}
                    onChangeText={(text)=>setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View>
                    <Button title={"Register"} 
                        onPress={() => register()}
                    />
                </View>
                <View>
                    <Button title={"Back to login"} onPress={()=> props.navigation.navigate("Login")} />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
});

export default Register;