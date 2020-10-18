import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.0.9:3333/v1',
});
