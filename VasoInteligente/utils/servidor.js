async function lerPlantas() {
    return [
      {
        id: 1,
        nome_planta: 'Samambaia',
        data_plantio: '2024-08-24',
        especie: "bromélia"
      },
      {
        id: 2,
        nome_planta: 'Flor do Deserto',
        data_plantio: '2024-05-15',
        especie: "Adenium obesum"
      },
      {
        id: 3,
        nome_planta: 'Copo de Leite',
        data_plantio: '2024-04-20',
        especie: "Liliopsida"
      },
      {
        id: 4,
        nome_planta: 'Espada de São Jorge',
        data_plantio: '2024-07-13',
        especie: "Dracaena"
      },
      {
        id: 5,
        nome_planta: 'Suculenta',
        data_plantio: '2024-10-16',
        especie: "crassuláceas"
      },
]}


async function adicionarPlanta(planta) {
    return true
  }

  async function editarPlanta(planta) {
    return true
  }

  async function removerPlanta(planta) {
    return true
  }

  module.exports = {
    lerPlantas,
    adicionarPlanta,
    editarPlanta,
    removerPlanta
  }
