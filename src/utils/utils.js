import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function formatDate(dataString) {
    if (!dataString) return "";
    
    const date = parseISO(dataString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });    
   
}

function formatMoeda (valor, decimal = 2)  {
    return parseFloat(valor.toString()).toLocaleString('pt-BR', 
        {
            currency: 'BRL', 
            minimumFractionDigits: decimal,
        }
    )
}


export { formatDate, formatMoeda };