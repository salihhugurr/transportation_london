import React from 'react';
import {Provider} from "react-redux";
import {store,persistor} from "./src/redux/store";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PersistGate} from "redux-persist/integration/react";
import Router from "./Router";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router/>
            </PersistGate>
        </Provider>
    );
};

export default App;
