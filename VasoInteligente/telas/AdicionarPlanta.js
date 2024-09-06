import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'


import servidor from '../utils/servidor'


export default function Adicionar({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [especie, setEspecie] = useState('')


  async function removerPlanta() {
    let resp = await servidor.removerPlanta({
      id: id,
      nome_planta: nome_planta,
      data_plantio: data_plantio,
      especie: especie
    })

    if(resp) {
      alert("Planta removida")
      navigation.navigate("Listagem")
    } else {
      alert("Erro ao remover planta")
    }
  }


  async function editarPlanta() {
    let resp = await servidor.editarPlanta({
      id: id,
      nome_planta: nome_planta,
      data_plantio: data_plantio,
      especie: especie
    })

    if(resp){
      alert("Planta editada")
      navigation.navigate("Listagem")
    } else {
      alert("Erro ao editar planta")
    }
  }


  // configura os valores a partir dos que foram passados na navegação
   useEffect(() => {
    const planta = route.params
    if (planta) {
      setId(planta.id)
      setNomePlanta(planta.nome_planta)
      setDataPlantio(planta.data_plantio)
      setEspecie(planta.especie)
    }
  }, [route.params])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>


      <SafeAreaView style={styles.container}>
        <TextInput style={styles.item} label="ID" value={id} readOnly={true} onChangeText={setId}/>


        <TextInput style={styles.item} label="Nome da Planta" value={nome_planta} onChangeText={setNomePlanta}/>
        <TextInput style={styles.item} label="Data de Plantio" value={data_plantio} onChangeText={setDataPlantio}/>
        <TextInput style={styles.item} label="Espécie" value={especie} onChangeText={setEspecie}/>


        <View style={styles.barraBotao}>
          <Button
            mode="contained"
            style={styles.botao}
            icon="delete"
            onPress={removerPlanta}>Remover
          </Button>


          <Button
            mode="contained"
            style={styles.botao}
            icon="file-edit"
            onPress={editarPlanta}>Editar
          </Button>
        </View>


      </SafeAreaView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20
  },
  item: {
    marginBottom: 5
  },
  botao: {
    margin: 5,
    marginTop: 20,
    flexGrow: 1
  },
  barraBotao: {
    width: '100%',
    flexDirection: 'row'
  }
})
