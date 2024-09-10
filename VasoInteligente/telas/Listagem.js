import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet } from 'react-native'
import { DataTable, FAB, Appbar, Text } from 'react-native-paper'
import { useState, useEffect } from 'react'


import servidor from '../utils/servidor'


export default function Listagem({ navigation }) {
  const [plantas, setPlantas] = useState([])

  function verDetalhes(planta) {
    navigation.navigate('Detalhes', planta)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let novasPlantas = await servidor.indexPlantas()

      if (novasPlantas) {
        console.dir(novasPlantas)
        setPlantas(novasPlantas)
      } else {
        alert("Erro ao tentar ler as plantas")
      }
    });


    return unsubscribe;
  }, [navigation])


  return (
    <>
      <Appbar>
        <Appbar.Content title="Plantas" />
      </Appbar>


      <SafeAreaView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.titulo1}>Nome da Planta</DataTable.Title>
            <DataTable.Title>Espécie da Planta</DataTable.Title>
            <DataTable.Title>Data de Plantio</DataTable.Title>
          </DataTable.Header>


          {plantas.map( (planta) => (
            <DataTable.Row
                key={planta.id}
                onPress={() => verDetalhes(planta)}
            >
                <DataTable.Cell>{planta.nome_planta}</DataTable.Cell>
                <DataTable.Cell>{planta.especie.nome_cientifico}</DataTable.Cell>
                <DataTable.Cell>{planta.data_plantio}</DataTable.Cell>


                </DataTable.Row>
          ))}


        </DataTable>


        <StatusBar mode="auto" />


      </SafeAreaView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AdicionarPlanta')}
      />
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
    /*backgroundColor: '#91ba4f',*/

  },
  titulo1:{
   /* backgroundColor: '#91ba4f'*/
   color: 'red'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
