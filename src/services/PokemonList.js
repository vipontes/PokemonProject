import axios from 'axios';
import * as environment from '../shared/environment';

const PokemonListService = {
    getPokemonList: function (nextUrl, result, error) {
        var url = environment.api_url + 'pokemon';

        if ( nextUrl != null) {
            url = nextUrl;
        }

        axios.get(url)
            .then(function (response) {
                result(response.data);
            })
            .catch(function (response) {
                error(response);
            });
    }
};
export default PokemonListService;
