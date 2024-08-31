import api from "../api/api";

class ReceberService {
        
        async getAll(search, page) {
            let query = '';
            if (search?.length > 0) {
                query = `?search=${search}`;
                query += page ? `&${page}` : '';
            } else  {
                query = page ? `?${page}` : '';
            }
        
            return api.get(`/receber/${query}`).then((response) => {
                    return response.data;
                }
            );
        
        }
        
        async get(id) {
            return api.get(`/receber/${id}/`).then((response) => {
                    return response.data
                }
            );
        }
        
        async create(body) {
            return api.post("/receber/", body);
        }
        
        async update(id, body) {
            return api.put(`/receber/${id}/`, body);
        }
        
        async delete(id) {
            return api.delete(`/receber/${id}/`);
        }
}

const receberService = new ReceberService();

export default receberService
