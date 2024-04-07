import { defineStore } from "pinia";
import { ref } from "vue";
import CryptoJS from "crypto-js";

export const useStore = defineStore(
    'login',
    () => {
        const LoginState = ref(false);

        const setLogin = (value: boolean) => {
            LoginState.value = value;
        }

        const getLogin = () => {
            return LoginState.value;
        }

        return { LoginState, setLogin, getLogin } 
    },
    {
        persist: {
            storage: sessionStorage,
            serializer: {
                deserialize: (value: string) => {
                    const decrypted = CryptoJS.AES.decrypt(value, 'user')
                    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
                    return JSON.parse(decryptedData)
                },
                serialize(state) {
                    return CryptoJS.AES.encrypt(JSON.stringify(state), 'user').toString()
                },
            }
        },
    },
);
