<template>
  <styled-input v-model="val" placeholder="val"/>  
</template>

<script lang="ts" setup>
import styled from "vue3-styled-components";
import { computed, reactive } from 'vue'

const val = computed(()=> {0})

const StyledInput = styled.input`  
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  width:90%;
  /* color: rgb(248 113 113); */
  border: solid 1px lightgrey;
  border-radius:10px;
  &:hover {
    box-shadow: 0px 0px 3px 0px rgb(248 113 113)
  }
`;

</script>

<style>
</style>