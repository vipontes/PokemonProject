import axios from 'axios';

const PokemonService = {
    getPokemon: function (url, result, error) {
        axios
            .get(url)
            .then(function (response) {
                result(response.data);
            })
            .catch(function (response) {
                error(response);
            });
    }
};
export default PokemonService;
