import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native'
import { Modal,Portal,Appbar, TextInput,Button, Text} from 'react-native-paper'
import { useState, useEffect } from 'react'


import servidor from '../utils/servidor'


export default function Adicionar({ navigation }) {
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [especie, setEspecie] = useState('')

  async function adicionarPlanta() {
    let resp = await servidor.adicionarPlanta({
        nome_planta: nome_planta,
        data_plantio: data_plantio,
        especie_id: especie
    })
    if (resp) {
        alert("Planta adicionada com sucesso")
        setNomePlanta("")
        setDataPlantio("")
        setEspecie("")
    } else {
        alert("Erro ao adicionar planta")
    }
  }


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
      <TextInput style={styles.item} label="Especie" value={especie} onChangeText={setEspecie} />
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
