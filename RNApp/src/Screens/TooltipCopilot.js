import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity, Switch, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

import Ionicons from 'react-native-vector-icons/Ionicons'


import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

var isFirstTime = false
const CustomComponent = ({ copilot }) => (
    <View {...copilot}>
        <Text>Hello world!</Text>
    </View>
);
class TooltipCopilot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // isFirstTime: true
        }

        this.TimeOut = null
    }


    // static propTypes = {
    //     start: PropTypes.func.isRequired,
    //     copilotEvents: PropTypes.shape({
    //         on: PropTypes.func.isRequired,
    //     }).isRequired,
    // };

    state = {
        secondStepActive: true,
    };

    componentDidMount() {


        this.TimeOut = setTimeout(() => {

            this.props.start();
            this.props.copilotEvents.on('stepChange', this.handleStepChange);
        }, 200);

    }

    componentDidUpdate(prevProps, PrevState) {


        console.log("prevProps", prevProps, "========================PrevState", PrevState);
    }

    componentWillUnmount() {
        // Don't forget to disable event handlers to prevent errors
        this.props.copilotEvents.off("stop");
        this.TimeOut.remove()
    }

    handleStepChange = (step) => {
        console.log(`Current step is: ${step.name}`);
    }




    render() {
        return (
            <View style={styles.container}>
                <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
                    <WalkthroughableText style={styles.title}>
                        {/* {'Welcome to the demo of\n"React Native Copilot"'} */}

                        <Text style={{ transform: [{ translateY: 80 }], }}>Welcome to the demo of React Native Copilot</Text>
                    </WalkthroughableText>
                </CopilotStep>
                <View style={styles.middleView}>
                    <CopilotStep active={this.state.secondStepActive} text="Here goes your profile picture!" order={2} name="secondText">
                        <WalkthroughableImage
                            source={{ uri: 'https://img.icons8.com/dusk/70/000000/globe-earth.png' }}
                            style={styles.profilePhoto}
                        />

                        {/* <CustomComponent /> */}
                    </CopilotStep>
                    <View style={styles.activeSwitchContainer}>
                        <Text>Profile photo step activated?</Text>
                        <View style={{ flexGrow: 1 }} />
                        <Switch
                            onValueChange={secondStepActive => this.setState({ secondStepActive })}
                            value={this.state.secondStepActive}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.props.start()}>
                        <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>

                    <CopilotStep text="Here is an item in the corner of the screen." order={3} name="thirdText">
                        <WalkthroughableText style={styles.tabItem}>
                            {/* <Ionicons name="arrow-up" size={40} color="#888" /> */}
                            <Text>nks kj</Text>
                        </WalkthroughableText>
                    </CopilotStep>

                    {/* <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" />
                    <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" />
                    <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" />
                    <Ionicons style={styles.tabItem} name="ios-game-controller-b" size={40} color="#888" /> */}
                </View>
            </View>
        );
    }
}
const MARGIN = 10;
// const WIDTH = Dimensions.get('window').width - (5 * MARGIN);

const WIDTH = Dimensions.get('window').width - (2 * MARGIN);


const style = {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingTop: 5,

    width: WIDTH,
    maxWidth: WIDTH,
    left: MARGIN,



};

const TooltipComponent = ({
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrev,
    handleStop,
    currentStep,
}) => (
    <Text>knjk</Text>
);

const StepNumberComponent = ({
    isFirstStep,
    isLastStep,
    currentStep,
    currentStepNumber,
}) => (
    <Text>{currentStepNumber}</Text>
);


const circleSvgPath = ({ position, canvasSize }) =>
    `M0,0H${canvasSize.x}V${canvasSize.y}H0V0ZM${position.x._value},${position.y._value}Za50 50 0 1 0 100 0 50 50 0 1 0-100 0`;


// const ovalSvgPath = ({ position, canvasSize }) =>
//     `M 10 315
//     L 110 215
//     A 36 60 0 0 1 150.71 170.29
//     L 172.55 152.45
//     A 30 50 -45 0 1 215.1 109.9
//     L 315 10`
export default copilot({
    animated: true, // Can be true or false
    overlay: 'svg', // Can be either view or svg

    tooltipStyle: style,
    arrowColor: '#FF00FF',

    // tooltipComponent: TooltipComponent,
    // stepNumberComponent: StepNumberComponent,
    backdropColor: "rgba(50, 50, 50, 0.5)",

    // svgMaskPath: ovalSvgPath,

    labels: {
        previous: "Back",
        next: "Forward",
        skip: "Skip",
        finish: "Done"
    },
    verticalOffset: isFirstTime ? 1000 : 30
})(TooltipCopilot);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',

    },
    profilePhoto: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginVertical: 20,
    },
    middleView: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabItem: {
        flex: 1,
        textAlign: 'center',
    },
    activeSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
});
