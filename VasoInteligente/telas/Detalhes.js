import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native'
import { Modal,Portal,Appbar, TextInput,Button, Text} from 'react-native-paper'
import { useState, useEffect } from 'react'


import servidor from '../utils/servidor'


export default function Detalhes({ navigation }) {
  const [nome_planta, setNomePlanta] = useState('')
  const [data_plantio, setDataPlantio] = useState('')
  const [especie, setEspecie] = useState('')


  const [visible, setVisible] = useState(false);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 100, margin: 50, fontSize: 10};



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let plantas = await servidor.lerPlantas()


      if (plantas) {
        setPlantas(plantas)
      } else {
        console.log(erro)
        alert("Erro ao tentar ler as plantas")
      }
    });


    return unsubscribe;
  }, [navigation])


  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Adicionar Planta" />
      </Appbar>


      <SafeAreaView style={styles.container}>


      <TextInput style={styles.item} label="Nome" value={nome_planta}onChangeText={setNomePlanta}/>
      <TextInput style={styles.item} label="Data de Plantio" value={data_plantio}onChangeText={setDataPlantio}/>
      <TextInput style={styles.item} label="Especie" value={especie} onChangeText={setEspecie}/>
      <Button mode="contained" style={styles.botao} onPress={showModal} icon="plus" >Adicionar sua Planta</Button>

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
