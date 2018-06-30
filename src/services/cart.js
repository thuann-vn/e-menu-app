/**
 * CART SERVICE
 * Save cart data to async storage
 * DOCS: https://facebook.github.io/react-native/docs/asyncstorage.html
 */

import { AsyncStorage } from "react-native"
const STORAGE_KEY = 'EMENUCART';
export const Cart = {
    getCart: ()=>{
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                //Value must be a string => parse to json before return
                return JSON.parse(value);
            }
            return [];
        } catch (error) {
            return [];
        }
    },
    setCart: (cart) =>{
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            if (value !== null) {
                // We have data!!
                return value;
            }
            return [];
        } catch (error) {
            return [];
        }
    },
    addItem: (item) =>{
        let cart = this.getCart();
        cart.push(item);
        this.setCart(cart);
    },
    removeItem: (item) => {
        let cart = this.getCart();
        for(var i= cart.length-1; i>=0; i--){
            if(item.id == cart[i].id){
                cart.splice(i, 0, 1);
            }
        }
        this.setCart(cart);
    },
    updateItemQuantity: (item, quantity) => {
        let cart = this.getCart();
        for(var i= cart.length-1; i>=0; i--){
            if(item.id == cart[i].id){
                cart.quantity = quantity;
            }
        }
        this.setCart(cart);
    }
};