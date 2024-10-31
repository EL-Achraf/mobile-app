import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    // Vérification des champs
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      // Envoyer les données au backend (remplacez l'URL par celle de votre API)
      const response = await axios.post('http://localhost:8000/api/accounts/login/', {
        email,
        password,
      });

      if (response.data.success) {
        setSuccess('Connexion réussie !');
        Alert.alert("Succès", "Connexion réussie !");
        // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions ici
      } else {
        setError(response.data.message || 'Échec de la connexion.');
        Alert.alert("Erreur", response.data.message || 'Échec de la connexion.');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion.');
      Alert.alert("Erreur", 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Connexion</Text>
      <View style={styles.formGroup}>
        <Text>Email :</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Entrez votre email"
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
      </View>
      <View style={styles.formGroup}>
        <Text>Mot de passe :</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          required
        />
      </View>
      <Button title="Se connecter" onPress={handleLogin} color="#4CAF50" />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      {success ? <Text style={styles.successMessage}>{success}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  successMessage: {
    color: 'green',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Login;
