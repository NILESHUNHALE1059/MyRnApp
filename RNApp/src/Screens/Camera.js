import React, { PureComponent, useState, useEffect, memo, useRef } from 'react';
// import { StyleSheet, Text, View } from 'react-native'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Platform, Alert, Linking, StatusBar, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { checkMultiplePermissions } from "../Utils/Permissions";
import Permissions, { PERMISSIONS } from 'react-native-permissions';
import SampleScreeen from "./SampleScreen";



const Camera = () => {

    let [camOn, setCamOn] = useState(false)

    let [flash, setFlash] = useState('off')
    let [zoom, setZoom] = useState(0)
    let [autoFocus, setAutoFocus] = useState('on')
    let [depth, setDepth] = useState(0)
    let [type, setType] = useState('back')
    let [permission, setPermission] = useState(false)
    let cameraRef = useRef(null)

    useEffect(() => {
        // Permissions.check('photo').then(response => {
        //     // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        //     setPermission(response);
        // });

        console.log("cameraRef", cameraRef);
        checkForPermissions()
    }, []);

    // Requesting for the Microphone permission
    const checkForPermissions = async () => {

        try {
            // Alert.alert("ma ")
            const permissions =
                Platform.OS === 'ios'
                    ? [PERMISSIONS.IOS.MICROPHONE]
                    : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];

            // Call our permission service and check for permissions
            const isPermissionGranted = await checkMultiplePermissions(permissions);
            // Alert.alert("n ", isPermissionGranted.toString())

            if (!isPermissionGranted) {
                // Show an alert in case permission was not granted
                Alert.alert(
                    'Permission Request',
                    'Please allow permission to access the Microphone.',
                    [
                        {
                            text: 'Go to Settings',
                            onPress: () => {
                                Linking.openSettings();
                            },
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false },
                );
            } else {
                // Alert.alert("ma ")
                setPermission(true)

            }
            return isPermissionGranted;
        } catch (err) {
            // Alert.alert("e", e); // TypeError: failed to fetch
        }

    }

    const toggleFlash = () => {
        setFlash(flashModeOrder[flash])
    }
    const zoomOut = () => {
        setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
    }
    const zoomIn = () => {
        setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
    }
    const takePicture = async () => {

        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            console.log(data.uri);
        }
    };
    const allGetFuncs = async () => {
        try {

            const getCameraIds = await cameraRef.current.getCameraIdsAsync();
            const getSupportedRatiosAsync = await cameraRef.current.getSupportedRatiosAsync();


            console.log("allGetFuncs", "getCameraIds", getCameraIds, "getSupportedRatiosAsync", getSupportedRatiosAsync);
        } catch (e) {
            console.log(e);
        }
    };

    const recordVideo = async () => {

        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.recordAsync();
            console.log(data.uri);
        }
    };
    const stopRecording = async () => {

        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.stopRecording();
            // console.log(data.uri);
        }
    };

    const toggleCam = async () => {

        setCamOn((prev) => !prev)
    };
    return (
        <View style={styles.container}>
            {/* <RNCamera
                ref={cameraRef}
                style={styles.preview}
                type={type}
                flashMode={flash}
            /> */}
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            {
                camOn ? (


                    <RNCamera
                        ref={cameraRef}
                        style={styles.preview}
                        type={"back"}

                        // type={RNCamera.Constants.Type.back}
                        // flashMode={RNCamera.Constants.FlashMode.on}
                        flashMode={"on"}
                        // getSupportedRatiosAsync={(e) => console.log("getSupportedRatiosAsync", e)}

                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        //     console.log(barcodes);
                        // }}


                        // focusDepth={0.5}
                        // autoFocus={false}
                        exposure={-1}
                        useNativeZoom
                        zoom={zoom}
                        playSoundOnCapture
                        // cameraViewDimensions={{ width: 0, height: 20 }}

                        onPictureTaken={(e) => console.log("onPictureTaken", e)}

                        captureAudio
                        cameraId={"0"}

                        whiteBalance={RNCamera.Constants.WhiteBalance.sunny}


                    // onStatusChange
                    />
                ) : null
            }
            <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0, justifyContent: "center", backgroundColor: "rgba(100,100,100,0.4)" }}>
                <SampleScreeen></SampleScreeen>

            </View>


            <View style={{ position: "absolute", bottom: 10, justifyContent: "center" }}>
                <ScrollView horizontal contentContainerStyle={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={permission ? takePicture : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={permission ? allGetFuncs : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> getCameraIds </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={permission ? recordVideo : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> recordVideo </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={permission ? stopRecording : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> stop video </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={permission ? toggleCam : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Toggle Cam </Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={permission ? zoomOut : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> zoomOut </Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={permission ? zoomIn : checkForPermissions} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> zoomIn </Text>

                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View >
    );
}

export default memo(Camera)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 5,
        alignSelf: 'center',
        // margin: 20,
    },
});
