import api from "../api/api";


class FluxoCaixaService {
    async getFluxoCaixa(data_inicial, data_final) {
        return api.get('/fluxocaixa/?data_inicial=' + data_inicial + '&data_final=' + data_final);
    }
 }


 const fluxoCaixaService = new FluxoCaixaService();

export default fluxoCaixaService