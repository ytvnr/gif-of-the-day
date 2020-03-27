import axios from 'axios';

const baseUrlSearch = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.VUE_APP_GIPHY_API_KEY}`;
const baseUrlRandom = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.VUE_APP_GIPHY_API_KEY}`;
const type = 'gifs';

export default class GiphyService  {

    search(q, offset = 0, limit = 17) {
        const url = `${baseUrlSearch}&type=${type}&q=${q}&offset=${offset}&limit=${limit}`;
        return axios.get(url);
    }

    randomByTag(tag) {
        const url = `${baseUrlRandom}&tag=${tag}`;
        return axios.get(url);
    }

}
