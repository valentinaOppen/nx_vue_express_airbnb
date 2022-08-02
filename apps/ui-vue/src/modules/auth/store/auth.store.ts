import { defineStore } from 'pinia';
import { fetchWrapper} from '../../../helpers/fetch-wrappers';
import router from '../../../router/index';
import User from '../../../models/User.model';

const baseUrl = 'http://localhost:3333/user';

export const useAuthStore = defineStore({  
  id: 'auth',
  state: () => ({
    //@ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: ''
  }),
  actions: {
    async register(user:User) {
      await fetchWrapper.post(`${baseUrl}/add-user`, user)
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/account/login');
    }
  }
})