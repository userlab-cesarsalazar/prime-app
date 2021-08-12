import React, { useState, useEffect } from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator,
} from 'react-native'
import { Auth } from 'aws-amplify'
import { getUserInformation, getInformationPackage } from '../../services/api'

export default function HomeScreen(props) {
  const [userData, setUserData] = useState('')
  const [userPackages, setUserPackages] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    infoUser()
  }, [])

  const signOut = async () => {
    try {
      console.log('here')
      const close = await Auth.signOut()
      console.log(close)
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  const infoUser = async () => {
    const user = await getUserInformation()
    if (user.client_id) {
      const packages = await getInformationPackage(user.client_id)
      setUserPackages(packages)
      setLoading(false)
    }
    setUserData(user)
    setLoading(false)
  }
  const packagesDeliveries = (dataP, value) => {
    let _deliveries = []
    let _pending = []
    dataP.forEach(x => {
      if (x.status === 'Entregado') {
        _deliveries.push(x)
      }
      if (x.status === 'Recoger en Prime') {
        _pending.push(x)
      }
    })
    if (value === 'deliveries') {
      return _deliveries
    } else {
      return _pending
    }
  }
  const _data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: `Paquetes por Entregar: ${userPackages && packagesDeliveries(userPackages, 'pending').length}`,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: `Paquetes Entregados: ${userPackages && packagesDeliveries(userPackages, 'deliveries').length}`,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Paquetes con Pendientes por Factura',
    },
  ]

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  )

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
    const color = item.id === selectedId ? 'white' : 'black'

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  return loading ? (
    <View>
      <ActivityIndicator size='large' color='#0000ff' style={styles.loading} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={{ marginLeft: 16, marginTop: 20 }}>Hola {userData.name}!</Text>
      {/*<Button onPress={signOut} title='Cerrar Session'></Button>*/}

      <SafeAreaView style={styles.container}>
        <FlatList data={_data} renderItem={renderItem} keyExtractor={item => item.id} extraData={selectedId} />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  loading: {
    marginVertical: '50%',
  },
})
