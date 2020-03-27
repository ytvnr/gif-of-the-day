import axios from 'axios';

const baseUrl = `https://api.giphy.com/v1/gifs`;
const type = 'gifs';

export default class GiphyService  {

    search(q, offset = 0, limit = 17) {
        const url = this.getGiphyUrl(`/search?type=${type}&q=${q}&offset=${offset}&limit=${limit}`);
        return axios.get(url);
    }

    randomByTag(tag) {
        const url = this.getGiphyUrl(`/random?tag=${tag}`);
        return axios.get(url);
    }

    getGiphyUrl(request) {
        return `${baseUrl}${request}&api_key=${process.env.VUE_APP_GIPHY_API_KEY}`
    }

}
