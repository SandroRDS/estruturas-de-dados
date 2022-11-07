const logFila = document.querySelector(".fila .log");

const gerarEmojiAleatorioFila = () => {
    const emojis = ["🧑🏻","🧑🏼","🧑🏽","🧑🏾","🧑🏿","👩🏻","👩🏼","👩🏽","👩🏾","👩🏿"];
    const numeroMinimo = 0;
    const numeroMaximo = emojis.length;
    const numeroAleatorio = Math.floor(Math.random() * (numeroMaximo - numeroMinimo) + numeroMinimo);

    return emojis[numeroAleatorio];
}

class Fila
{
    constructor()
    {
        this._estrutura = [];

        this._containerFigura = document.querySelector(".fila .article__figura");
        this._botaoAdicionar = document.querySelector(".fila .botao_adicionar");
        this._botaoRemover = document.querySelector(".fila .botao_remover");
        this._inputMaxItens = document.querySelector(".fila .input_limitador");

        this._botaoAdicionar.onclick = () => this.adicionar(gerarEmojiAleatorioFila());
        this._botaoRemover.onclick = () => this.remover();
        this._inputMaxItens.onchange = () => this.atualizarMaxItens();

        for(let i = 0; i < 5; i++)
        {
            this._botaoAdicionar.click();
        }

        this._maxItens = Number(this._inputMaxItens.value);
        
        this.imprimirFila();
    }

    isFull()
    {
        return this._estrutura.length === this._maxItens;
    }

    isEmpty()
    {
        return this._estrutura.length === 0;
    }

    adicionar(valor)
    {
        if(this.isFull())
        {
            this.imprimirMensagemDeLog(`A fila está cheia! Não é possível adicionar mais itens nela.`);
            return false;
        }
        else
        {
            this._estrutura.push(valor);
            this.imprimirMensagemDeLog("");
            this.imprimirFila();
            return true;
        }
    }

    remover()
    {
        if(this.isEmpty())
        {
            this.imprimirMensagemDeLog(`A fila está vazia! Não é possível remover mais itens dela.`);
            return false;
        }
        else
        {
            this._estrutura.shift();
            this.imprimirMensagemDeLog("");
            this.imprimirFila();
            return true;
        }
    }

    atualizarMaxItens()
    {
        const novoValor = Number(this._inputMaxItens.value);

        if(this.validarInputMaxItens())
        {
            this._maxItens = novoValor;
            this.validarTamanhoDaEstrutura();
        }
    }

    validarInputMaxItens()
    {
        const valor = this._inputMaxItens.value != "" ? Number(this._inputMaxItens.value) : null;

        if(valor === null)
        {
            return false;
        }
        else if(valor <= 1)
        {
            this._inputMaxItens.value = 2;
            return false;
        }
        else if(valor > 15)
        {
            this._inputMaxItens.value = 15;
            return false;
        }
        else
        {
            return true;
        }
    }

    validarTamanhoDaEstrutura()
    {
        if(this._maxItens < this._estrutura.length)
        {
            this.remover();
            this.validarTamanhoDaEstrutura();
        }
    }

    imprimirFila()
    {
        let fila = "";
        
        this._estrutura.forEach((elemento) => 
        {
            fila += `<div class='bloco'>${elemento}</div>`
        })

        this._containerFigura.innerHTML = fila;
    }

    imprimirMensagemDeLog(mensagem)
    {
        logFila.innerHTML = mensagem;
    }
}

const fila = new Fila();