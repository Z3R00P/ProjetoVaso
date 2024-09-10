import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'


import servidor from '../utils/servidor'


export default function Detalhes({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [especie, setEspecie] = useState('')
  const [listaEspecies, setListaEspecies] = useState([])
  const [showDropDown, setShowDropDown] = useState(false)


  async function removerPlanta() {
    try {
        let resp = await servidor.removerPlanta({
              id: id,
              nome_planta: nome_planta,
              data_plantio: data_plantio,
              especie_id: especie
        })
        alert('Planta removida')
        navigation.navigate("Listagem")
    } catch (error) {
        alert('Erro ao removerr planta' + error.message)
    }
  }


  async function editarPlanta() {
    let resp = await servidor.editarPlanta({
      id: id,
      nome_planta: nome_planta,
      data_plantio: data_plantio,
      especie_id: especie
    })

    if(resp){
      alert("Planta editada")
      navigation.navigate("Listagem")
    } else {
      alert("Erro ao editar planta")
    }
  }

    async function fetchEspecies() {
        try {
          let especies = await servidor.listarEspecies();
          setListaEspecies(especies.map(especie => ({ label: especie.nome_cientifico, value: especie.id })));
        } catch (error) {
          alert('Erro ao buscar espécies: ' + error.message);
        }
      }

  useEffect(() => {
    const planta = route.params
    if (planta) {
      setId(planta.id)
      setNomePlanta(planta.nome_planta)
      setDataPlantio(planta.data_plantio)
      setEspecie(planta.especie.id)
    }

    fetchEspecies();
  }, [route.params])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>


      <SafeAreaView style={styles.container}>
        <TextInput style={styles.item} label="ID" value={id} readOnly={true}/>


        <TextInput style={styles.item} label="Nome da Planta" value={nome_planta} onChangeText={setNomePlanta}/>
        <TextInput style={styles.item} label="Data de Plantio" value={data_plantio} onChangeText={setDataPlantio}/>
        <RNPickerSelect
          placeholder={{ label: 'Selecione uma espécie', value: null }}
          items={listaEspecies}
          onValueChange={(value) => setEspecie(value)}
          value={especie}
          style={pickerSelectStyles}
        />


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
  },
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#E7E0EC',
      borderColor: '#E7E0EC',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#E7E0EC',
      borderColor: '#E7E0EC',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
  },
  inputWeb: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#E7E0EC',
      borderColor: '#E7E0EC',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
});