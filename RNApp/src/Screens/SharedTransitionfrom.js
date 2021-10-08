import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    Button
} from 'react-native';

// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
import {
    SharedElement,
    createSharedElementStackNavigator,
} from 'react-navigation-shared-element';


// import {
//     SharedElement,
//     // createSharedElementStackNavigator,
// } from 'react-native-shared-element';

import POSTS from '../Utils/SampleDatas';
// import Button from './Button';
// import Icon from './Icon';

const SPACING = 15;
const POST_GUTTER_WIDTH = 2;




const ListScreen = ({ navigation }) => {
    const dimensions = useWindowDimensions();
    const imageWidth = dimensions.width / 2 - POST_GUTTER_WIDTH;
    console.log("POSTS", POSTS);
    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.wrapper}>
                {/* <Text style={styles.listHeader}>Marketplace</Text> */}

                <View style={styles.posts}>
                    {POSTS?.map((post, index) => (
                        <Pressable
                            key={post.id}
                            onPress={() =>
                                navigation.push('DetailScreen', {
                                    post,
                                })
                            }
                            style={{
                                width: imageWidth,
                            }}
                        >
                            <SharedElement id={post.id}>
                                <Image

                                    resizeMode="stretch"
                                    source={{ uri: post.image }}
                                    style={{
                                        height: 140,
                                        width: imageWidth,
                                        marginRight:
                                            index % 2 === 1 ? 0 : POST_GUTTER_WIDTH,
                                        marginLeft:
                                            index % 2 === 1 ? POST_GUTTER_WIDTH : 0,
                                    }}
                                />
                            </SharedElement>

                            <View style={styles.postTexts}>
                                <Text numberOfLines={1} style={styles.postHeader}>
                                    €{post.price} · {post.title}
                                </Text>

                                <Text
                                    numberOfLines={1}
                                    style={styles.postDescription}
                                >
                                    {post.description}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    listHeader: {
        fontSize: 28,
        fontWeight: '800',
        margin: SPACING,
    },
    posts: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    postTexts: {
        margin: 10,
        marginBottom: 15,
    },
    postHeader: {
        fontWeight: '600',
    },
    postDescription: {
        color: 'gray',
    },
    postImage: {
        height: 300,
        width: '100%',
    },
    postDetails: {
        paddingVertical: 10,
        paddingHorizontal: SPACING,
    },
    postTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    postPrice: {
        fontSize: 24,
    },
    postContactButton: {
        marginVertical: SPACING,
    },
});