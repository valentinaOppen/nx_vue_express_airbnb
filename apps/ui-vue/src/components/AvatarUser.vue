
<template>

  <div class="flex h-fit my-auto justify-between w-100">    
    <div class="text-white">{{user.response.username}}</div>
    <div class="icons flex  border-solid border-white rounded-3xl">          
      <MenuIcon></MenuIcon>
      <UserIcon></UserIcon>
    </div>
  </div>

</template>
<script lang="ts" setup>
  import { MenuIcon, UserIcon } from '@airbnb-vue-express/icons';
  import { useAuthStore } from '../modules/auth/store/auth.store';
  const user = useAuthStore().user;
  
</script>

<style scoped>
.icons { 
  border:solid white 1px;
  padding: 5px 10px;
}
</style>