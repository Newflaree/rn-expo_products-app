import axios from 'axios';

// TODO: Conectar mediante envs vars, Android o iOS

const productsApi = axios.create({
  baseURL: 'localhost:3000/api'
});

// TODO: Interceptores

export { productsApi }
