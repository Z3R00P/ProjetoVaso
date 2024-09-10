/**
 * Lida com toda a comunicação com o servidor (API REST)
 */
async function indexPlantas() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/plantas')
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
}

async function adicionarPlanta(planta) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/plantas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_planta: planta.nome_planta,
        data_plantio: planta.data_plantio,
        especie_id: planta.especie_id
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function editarPlanta(planta) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/planta/' + planta.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome_planta: planta.nome_planta,
        data_plantio: planta.data_plantio,
        especie_id: planta.especie_id
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function removerPlanta(planta) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/planta/' + planta.id, {
      method: 'DELETE'
    })

    return response.status == 204
  } catch (error) {
    console.log(error)
    return false
  }
}

async function listarEspecies() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/especies')
        return await response.json()
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
  indexPlantas,
  adicionarPlanta,
  editarPlanta,
  removerPlanta,
  listarEspecies
}