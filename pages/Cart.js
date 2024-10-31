import React from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';

const Cart = ({ cart }) => {
  const totalPrice = cart.reduce((total, product) => total + parseFloat(product.price), 0);

  return (
    <ScrollView style={styles.cartContainer}>
      <Text style={styles.title}>Panier</Text>
      {cart.length === 0 ? (
        <Text>Votre panier est vide.</Text>
      ) : (
        <View>
          {cart.map((product, index) => (
            <View key={index} style={styles.cartItem}>
              <Image source={{ uri: product.image }} style={styles.cartItemImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price} €</Text>
              </View>
            </View>
          ))}
          <View style={styles.cartTotal}>
            <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)} €</Text>
            <Button title="Valider la commande" onPress={() => {/* Action de validation */}} color="#4CAF50" />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 4,
  },
  productDetails: {
    flex: 1, // Pour prendre tout l'espace restant
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#333',
  },
  cartTotal: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cart;
