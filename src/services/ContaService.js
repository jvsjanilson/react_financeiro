import api from "../api/api";

class ContaService {

  async getContas(search, page) {
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
  
      return api.get(`/contas/${query}`).then((response) => {
        
        return response.data;
      });
   
  }

  async getConta(id) {
    return api.get(`/contas/${id}/`).then((response) => {
      return response.data
    }
    );
  }

  async createConta(conta) {
    return api.post("/contas/", conta);
  }

  async updateConta(id, conta) {
    return api.put(`/contas/${id}/`, conta);
  }

  async deleteConta(id) {
    return api.delete(`/contas/${id}/`);
  }
}

const contaService = new ContaService();

export default contaService