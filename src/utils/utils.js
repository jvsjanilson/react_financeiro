function formatDate(dataString) {
    if (!dataString) return "";
    
    const date = new Date(dataString);

    if (isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
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