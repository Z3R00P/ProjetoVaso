import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'


import servidor from '../utils/servidor'


export default function Detalhes({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [umidade, setUmidade] = useState('')
  const [luz, setLuz] = useState('')
  const [temperatura, setTemperatura] = useState('')
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
        alert('Erro ao remover planta' + error.message)
    }
  }


  async function editarPlanta() {
    let resp = await servidor.editarPlanta({
      id: id,
      nome_planta: nome_planta,
      data_plantio: data_plantio,
      umidade: umidade,
      luz: luz,
      temperatura: temperatura,
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
      setUmidade(planta.umidade)
      setLuz(planta.luz)
      setTemperatura(planta.temperatura)
      setEspecie(planta.especie.id)
    }

    fetchEspecies();
  }, [route.params])

  return (
    <>
    <View style={styles.background}>
      <Appbar style={styles.bar}>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>

      <View style={styles.container}>
        <TextInput style={styles.item} label="ID" value={id} readOnly={true}/>
        <TextInput style={styles.item} label="Nome da Planta" value={nome_planta} onChangeText={setNomePlanta}/>
        <TextInput style={styles.item} label="Data de Plantio" value={data_plantio} onChangeText={setDataPlantio}/>
        <TextInput style={styles.item} label="Umidade da terra" value={umidade} onChangeText={setUmidade}/>
        <TextInput style={styles.item} label="Quantidade de luz" value={luz} onChangeText={setLuz}/>
        <TextInput style={styles.item} label="Temperatura do ar" value={temperatura} onChangeText={setTemperatura}/>
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
      </View>
    </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20
  },
  background: {
    flex: 1,
  },
  bar: {
    backgroundColor: '#45bf55'
  },
  item: {
    backgroundColor: '#a3ffb6',
    marginBottom: 5
  },
  botao: {
    backgroundColor: '#45bf55',
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
      backgroundColor: '#a3ffb6',
      borderColor: '#a3ffb6',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#a3ffb6',
      borderColor: '#a3ffb6',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
  },
  inputWeb: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#a3ffb6',
      borderColor: '#a3ffb6',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
});