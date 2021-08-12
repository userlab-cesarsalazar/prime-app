import React from 'react'
import { Text, StyleSheet } from 'react-native'

export function CustomText(props) {
  return props.type === 'error' ? (
    <Text style={styles.errorColor}>{props.value}</Text>
  ) : (
    <Text style={styles.textColor}>{props.value}</Text>
  )
}

const styles = StyleSheet.create({
  textColor: {
    color: 'white',
  },
  errorColor: {
    color: 'red',
  },
})
