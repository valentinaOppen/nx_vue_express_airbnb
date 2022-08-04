
<template>  
  <div class='menu'>
    <div class="p-2">
      <div class="text-left font-xs">Signed in as</div>
      <div class="text-red-500 text-left font-bold capitalize">{{user.firstname}} {{user.lastname}}</div>
    </div>
    <hr>
    <div class="flex flex-col p-2">
      <button class="hover:bg-gray-200 text-left" @click="inProgress">Account settings</button>
      <button class="hover:bg-gray-200 text-left" @click="inProgress">Favorites</button>
      <button class="underline text-left text-red-500" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>  
  import { ref } from 'vue';
  import { useSwal } from '@airbnb-vue-express/ui-helpers'
  import { useAuthStore } from '../modules/auth/store/auth.store';
      
  const favorites = ref(false);
  const user = useAuthStore().user.response;

  const logout = async () => {
    try {
      await useAuthStore().logout()    
    }
    catch(error:any) {    
      useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
    } 
  }

  const inProgress = () => {    
    useSwal('Under construction!', 'Please wait until next version :)', 'info', 'Ok');
  }

  
</script>

<style scoped>
.icons { 
  border:solid white 1px;
  padding: 5px 10px;
}

.menu {
  position: absolute;
  background: white;
  width: fit-content;
  white-space: nowrap;
  padding: 10px;
  right: 0;
  top: 50px;
  z-index: 1;
  opacity: .94;
  border-radius: 10px;
}
</style>