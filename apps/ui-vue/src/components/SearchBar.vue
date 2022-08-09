<script setup lang="ts">    
  import Input from './InputStyled.vue';
  import Button from './ButtonStyled.vue';  
  import { SearchIcon } from '@airbnb-vue-express/icons';
  import { useMapStore } from '../modules/map/map.store';
  import { computed, ref } from 'vue';

  const debounceTimeout = ref();
  const debouncedValue = ref('');
  const { searchPlaces } = useMapStore();

  const searchTerm = computed({
    get() {      
      return debouncedValue.value;
    },
    set( val: string) {            
      if ( debounceTimeout.value ) clearTimeout( debounceTimeout.value );
      
      debounceTimeout.value = setTimeout(() => {
        debouncedValue.value = val;
        searchPlaces( val );
      }, 500 );
    }
  })

</script>

<template>
  <div class="flex w-8/12 h-full relative m-auto"> 
    <Input v-model="searchTerm" placeholder="Search places" class="h-full m-auto"></Input>
    <div class="absolute right-8 top-1 text-red-500"><SearchIcon></SearchIcon></div>
  </div>

</template>
