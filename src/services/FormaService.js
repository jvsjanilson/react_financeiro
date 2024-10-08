import api from "../api/api";

class FormaService {
  
    async getAll(search, page) {
      
      let query = '';
      if (search?.length > 0) {
        query = `?search=${search}`;
        if (page) {
          query += `&${page}`;
        }
      } else 
      {
        if (page) {
          query = `?${page}`;
        }
      }
    
        return api.get(`/formapagamentos/${query}`).then((response) => {
          
          return response.data;
        });
      
    }
  
    async getAllFormaPagamentos() {
      return api.get(`/formapagamentos/?all=true`).then((response) => {
        return response.data;
      });
    }

    async get(id) {
      return api.get(`/formapagamentos/${id}/`).then((response) => {
        return response.data
      }
      );
    }
  
    async create(body) {
      return api.post("/formapagamentos/", body);
    }
  
    async update(id, body) {
      return api.put(`/formapagamentos/${id}/`, body);
    }
  
    async delete(id) {
      return api.delete(`/formapagamentos/${id}/`);
    }
  }

  const formaService = new FormaService();

  export default formaService
  