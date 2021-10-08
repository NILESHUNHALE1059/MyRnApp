import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ToastAndroid,
    Text,
    Button,
} from 'react-native';
import FloatingVideo from 'rn-floating-video-widget';

export default class FloatingVideoC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            floating: false,
            granted: false,
        };
        // The Data Object
        this.data = {
            video: {
                url:
                    'http://techslides.com/demos/sample-videos/small.mp4',
            },
            videos: [
                {
                    url:
                        'http://techslides.com/demos/sample-videos/small.mp4',
                }, {
                    url:
                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                }, {
                    url:
                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                },], seek: 10,
            index: 0,
        };

    }


    componentDidMount() {

        // Add event listeners

        FloatingVideo.onClose(data => console.log(data));
        FloatingVideo.onOpen(data => console.log(data));
        FloatingVideo.onPlay(data => console.log(data));
        FloatingVideo.onPause(data => console.log(data));
        FloatingVideo.onNext(data => console.log(data));
        FloatingVideo.onPrev(data => console.log(data));
        FloatingVideo.onError(data => console.log(data));
    }


    enterPipMode() {

        FloatingVideo.requestOverlayPermission()
            .then(() => {
                this.setState({
                    floating: true,
                    granted: true,
                });
                FloatingVideo.open(this.data);
            }).catch(e => {
                ToastAndroid.show(
                    'Please grant draw over other apps permission' + JSON.stringify(e),
                    800,
                );
            });
    }

    componentWillUnmount() {
        FloatingVideo.removeAllListeners();
    }

    render() {
        const floating = this.state.floating;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.start}
                    onPress={() => {
                        this.enterPipMode();
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 20,
                        }}>
                        START
                    </Text>
                </TouchableOpacity>

                <Button title={"iframe"} onPress={() => this.props.navigation.navigate("YoutubeIframe")} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    }, welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    start: {
        width: '90%',
        alignSelf: 'center',
        padding: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderRadius: 5,
    },
    button: {
        alignSelf: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: 'red',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        borderRadius: 5,
    },
});
