/**
 * E-MENU API
 * SIMPLE API TO GET MENU LIST AND CREATE ORDER
 */

const API_URL = 'https://e-menu-dev.herokuapp.com/api/';
export const ApiService = {
    getMenuList: () => {
        return fetch(API_URL + 'get-menu')
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.json())
            .catch(e => {
                console.error(e);
            })
    },
    checkOut: (name, phone, cart) => {
        //Cart list
        var cartList = [];
        for (var i = 0; i < cart.length; i++) {
            cartList.push({
                id: cart[i].id,
                name: cart[i].name,
                quantity: cart[i].quantity,
                price: cart[i].price,
                image: cart[i].image,
            });
        }
        //Prepare data before send
        var data = {
            name: name,
            phone: phone,
            cart: cartList
        }

        //Post data to api
        return fetch(API_URL + 'checkout', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
            })
            .then(response => response.json())
            .catch(e => {
                console.error(e);
            });
    }
};