import api from "../api/api";

class ContaService {

  async getContas(search) {
    console.log(search)
    if (search?.length > 0) {
      return api.get(`/contas/?search=${search}`).then((response) => {
        return response.data.results;
      });
    }
    else {
      return api.get("/contas/").then((response) => {
          return response.data.results;
      });
    }
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