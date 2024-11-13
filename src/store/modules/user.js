import { defineStore } from 'pinia';

export const useInfoStore = defineStore('userStore', () => {
    const userinfo = ref(null);

    function setUserInfo(newValue) {
        userinfo.value = newValue;
    }

    function getUserInfo() {
        return userinfo.value;
    }

    return { userinfo, setUserInfo, getUserInfo };
});
