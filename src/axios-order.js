import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-builder.firebaseio.com/'
})

export default instance;