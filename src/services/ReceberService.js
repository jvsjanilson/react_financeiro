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
    
        return api.get(`/recebers/${query}`).then((response) => {
                return response.data;
            }
        );
    
    }
    
    async get(id) {
        return api.get(`/recebers/${id}/`).then((response) => {
                return response.data
            }
        );
    }
    
    async create(body) {
        return api.post("/recebers/", body);
    }
    
    async update(id, body) {
        return api.put(`/recebers/${id}/`, body);
    }
    
    async delete(id) {
        return api.delete(`/recebers/${id}/`);
    }

    async baixar(id, body) {
        return api.post(`/recebers/${id}/baixar/`, body);
    }

    async estornar(id, body) {
        return api.post(`/recebers/${id}/estornar/`, body);
    }

}

const receberService = new ReceberService();

export default receberService
