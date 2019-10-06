import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import PokemonListService from '../services/PokemonList';
import PokemonService from '../services/Pokemon';
import SplashScreen from './SplashScreen';

export default class MainScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonCount: 0,
            nextUrl: null,
            previousUrl: null,
            pokemons: [],
            refreshing: false,
            isLoading: true
        };
    }

    performTimeConsumingTask = async () => {

        const self = this;
        return new Promise((resolve) =>
            setTimeout(
                () => {
                    self.loadData();
                    resolve('result');
                },
                5000
            )
        );
    }

    async componentDidMount() {
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.setState({ isLoading: false });
        }
    }

    loadData = () => {
        var pokemons = this.state.pokemons;

        PokemonListService.getPokemonList(this.state.nextUrl,
            list => {
                var pokemonData = list.results;
                var nextUrl = list.next;
                var previousUrl = list.previous;

                pokemonData.forEach((value, index) => {

                    var pokemon = {
                        "name": value.name,
                        "url": value.url
                    }

                    PokemonService.getPokemon(
                        pokemon.url,
                        item => {
                            pokemon.front_default = item.sprites.front_default;
                            pokemon.back_default = item.sprites.back_default;
                            pokemon.abilities = item.abilities;
                            pokemon.types = item.types;
                            pokemon.weight = item.weight;

                            pokemons.push(pokemon);

                            if (index == pokemonData.length - 1) {
                                this.setState({
                                    pokemons: pokemons,
                                    nextUrl: nextUrl,
                                    previousUrl: previousUrl,
                                    refreshing: false
                                });
                            }
                        },
                        error => {
                            this.setState({ refreshing: false });
                        });
                });
            },
            error => {
                this.setState({ refreshing: false });
            }
        );
    }

    onRefresh = () => {
        this.setState({
            pokemons: [],
            refreshing: true,
            nextUrl: null,
            previousUrl: null
        });
        this.loadData();
    }

    onMomentumScrollEnd = () => {
        const { pokemonCount, pokemons, nextUrl, previousUrl } = this.state;
        if ((nextUrl == null && previousUrl == null) || nextUrl != null) {
            this.loadData();
        }
    }

    onPokemonPress = (item) => {
        this.props.navigation.navigate('Detail', item)
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
        const { pokemons } = this.state;

        if (this.state.isLoading) {
            return <SplashScreen />;
        }

        return (
            <>
                <View style={styles.mainView}>
                    <Image source={require("../../assets/images/pokemon-text.png")}
                        style={{ height: 34, width: 92 }} />
                </View>
                <FlatGrid
                    itemDimension={150}
                    items={pokemons}
                    style={styles.gridView}
                    refreshing={this.state.refreshing}
                    onMomentumScrollEnd={() => this.onMomentumScrollEnd()}
                    onEndReachedThreshold={0}
                    onRefresh={() => this.onRefresh()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => this.onPokemonPress(item)}>
                            <View style={styles.itemContainer}>
                                <Image style={styles.itemImage} source={this.getImage(item.front_default)} />
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemType}>{this.serializeType(item.types)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        alignItems: 'center',
        backgroundColor: '#ef5351',
        paddingTop: Platform.OS == 'ios' ? 35 : 10,
        paddingBottom: 10
    },
    gridView: {
        backgroundColor: '#ef5351',
        flex: 1,
    },
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
