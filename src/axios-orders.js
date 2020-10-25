import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-project-1501089910752.firebaseio.com/'
})

export default instance;