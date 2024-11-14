import {clienteService} from "../service/cliente-service.js";

export const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement("tr")
    linhaNovoCliente.dataset.id = id
    linhaNovoCliente.innerHTML = `
        <td class="td" data-td>${nome}</td>
        <td>${email}</td>
        <td>
            <ul class="tabela__botoes-controle">
                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                <li>
                    <button class="botao-simples botao-simples--excluir" type="button">Excluir</button>
                </li>
            </ul>
        </td> `
    return linhaNovoCliente
}

export const tabela = document.querySelector('[data-tabela]')

const render = async () => {
    try {
        const servico = await clienteService.listaClientes()
        servico.forEach(dado => {
            tabela.appendChild(criaNovaLinha(dado.nome, dado.email, dado.id))
        })
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }
}

tabela.addEventListener('click', async (evento) => {
    if (evento.target.className === 'botao-simples botao-simples--excluir') {
        try {
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id)
            linhaCliente.remove()
        }catch (erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }
    }
})

render()