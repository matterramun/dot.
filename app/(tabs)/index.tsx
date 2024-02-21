import * as React from 'react';
import CryptoES from 'crypto-es';

import { Button, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [keystring, setKeystring] = React.useState('test');
  const [data, setData] = React.useState('Create an encrypted-at-rest local data storage for tracking your period and other uterine and pregnancy health metrics for use by all women, especially those in states with regressive abortion legislation.')
  const [lockedState, setLockedState] = React.useState(false)
  const [encryptionKey, setEncryptionKey] = React.useState('')
  function keyTurn (lockedState:boolean) {
    encryptionKey == '' ? setKeystring(keyGen()) : null ;
    if (lockedState == true){
      keyUnlock()
      setLockedState(false)
      console.log(lockedState)
    } else {
      keyLock()
      setLockedState(true)
      console.log(lockedState)
    }
    function keyUnlock () {
      const unlockedData = 'Create an encrypted-at-rest local data storage for tracking your period and other uterine and pregnancy health metrics for use by all women, especially those in states with regressive abortion legislation. Unlocked'
      return setData(unlockedData)
    }
    function keyLock () {
      const lockData = CryptoES.AES.encrypt(data, keystring).toString()
      return setData(lockData)
    }

  }
  function keyGen () {
    setEncryptionKey(CryptoES.lib.WordArray.random(256 / 8).toString());
    return encryptionKey
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
      <Text>POC to Create and store a key</Text>
      {/* sets a key and locks provided data */}
      <Pressable style={Object.assign({backgroundColor:'blue'}, styles.button)}>
        <Text style={styles.buttontext} onPress={() => keyTurn(lockedState)}>Turn Key</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>{encryptionKey}</Text>
      <Text style={{width:'90%'}}>{data}</Text>
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
    margin: 10,
  },
  buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  
});
