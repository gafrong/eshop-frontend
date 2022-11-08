import React, { useReducer, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import AsynStorage from '@react-native-community/async-storage';

import authReducer from '../reducers/Auth.reducer';
import { setCurrentUser } from '../actions/Auth.actions';
import AuthGlobal from './AuthGlobal';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if(AsynStorage.jwt) {
            const decoded = AsynStorage.jwt ? AsynStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false)
    }, [])

    if (!showChild){
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;