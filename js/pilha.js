let contadorDePilhas = 0;
const log = document.querySelector(".pilha .log");

const gerarEmojiAleatorio = () => {
    const emojis = ["&#x1F34A;","&#x1F347;","&#x1F35F;","&#x1F363;","&#x1F368;","&#x1F36A;","&#x1F370;","&#x1F36B;","&#x1F369;","&#x1F34C;","&#x1F33D;","&#x1F32D;","&#x1F355;","&#x1F354;","&#x1F9C1;","&#x1F361;"];
    const numeroMinimo = 0;
    const numeroMaximo = emojis.length;
    const numeroAleatorio = Math.floor(Math.random() * (numeroMaximo - numeroMinimo) + numeroMinimo);

    return emojis[numeroAleatorio];
}

class Pilha
{
    constructor(seletor)
    {
        this._estrutura = [];
        this.id = ++contadorDePilhas;
        
        this._containerFigura = document.querySelector(seletor);
        this._botaoAdicionar = document.querySelector(`.pilha ${seletor} + .article__container__botoes .botao_adicionar`);
        this._botaoRemover = document.querySelector(`.pilha ${seletor} + .article__container__botoes .botao_remover`);
        this._inputMaxItens = document.querySelector(`.pilha ${seletor} ~ .input_limitador`);

        this._botaoAdicionar.onclick = () => this.adicionar(gerarEmojiAleatorio());
        this._botaoRemover.onclick = () => this.remover();
        this._inputMaxItens.onchange = () => this.atualizarMaxItens();

        this._maxItens = Number(this._inputMaxItens.value);

        for(let i = 0; i < 5; i++)
        {
            this._botaoAdicionar.click();
        }

        this.imprimirPilha();
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
            this.imprimirMensagemDeLog(`A pilha ${this.id} está cheia! Não é possível adicionar mais itens nela.`);

            return false;
        }
        else
        {
            this._estrutura.push(valor);
            this.imprimirMensagemDeLog("");
            this.imprimirPilha();

            return true;
        }
    }

    remover()
    {
        if(this.isEmpty())
        {
            this.imprimirMensagemDeLog(`A pilha ${this.id} está vazia! Não é possível remover mais itens dela.`);

            return false;
        }
        else
        {
            this._estrutura.pop();
            this.imprimirMensagemDeLog("");
            this.imprimirPilha();

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

    imprimirPilha()
    {
        let pilha = "";
        
        this._estrutura.forEach((elemento) => 
        {
            pilha += `<div class='bloco'>${elemento}</div>`
        })

        this._containerFigura.innerHTML = pilha;
    }

    imprimirMensagemDeLog(mensagem)
    {
        log.innerHTML = mensagem;
    }
}

const pilha1 = new Pilha(".figura1");
const pilha2 = new Pilha(".figura2");

const setaEsquerdaParaDireita = document.querySelector(".left_to_right");
const setaDireitaParaEsquerda = document.querySelector(".right_to_left");

setaEsquerdaParaDireita.onclick = () => {
    const indiceUltimoElemento = pilha1._estrutura.length - 1;

    if(pilha1.isEmpty())
    {
        pilha1.imprimirMensagemDeLog("A pilha 1 está vazia! Não há elementos para mover para pilha 2.");
    }
    else if(pilha2.isFull())
    {
        pilha2.imprimirMensagemDeLog("A pilha 2 está cheia! Não foi possível mover o elemento da pilha 1.")
    }
    else
    {
        pilha2.adicionar(pilha1._estrutura[indiceUltimoElemento]);
        pilha1.remover();
    }
}

setaDireitaParaEsquerda.onclick = () => {
    const indiceUltimoElemento = pilha2._estrutura.length - 1;

    if(pilha2.isEmpty())
    {
        pilha2.imprimirMensagemDeLog("A pilha 2 está vazia! Não há elementos para mover para pilha 1.");
    }
    else if(pilha1.isFull())
    {
        pilha1.imprimirMensagemDeLog("A pilha 1 está cheia! Não foi possível mover o elemento da pilha 2.")
    }
    else
    {
        pilha1.adicionar(pilha2._estrutura[indiceUltimoElemento]);
        pilha2.remover();
    }
}