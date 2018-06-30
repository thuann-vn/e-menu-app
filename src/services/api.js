const API_URL = 'https://e-menu-dev.herokuapp.com/api/';
export const api = {
    getMenuList: ()=>{
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
    }
};