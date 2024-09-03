import api from "../api/api";

class PagarService {
            
        async getAll(search, page) {
            let query = '';
            if (search?.length > 0) {
                query = `?search=${search}`;
                query += page ? `&${page}` : '';
            } else  {
                query = page ? `?${page}` : '';
            }
        
            return api.get(`/pagars/${query}`).then((response) => {
                    return response.data;
                }
            );
        
        }
        
        async get(id) {
            return api.get(`/pagars/${id}/`).then((response) => {
                    return response.data
                }
            );
        }
        
        async create(body) {
            return api.post("/pagars/", body);
        }
        
        async update(id, body) {
            return api.put(`/pagars/${id}/`, body);
        }
        
        async delete(id) {
            return api.delete(`/pagars/${id}/`);
        }
    
        async baixar(id, body) {
            return api.post(`/pagars/${id}/baixar/`, body);
        }
    
        async estornar(id, body) {
            return api.post(`/pagars/${id}/estornar/`, body);
        }
    
    }

const pagarService = new PagarService();

export default pagarService