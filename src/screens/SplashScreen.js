import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native';
import Animated, { Easing } from "react-native-reanimated";

const {
    set,
    cond,
    startClock,
    stopClock,
    clockRunning,
    block,
    timing,
    debug,
    Value,
    Clock,
    divide,
    concat,
    eq,
    add,
    multiply,
    lessThan,
    spring,
    sub,
    defined,
    event,
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 5000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

export default class SplashScreen extends React.Component {


    constructor(props) {
        super(props);
        this.trans = runTiming(new Clock(), 0, 360);
        this.transX = runTiming(new Clock(), -500, 0);
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.box, { transform: [{ translateX: this.transX }] }]}>
                    <Image source={require("../../assets/images/pokemon-text.png")}
                        style={{ height: 136, width: 370 }} />
                </Animated.View>
                <Animated.View
                    style={[
                        { transform: [{ rotate: concat(this.trans, 'deg') }] },
                    ]}>
                    <Image source={require("../../assets/images/pokeball.png")}
                        style={{ height: 200, width: 200 }} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d32b2b',
    },
});