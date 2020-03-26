import axios from 'axios';

const baseUrl = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.VUE_APP_GIPHY_API_KEY}`;
const type = 'gifs';

export default class GiphyService  {

    search(q, offset = 0, limit = 17) {
        const url = `${baseUrl}&type=${type}&q=${q}&offset=${offset}&limit=${limit}`;
        return axios.get(url);
    }

}
