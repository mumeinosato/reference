import { defineStore } from "pinia";
import { ref } from "vue";
import CryptoJS from "crypto-js";

export const useStore = defineStore(
    'main',
    () => {
        const LoginState = ref<boolean>(false);
        const NameState = ref<string>('デフォルト名前');
        const UserState = ref<string>('デフォルトユーザー');
        const Language = ref<string>('C++');
        const Type = ref<string>('TechFul');
        const Group = ref<string>('programming-basic');

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

        const setLanguage = (value: string) => {
            Language.value = value;
        }
        const getLanguage = () => {
            return Language.value;
        }

        const setType = (value: string) => {
            Type.value = value;
        }
        const getType = () => {
            return Type.value;
        }

        const setGroup = (value: string) => {
            Group.value = value;
        }
        const getGroup = () => {
            return Group.value;
        }

        return { LoginState, setLogin, getLogin, NameState, setName, getName, UserState, setUser, getUser, Language, setLanguage, getLanguage, Type, setType, getType, Group, setGroup, getGroup };
    },
    {
        persist: {
            serializer: {
                deserialize: (value: string) => {
                    const decrypted = CryptoJS.AES.decrypt(value, 'user')
                    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
                    const parsedData = JSON.parse(decryptedData);
                  
                    return {
                        LoginState: parsedData.LoginState ?? false,
                        NameState: parsedData.NameState ?? 'デフォルト名前',
                        UserState: parsedData.UserState ?? 'デフォルトユーザー',
                        Language: parsedData.Language ?? 'C++',
                        Type: parsedData.Type ?? 'TechFul',
                        Group: parsedData.Group ?? 'programming-basic',
                    };
                },
                serialize(state) {
                    return CryptoJS.AES.encrypt(JSON.stringify(state), 'user').toString()
                },
            }
        },
    },
);
