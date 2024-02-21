import * as React from 'react';
import CryptoES from 'crypto-es';

import { Button, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [keystring, setKeystring] = React.useState('test');
  function keyGen () {
    return CryptoES.lib.WordArray.random(256 / 8).toString();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
      <Text>POC to Create and store a key</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttontext} onPress={() => setKeystring(keyGen())}>Make a Key</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>{keystring}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    margin: 10,
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
