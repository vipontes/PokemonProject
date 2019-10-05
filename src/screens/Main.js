import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import PokemonListService from '../services/PokemonList';
import PokemonService from '../services/Pokemon';

export default class Main extends Component {

    state = {
        pokemons: []
    };

    alertItemName = (item) => {
        alert(item.name);
    }

    componentDidMount() {
        var pokemons = this.state.pokemons;

        PokemonListService.getPokemonList(
            list => {
                var pokemonData = list.results;

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
                            this.setState({ pokemons: pokemons });
                        },
                        error => {
                            //console.log(error);

                        });
                });
            },
            error => {

            }
        );
    }

    render() {
        var pokemons = this.state.pokemons;

        return (
            <FlatGrid
                itemDimension={150}
                items={pokemons}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.container}
                        onPress={() => this.alertItemName(item)}>
                        <View style={[styles.itemContainer, { backgroundColor: '#dcdcdc' }]}>
                            <Image source={{ uri: item.front_shiny}} style = {{height: 120, resizeMode : 'stretch', margin: 5 }} />
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
