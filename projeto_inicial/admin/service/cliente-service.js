const listaClientes = () => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()

        http.open('GET', 'http://localhost:3000/profile')

        http.onload = () => {
            if (http.status >= 400) {
                reject(JSON.parse(http.response))
            } else {
                resolve(JSON.parse(http.response))
            }
        }
        http.send()
    })

    console.log(promise)
    return promise
}

const criaCliente = (nome, email) => {
    return fetch('http://localhost:3000/profile', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    }).then(resposta => {
        if (resposta.ok) {
            return resposta.body
        }
        throw new Error('Não foi possível criar o cliente!')
    })
}

const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Não foi possível deletar o cliente!')
        }
    })
}

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`).then(resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error('Não foi possível obter as informações do cliente')
    })
}

const atualizaCliente = (id, nome, email) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    }).then(resposta => {
        if (resposta.ok) {
            return resposta.json()
        }
        throw new Error('Não foi possível atualizar as informações do cliente')
    })
}


export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}