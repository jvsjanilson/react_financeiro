import api from "../api/api";

class ContaService {

  async getAll(search, page) {
    let query = '';
    if (search?.length > 0) {
      query = `?search=${search}`;
      query += page ? `&${page}` : '';
    } else 
    {
      query = page ? `?${page}` : '';
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

  async create(body) {
    return api.post("/contas/", body);
  }

  async update(id, body) {
    return api.put(`/contas/${id}/`, body);
  }

  async delete(id) {
    return api.delete(`/contas/${id}/`);
  }
}

const contaService = new ContaService();

export default contaService