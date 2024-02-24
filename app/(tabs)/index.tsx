import * as React from 'react';
import CryptoES from 'crypto-es';

import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  const [secret, setSecret] = React.useState('frog');
  const [data, setData] = React.useState('Create an encrypted-at-rest local data storage for tracking your period and other uterine and pregnancy health metrics for use by all women, especially those in states with regressive abortion legislation.')
  const [lockedState, setLockedState] = React.useState(false)
  const [iv, setIv] = React.useState<CryptoES.lib.WordArray>(CryptoES.lib.WordArray.create());
  
  function keyTurn(isLocked: boolean, inputData: string, inputSecret: string) {
    isLocked ? decrypt(inputData, inputSecret) : encrypt(inputData, inputSecret);
    console.log(isLocked);
  }

  function encrypt(plaintext: string, secret: string) {
    let key = CryptoES.enc.Utf8.parse(secret);
    var newIv = CryptoES.lib.WordArray.create(key.words.slice(0, 4));
    setIv(newIv);
    console.log("New IV :" + CryptoES.enc.Base64.stringify(newIv));

    const cipherData = CryptoES.AES.encrypt(plaintext, key, {
      iv: newIv,
      mode: CryptoES.mode.CBC,
      padding: CryptoES.pad.Pkcs7
    });
    setLockedState(true);
    setData(cipherData.toString());
    return cipherData.toString();
  }

  function decrypt(cipherData: string, secret: string) {
    let key = CryptoES.enc.Utf8.parse(secret);
    let cipherBytes = CryptoES.enc.Base64.parse(cipherData);

    var decrypted = CryptoES.AES.decrypt({ ciphertext: cipherBytes }, key, {
      iv: iv,
      mode: CryptoES.mode.CBC,
      padding: CryptoES.pad.Pkcs7
    });
    setLockedState(false);
    setData(decrypted.toString(CryptoES.enc.Utf8));
    return decrypted.toString(CryptoES.enc.Utf8);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Tab</Text>
      <Text>POC to Create and store a key</Text>
      {/* sets a key and locks provided data */}
      <Pressable style={Object.assign({backgroundColor:'blue'}, styles.button)}>
        <Text style={styles.buttontext} onPress={() => keyTurn(lockedState, data, secret)}>Turn Key</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>testing...</Text>
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
