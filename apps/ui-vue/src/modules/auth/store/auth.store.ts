import { defineStore } from 'pinia';
import { fetchWrapper} from '../../../helpers/fetch-wrappers';
import router from '../../../router/index';
import { UserInterface, LoginUserInterface} from '@airbnb-vue-express/shared-models'

const baseUrl = 'http://localhost:3333/user';

export const useAuthStore = defineStore({  
  id: 'auth',
  state: () => ({
    //@ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: ''
  }),
  actions: {
    async register(user:UserInterface) {
      return await fetchWrapper.post(`${baseUrl}/register`, user)
    },
    async login(loginUser: LoginUserInterface) {
      const user = await fetchWrapper.post(`${baseUrl}/login`, loginUser);
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      router.push(this.returnUrl || '/');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    }
  }
})