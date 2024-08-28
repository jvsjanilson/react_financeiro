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
  
    async get(id) {
      return api.get(`/formapagamentos/${id}/`).then((response) => {
        return response.data
      }
      );
    }
  
    async create(forma) {
      return api.post("/formapagamentos/", forma);
    }
  
    async update(id, forma) {
      return api.put(`/formapagamentos/${id}/`, forma);
    }
  
    async delete(id) {
      return api.delete(`/formapagamentos/${id}/`);
    }
  }

  const formaService = new FormaService();

  export default formaService
  