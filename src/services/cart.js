/**
 * CART SERVICE
 * Save cart data to async storage
 * DOCS: https://facebook.github.io/react-native/docs/asyncstorage.html
 */

import {
    AsyncStorage
} from "react-native"

//SECRECT KEY FOR SAVE CART
const STORAGE_KEY = 'EMENUCART';

export const CartService = () => {
    var self = this;

    /**
     * Get cart list 
     * @returns array
     */
    this.getCart = async () => {
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
    };

    /**
     * Update cart, return true if sucess, false if failed
     * @param {array} cart
     * @returns boolean
     */
    this.setCart = async (cart) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
            return true;
        } catch (error) {
            return false;
        }
    };


    /**
     * Add item to cart
     * @param {object} item 
     */
    this.addItem = async (item) => {
        let cart = await self.getCart();

        //Check if item existed
        var isExisted = false;
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == item.id) {
                cart[i].quantity += item.quantity;
                isExisted = true;
            }
        }

        //Push new if not existed
        if(!isExisted){
            cart.push(item);
        }

        //Set cart
        await self.setCart(cart);
    }

    /**
     * Remove item from cart
     * @param {object} item 
     */
    this.removeItem = async (item) => {
        let cart = await self.getCart();
        for (var i = cart.length - 1; i >= 0; i--) {
            if (item.id == cart[i].id) {
                cart.splice(i, 1);
            }
        }
        await self.setCart(cart);
        return cart;
    }

    /**
     * Update item quantity
     * @param {object} item 
     * @param {integer} quantity 
     */
    this.updateItemQuantity = async (item, quantity) => {
        let cart = await self.getCart();
        for (var i = cart.length - 1; i >= 0; i--) {
            if (item.id == cart[i].id) {
                cart[i].quantity = quantity;
            }
        }
        await self.setCart(cart);
        return cart;
    }

    return this;
};