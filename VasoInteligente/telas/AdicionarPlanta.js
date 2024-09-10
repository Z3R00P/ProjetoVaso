import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Modal,Portal,Appbar, TextInput,Button, Text} from 'react-native-paper'
import RNPickerSelect from 'react-native-picker-select'


import servidor from '../utils/servidor'


export default function Adicionar({ route, navigation }) {
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [especie, setEspecie] = useState('')
  const [listaEspecies, setListaEspecies] = useState([])
  const [showDropDown, setShowDropDown] = useState(false)



  async function adicionarPlanta() {
    let resp = await servidor.adicionarPlanta({
        nome_planta: nome_planta,
        data_plantio: data_plantio,
        especie_id: especie
    })
    if (resp) {
        setShowDropDown(true)
        alert("Planta adicionada com sucesso")
        setNomePlanta("")
        setDataPlantio("")
        setEspecie("")
    } else {
        alert("Erro ao adicionar planta")
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
      fetchEspecies();
    }, [route.params])


  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 100, margin: 50, fontSize: 10};


  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Adicionar Planta" />
      </Appbar>


      <SafeAreaView style={styles.container}>


      <TextInput style={styles.item} label="Nome" value={nome_planta} onChangeText={setNomePlanta}/>
      <TextInput style={styles.item} label="Data de Plantio" value={data_plantio} onChangeText={setDataPlantio}/>
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma espécie', value: null }}
        items={listaEspecies}
        onValueChange={(value) => setEspecie(value)}
        value={especie}
        style={pickerSelectStyles}
      />
      <Button mode="contained" style={styles.botao} onPress={adicionarPlanta} icon="plus" >Adicionar sua Planta</Button>

      </SafeAreaView>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Planta cadatrada com Sucesso!!!</Text>
        </Modal>
      </Portal>

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

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