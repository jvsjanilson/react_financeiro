import api from "../api/api";

class ContatoService {
    
    async getAll(search, page) {
        let query = '';
        if (search?.length > 0) {
            query = `?search=${search}`;
            query += page ? `&${page}` : '';
        } else  {
            query = page ? `?${page}` : '';
        }
      
        return api.get(`/contatos/${query}`).then((response) => {
                return response.data;
            }
        );
     
    }

    async getAllContatos() {
        return api.get(`/contatos/?all=true`).then((response) => {
                return response.data;
            }
        );
     
    }
    
    async get(id) {
        return api.get(`/contatos/${id}/`).then((response) => {
                return response.data
            }
        );
    }
    
    async create(body) {
        return api.post("/contatos/", body);
    }
    
    async update(id, body) {
        return api.put(`/contatos/${id}/`, body);
    }
    
    async delete(id) {
        return api.delete(`/contatos/${id}/`);
    }
}

const contatoService = new ContatoService();

export default contatoService