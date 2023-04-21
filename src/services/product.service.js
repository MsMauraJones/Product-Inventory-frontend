import axios from "axios";
import authHeader from "./auth-header";

const API_URL = 'http://localhost:8080/api/test/';

// how would I establish the draft status id and populate throughout app?
class ProductService{
    getPublicContent(){
        return axios.get(API_URL + 'all-products/643f112902c1d70ea71aa243');
    }

    getProductsDraft(){
        return axios.get(API_URL + 'all-products-draft', { headers: authHeader()});
    }

}

export default new ProductService();