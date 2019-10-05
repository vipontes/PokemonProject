import axios from 'axios';
import * as environment from '../shared/environment';

const PokemonListService = {
    getPokemonList: function (result, error) {
        axios
            .get(environment.api_url + 'pokemon')
            .then(function (response) {
                result(response.data);
            })
            .catch(function (response) {
                error(response);
            });
    }
};
export default PokemonListService;
