import { defineStore } from 'pinia';
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

export const useStore = defineStore(
  'main',
  () => {
    const LoginState = ref<boolean>(false);
    const UserState = ref<string>('user');
    const Language = ref<string>('cpp');
    const Type = ref<string>('1');

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


    return { LoginState, setLogin, getLogin, UserState, setUser, getUser, Language, setLanguage, getLanguage, Type, setType, getType };
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
            UserState: parsedData.UserState ?? 'user',
            Language: parsedData.Language ?? 'cpp',
            Type: parsedData.Type ?? '1',
          };
        },
        serialize(state) {
          return CryptoJS.AES.encrypt(JSON.stringify(state), 'user').toString()
        },
      }
    },
  }
);
