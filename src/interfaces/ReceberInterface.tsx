export interface iReceber {
    id: number;
    documento: string;
    data_emissao: string;
    data_vencimento: string;
    data_pagamento: string;
    valor: number;
    status: string;
    observacao: string;
    contato: number;
    conta: number;
    formapagamento: number;
    ativo: boolean;
}