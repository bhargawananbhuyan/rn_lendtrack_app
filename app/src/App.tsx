import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddTransaction from './screens/AddTransaction';
import EditTransaction from './screens/EditTransaction';

import Homepage from './screens/Homepage';
import Landing from './screens/Landing';
import Register from './screens/Register';
import Signin from './screens/Signin';
import TransactionDetails from './screens/TransactionDetails';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'landing_screen'}
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}>
        <Stack.Screen name="landing_screen" component={Landing} />
        <Stack.Screen name="signin_screen" component={Signin} />
        <Stack.Screen name="register_screen" component={Register} />
        <Stack.Screen name="homepage_screen" component={Homepage} />
        <Stack.Screen name="add_txn_screen" component={AddTransaction} />
        <Stack.Screen name="edit_txn_screen" component={EditTransaction} />
        <Stack.Screen
          name="txn_details_screen"
          component={TransactionDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
