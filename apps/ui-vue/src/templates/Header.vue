<script lang="ts" setup>  
  import LogoSerempre from '../components/LogoSerempre.vue';
  import SearchBar from '../components/SearchBar.vue';
  import AvatarUser from '../components/AvatarUser.vue';  
  
</script>

<template>
  <div class="bg-red-500 flex p-2 justify-between w-full h-14">
    <div class="w-1/4">
      <LogoSerempre></LogoSerempre>       
    </div> 
    <div class="w-2/4 h-5/6 m-auto">
      <SearchBar></SearchBar>
    </div>
    <div class="w-1/4">
    <AvatarUser></AvatarUser>
    </div>
  </div>
</template>

