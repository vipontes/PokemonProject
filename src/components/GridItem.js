import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


export default class GridItem extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onItemPress(this.props.pokemonData);
    }

    getImage = (image) => {
        return image != null ?
            { uri: image } :
            require("../../assets/images/pokeball.png");
    }

    serializeType = (types) => {

        var serialized = '';
        if (types != null) {
            types.forEach((value, index) => {

                if (serialized.length > 0) {
                    serialized += '/';
                }
                serialized += value.type.name;
            });
        }

        return serialized;
    }

    render() {
        const { pokemonData, index } = this.props;

        return (
            <TouchableOpacity onPress={this.handleClick}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={this.getImage(pokemonData.front_default)} />
                    <Text style={styles.itemName}>{pokemonData.name}</Text>
                    <Text style={styles.itemType}>{this.serializeType(pokemonData.types)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    itemImage: {
        alignItems: 'center',
        height: 100,
        width: 100,
        margin: 5
    },
    itemContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        justifyContent: 'flex-end',
        borderRadius: 4,
        padding: 10,
        height: 150,
    },
    itemName: {
        textTransform: 'capitalize',
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    itemType: {
        textTransform: 'capitalize',
        fontWeight: '600',
        fontSize: 14,
        color: '#868686',
    },
});
