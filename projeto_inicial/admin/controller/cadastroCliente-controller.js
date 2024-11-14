import {clienteService} from "../service/cliente-service.js";

const form = document.querySelector('[data-form]')



form.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    try {
        const nome = evento.target.querySelector('[data-nome]')
        const email = evento.target.querySelector('[data-email]')

        await clienteService.criaCliente(nome.value, email.value)
        window.location.href = '../telas/cadastro_concluido.html'
    } catch (err) {
        console.log(err)
        window.location.href = '../telas/erro.html'
    }

})

// para aplicar a API use: npx json-server --watch db.json