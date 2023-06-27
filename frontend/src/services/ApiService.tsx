import axios from "axios";

const root = "http://localhost:3001/";
const ApiService = {
    get: (path: string, params: any | undefined = undefined) => {
        return new Promise((resolve, reject) => {
            axios.get(root + path, params)
                .then((resp) => resolve(resp.data))
                .catch((err) => console.error(err));
        })
    }
}
export default ApiService;