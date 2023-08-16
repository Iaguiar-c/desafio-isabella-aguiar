class CaixaDaLanchonete {

    //cardapio da lanchonete
    //atenção: itens como principais 'cafe' e 'sanduiche'
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        
        const pagamentosValidos = ['debito', 'credito', 'dinheiro']; //formas de pagamento aceitas

        if (!pagamentosValidos.includes(formaDePagamento)) { //verificando se o metodo dado é ou não valido
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) { //vendo se tem itens
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = 0;
        let cafeQuantidade = 0;
        let principais = new Set();

        for (const item of itens) {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo] || isNaN(quantidade) || quantidade <= 0) {
                if (quantidade === '0') {
                    return "Quantidade inválida!"; // caso quantidade seja 0
                } else {
                    return "Item inválido!"; //caso item não exista
                }
            }
            if (codigo === 'cafe') {
                principais.add('cafe');
                
            } else if (codigo === 'chantily' && !principais.has('cafe')) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (codigo === 'sanduiche') {
                principais.add('sanduiche');
            } else if (codigo === 'queijo' && !principais.has('sanduiche')) {
                return "Item extra não pode ser pedido sem o principal";
            }

        
            valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplica desconto de 5%
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplica acréscimo de 3%
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`; //essa ultima parte é para trocar 9.00 por 9,00 e afins
    }
}

export { CaixaDaLanchonete };

