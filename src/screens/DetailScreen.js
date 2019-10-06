import React, { Component } from 'react';
import {
    Container,
    Navbar,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

export default class DetailScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonData: {},
            imageFront: true
        };
    }

    componentDidMount() {
        const params = this.props.navigation.state.params;
        this.setState({ pokemonData: params });
    }

    getImage = (pokemonData) => {
        const { imageFront } = this.state;

        if (imageFront) {
            return pokemonData.front_default != null ?
                { uri: pokemonData.front_default } :
                require("../../assets/images/pokeball.png");
        } else {
            return pokemonData.back_default != null ?
                { uri: pokemonData.back_default } :
                require("../../assets/images/pokeball.png");
        }
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

    serializeAbility = (abilities) => {

        var serialized = '';

        if (abilities != null) {
            abilities.forEach((value, index) => {

                if (serialized.length > 0) {
                    serialized += '/';
                }

                serialized += value.ability.name;
            });
        }

        return serialized;
    }

    onImagePress = () => {
        var imageFront = !this.state.imageFront;
        this.setState({ imageFront: imageFront });
    }

    render() {
        const { pokemonData } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={() => this.onImagePress()}>
                                <Image style={styles.avatar}
                                    source={this.getImage(pokemonData)} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{pokemonData.name}</Text>
                        </View>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.infoContent}>
                                <Text style={styles.caption}>Type</Text>
                                <Text style={styles.info}>{this.serializeType(pokemonData.types)}</Text>

                                <Text style={styles.caption}>Ability</Text>
                                <Text style={styles.info}>{this.serializeAbility(pokemonData.abilities)}</Text>

                                <Text style={styles.caption}>Weight</Text>
                                <Text style={styles.info}>{pokemonData.weight}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: "#ef5351",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: '#dcdcdc',
        marginBottom: 10,
        backgroundColor: '#ffffff'
    },
    name: {
        textTransform: 'capitalize',
        fontSize: 22,
        color: "#ffffff",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#ffffff",
        height: 500,
        alignItems: 'center',
        marginStart: 18,
        marginEnd: 18
    },
    item: {
        flexDirection: 'row',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    caption: {
        textTransform: 'uppercase',
        fontSize: 16,
        marginTop: 20,
        color: "#868686",
    },
    info: {
        fontSize: 18,
        marginTop: 10,
        color: "#000000",
    }
});
