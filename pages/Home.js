import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par celle de votre API pour obtenir les produits
    axios.get('http://localhost:8000/api/products/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des produits:", error);
      });
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <Text style={styles.title}>Nos produits</Text>
      <View style={styles.productList}>
        {products.map((product) => (
          <View style={styles.productCard} key={product.id}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.price}>{product.price} €</Text>
            <Button 
              title="Ajouter au panier" 
              onPress={() => addToCart(product)} 
              color="#4CAF50"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#333',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Pour Android
    backgroundColor: '#fff',
    width: '48%', // Ajuste la largeur pour que les cartes soient en 2 colonnes
    marginBottom: 20,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Home;
