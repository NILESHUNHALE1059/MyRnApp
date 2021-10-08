import React, { useState, useEffect, useRef } from 'react';
// import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

import Main from './src/Screens/Main';


import TextAnimation from './src/Screens/TextAnimation';

import FloatingVideoC from './src/Screens/FloatingVideo';
import YoutubeIframe from './src/Screens/Youtube-Iframe';


import Camera from './src/Screens/Camera';

import ListScreen from './src/Screens/SharedTransitionfrom';
import DetailScreen from './src/Screens/ShareTransTo';

import TooltipCopilot from './src/Screens/TooltipCopilot';

import Front from './src/Screens/Front';




import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SharedElement,
  createSharedElementStackNavigator,
} from 'react-navigation-shared-element';

// const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

const Stack = createSharedElementStackNavigator();


// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';



const App = ({ navigation }) => {



  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">

        <Stack.Screen name="Main" component={Main} options={{ headerTitle: "Marvel", }} />


        <Stack.Screen name="TextAnimation" component={TextAnimation} options={{ headerTitle: "Marvel", }} />
        <Stack.Screen name="YoutubeIframe" component={YoutubeIframe} options={{ headerTitle: "Marvel", }} />

        <Stack.Screen name="FloatingVideoC" component={FloatingVideoC} options={{ headerTitle: "Marvel", }} />

        <Stack.Screen name="Camera" component={Camera} options={{ headerTitle: "Marvel", }} />


        {/* Transition */}

        <Stack.Screen name="ListScreen" component={ListScreen}
        />

        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          sharedElements={(route, otherRoute, showing) => {
            return [{
              id: route.params.post.id,
              animation: "fade-in"
              // resize: "stretch",
              // align: "right-top",

            }];
          }}
        />


        <Stack.Screen name="TooltipCopilot" component={TooltipCopilot} />

        <Stack.Screen name="Front" component={Front} />

      </Stack.Navigator>
    </NavigationContainer>

  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
