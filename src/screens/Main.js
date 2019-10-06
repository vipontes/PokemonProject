import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import PokemonListService from '../services/PokemonList';
import PokemonService from '../services/Pokemon';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonCount: 0,
            nextUrl: null,
            previousUrl: null,
            pokemons: [],
            refreshing: false
        };
    }


    alertItemName = (item) => {
        alert(item.name);
    }

    componentDidMount() {
        this.loadData()
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
                            pokemon.front_shiny = item.sprites.front_shiny;
                            pokemon.back_shiny = item.sprites.back_shiny;

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

    render() {
        const { pokemons } = this.state;

        return (
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
                        style={styles.container}
                        onPress={() => this.alertItemName(item)}>
                        <View style={[styles.itemContainer, { backgroundColor: '#dcdcdc' }]}>
                            <Image source={{ uri: item.front_shiny, cache: 'only-if-cached', }} style={{ height: 120, resizeMode: 'stretch', margin: 5 }} />
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 4,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
});
