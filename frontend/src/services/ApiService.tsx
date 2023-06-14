import axios from "axios";

const root = "http://localhost:3001/v1/";
const ApiService = {
    get: (path: string) => {
        return new Promise((resolve, reject) => {
            axios.get(root + path)
                .then((resp) => resolve(resp))
                .catch((err) => console.error(err));
        })
    }
}
export default ApiService;