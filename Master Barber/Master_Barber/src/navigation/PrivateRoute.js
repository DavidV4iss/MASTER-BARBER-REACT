import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { isAuthenticated } from '../utils/Auth';

const PrivateRoute = ({ children }) => {
    const [authStatus, setAuthStatus] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setAuthStatus(authenticated);
        };

        checkAuth();
    }, []);

    if (authStatus === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!authStatus) {
        return (
            <View style={styles.container}>
                <Text>Redirigiendo al login...</Text>
            </View>
        );
    }

    return children;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PrivateRoute;