import React, { useState, useEffect, useRef } from 'react';

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
import MaskedView from '@react-native-community/masked-view';

const TextAnimation = () => {

    const isDarkMode = useColorScheme() === 'dark';

    const [fontsize, setfontsize] = useState(100);
    const [colorsArr, setcolorsArr] = useState([
        '#324376',
        '#F5DD90',
        '#F76C5E',
        '#e1e1e1',
        '#11ff11',
        '#111111',
        '#1e3e2e',
        '#F5DD90',
    ]);
    const [viewFlex, setViewFlex] = useState(
        fontsize * (colorsArr?.length / colorsArr?.length - 0.28),
    );

    // const [bounceAnim, setbounceAnim] = useState(0)
    const bounceAnim = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0
    const twirl = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    // const [twirl, settwirl] = useState(new Animated.Value(0))
    let animate = () => {
        Animated.timing(
            bounceAnim,
            {

                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }
        ).start(() => {

            Animated.timing(
                bounceAnim,
                {

                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                }
            ).start(() => {
                Animated.timing(twirl, {
                    // and twirl
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }).start(() => {


                    Animated.loop(
                        Animated.timing(twirl, {
                            // and twirl
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                            easing: Easing.linear,
                        }), {
                        iterations: 4
                    }
                    ).start(() => {
                        animate()
                    })
                })
            });
        });

    }


    const backgroundStyle = {
        backgroundColor: 'white',
    };

    // Function to shuffle the array content
    useEffect(() => {
        const intervalId = setInterval(() => {
            shuffleArray();
        }, 400);
        return () => clearInterval(intervalId); //This is important
    }, [colorsArr, shuffleArray]);


    const shuffleArray = () => {
        let array = Array.from(colorsArr);

        for (var i = array.length - 1; i > 0; i--) {
            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        // let newArr = array.sort(() => Math.random() - 0.5);
        console.log('arrayarray', array);
        setcolorsArr(array);
    };
    const widthByFontSize = () => { };
    const spin = twirl.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    return (
        <>

            <MaskedView
                // key={Math.random()}
                style={{ flex: 1, flexDirection: 'row', backgroundColor: "white" }}
                maskElement={
                    <Animated.View
                        style={{
                            // Transparent background because mask is based off alpha channel.
                            backgroundColor: 'transparent',
                            flex: 1,

                            alignItems: 'center',
                            opacity: bounceAnim,

                        }}>
                        <Animated.Text
                            style={{
                                fontSize: fontsize,
                                color: 'black',
                                fontWeight: 'bold',
                                transform: [{
                                    rotate: spin
                                },
                                    // {
                                    //   scale: bounceAnim.interpolate({
                                    //     inputRange: [0, 1],
                                    //     outputRange: [20, 30],
                                    //     extrapolate: 'clamp'

                                    //   })
                                    // }
                                ]
                            }}>
                            L O K I
                        </Animated.Text>
                    </Animated.View>
                }>
                {/* Shows behind the mask, you can put anything here, such as an image */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    {colorsArr.map((color, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flex: 1,
                                    maxWidth: viewFlex,
                                    height: '100%',
                                    backgroundColor: color,
                                }}
                            />
                        );
                    })}
                </View>
            </MaskedView>

            <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={() => {
                animate()
            }}>
                <Text>JNnjnwjdn</Text>
            </TouchableOpacity>
        </>
    );
}

export default TextAnimation

const styles = StyleSheet.create({})
