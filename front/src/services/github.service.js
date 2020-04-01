import axios from 'axios';

const baseUrl = `https://api.github.com/repos/ytvnr/gif-of-the-day`;

export default class GithubService {
    getContributors() {
        const url = `${baseUrl}/contributors`;
        return axios.get(url);
    }
}
