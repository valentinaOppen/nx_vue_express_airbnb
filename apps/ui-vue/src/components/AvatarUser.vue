
<template>

  <div class="flex h-fit my-auto">            
    <div class="relative flex">      
			<button @click='active = !active' class='focus:outline-none'>
        <div class="icons flex  border-solid border-white rounded-3xl w-14">          
          <MenuIcon></MenuIcon>
          <UserIcon></UserIcon>
          </div>
      </button>
			<div v-if='active'>				
        <MenuUser></MenuUser>
			</div>
		</div>            
    
  </div>

</template>
<script lang="ts" setup>
  import { ref } from 'vue';  

  import { MenuIcon, UserIcon } from '@airbnb-vue-express/icons';
  import MenuUser from './MenuUser.vue';      
  
  const active = ref(false);    
  
</script>

<style scoped>
.icons { 
  border:solid white 1px;
  padding: 5px 10px;
}

</style>