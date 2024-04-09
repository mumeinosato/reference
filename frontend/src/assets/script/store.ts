import { defineStore } from "pinia";
import { ref } from "vue";
import CryptoJS from "crypto-js";

export const useStore = defineStore(
    'main',
    () => {
        const LoginState = ref(false);

        const NameState = ref('');

        const UserState = ref('');

        const setLogin = (value: boolean) => {
            LoginState.value = value;
        }

        const getLogin = () => {
            return LoginState.value;
        }

        const setUser = (value: string) => {
            UserState.value = value;
        }

        const getUser = () => {
            return UserState.value;
        }

        const setName = (value: string) => {
            NameState.value = value;
        }

        const getName = () => {
            return NameState.value;
        }

        return { LoginState, setLogin, getLogin, NameState, setName, getName, UserState, setUser, getUser} 
    },
    {
        persist: {
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
