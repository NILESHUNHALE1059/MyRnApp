import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const Main = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: "space-evenly" }}>
            <Button title="Text Animation" onPress={() => navigation.navigate("TextAnimation")} />
            <Button title="Floating Video" onPress={() => navigation.navigate("FloatingVideoC")} />

            <Button title="YT Video IFrame" onPress={() => navigation.navigate("YoutubeIframe")} />
            <Button title="Camera" onPress={() => navigation.navigate("Camera")} />

            <Button title="ListScreen" onPress={() => navigation.navigate("ListScreen")} />

            <Button title="TooltipCopilot" onPress={() => navigation.navigate("TooltipCopilot")} />

            <Button title="Front" onPress={() => navigation.navigate("Front")} />

        </View>
    )
}



export default Main

const styles = StyleSheet.create({})
