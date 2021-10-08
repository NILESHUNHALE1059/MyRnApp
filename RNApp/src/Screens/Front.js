import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { getDummyData } from "../Utils/Controller"

const Front = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {
        setDummyData()
    }, []);
    const setDummyData = async () => {

        let dummyData = await getDummyData()
        if (dummyData) {
            setData(dummyData)
            setLoading(false)
        }
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <Image source={{ uri: item.picture }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.title} {item.firstName} {item.lastName}</Text>
                            {/* <Text style={styles.mblTxt}>Mobile</Text> */}
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}></Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (

        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <Text>Loading...</Text> :
                (<View style={{ flex: 1 }} >
                    <FlatList
                        //   extraData={}
                        data={data.data}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        renderItem={renderItem} />
                </View>
                )}
        </View>
    );
};

export default Front

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
});
