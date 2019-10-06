import React, { Component } from 'react';
import { Container, Navbar, StyleSheet, View } from 'react-native';

export default class DetailScreen extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.mainView}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#ff0000',
    },
});
