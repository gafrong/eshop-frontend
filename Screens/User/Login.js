import React, {useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {

    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // everytime context.stateUser.isAuthenticated changes useEffect will be triggered
    useEffect(() => {
        if(context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("UserProfile")
        }
    }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill in your credentials")
        } else {
            loginUser(user, context.dispatch)
        }
    }

    return(
        <FormContainer title={"Login"}>
            <Input
                placeholder={"Enter email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />
            <Input
                placeholder={"Enter password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                <Button title="login" onPress={() => handleSubmit()}/>
            </View>
            <View style={[{marginTop:40}, styles.buttonGroup]}>
                <Text style={styles.middleText}>Don't have an account yet?</Text>
                <Button title="Register" onPress={() => props.navigation.navigate("Register")}/>
            </View>
        </FormContainer>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
    },
  });

export default Login;