import { defineStore } from 'pinia';

export const useTokenStore = defineStore('tokenStore', () => {
    const token = ref(null);

    function setToken(newToken) {
        token.value = newToken;
    }

    function getToken() {
        return token.value;
    }

    function clearToken() {
        this.token = null;
    }

    return { token, setToken, getToken,clearToken };
});
