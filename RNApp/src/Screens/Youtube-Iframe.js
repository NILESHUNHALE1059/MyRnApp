import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function YoutubeIframe({ navigation }) {
    const [playing, setPlaying] = useState(false);

    const [currentTime, setcurrentTime] = useState(0);

    const [isMute, setMute] = useState(false);

    const Videoref = useRef(null);

    const onStateChange = useCallback((state) => {
        console.log('-------------ref-----------', Videoref);

        console.log('-------------state-----------', state);
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
        if (state !== 'playing') {
            setPlaying(false);
        }
    }, []);

    const seekBackAndForth = (control) => {
        console.log('currentTime');

        Videoref.current?.getCurrentTime().then((currentTime) => {
            control === 'forward'
                ? Videoref.current?.seekTo(currentTime + 15, true)
                : Videoref.current?.seekTo(currentTime - 15, true);
        });
    };

    const muteVideo = () => setMute(!isMute);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    // const togglePlaying = () => {

    //     setPlaying((prev) => !prev);

    // };

    return (
        <View>
            <YoutubePlayer
                ref={Videoref}
                height={300}
                play={playing}
                // videoId={"_cGqBreD2rw"}
                playList={['_cGqBreD2rw', 'QRt7LjqJ45k', 'fHsa9DqmId8']}
                playListStartIndex={2}
                // https://www.youtube.com/watch?v=_cGqBreD2rw
                onChangeState={onStateChange}
                mute={isMute}
                volume={100}
                playbackRate={1.2}
                // webViewStyle={{ borderColor: "red", borderWidth: 2, color: "red", backgroundColor: "red", maxHeight: 250 }}

                forceAndroidAutoplay={true}
                // allowWebViewZoom={true}
                contentScale={0.82}
            />
            <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
            <Button
                title={'go to floating video'}
                onPress={() => navigation.navigate('FloatingVideoC')}
            />

            <Button
                title="+"
                onPress={() => {
                    // Videoref.current?.getCurrentTime().then(
                    //     currentTime => {

                    //         console.log({ currentTime })
                    //         setcurrentTime(currentTime)
                    //     }
                    // );

                    // Videoref.current?.getDuration().then(
                    //     getDuration => console.log({ getDuration })
                    // );
                    // Videoref.current?.seekTo(currentTime + 30, true)
                    seekBackAndForth('forward');
                }}
            />
            <Button
                title="-"
                onPress={() => {
                    seekBackAndForth('rewind');
                }}
            />
        </View>
    );
}
