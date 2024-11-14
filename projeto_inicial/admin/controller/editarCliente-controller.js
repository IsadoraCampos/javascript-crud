import {clienteService} from "../service/cliente-service.js";

const pegaURL = new URL(window.location)

const id = pegaURL.searchParams.get('id')

const form = document.querySelector('[data-form]')
const nome = document.querySelector('[data-nome]')
const email = document.querySelector('[data-email]')

clienteService.detalhaCliente(id).then(dados => {
    nome.value = dados.nome
    email.value = dados.email
})

form.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    await clienteService.atualizaCliente(id, nome.value, email.value)
    window.location.href = '../telas/edicao_concluida.html'
})