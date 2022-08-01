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
  color: palevioletred;
  border-radius:10px;
  &:hover {
    box-shadow: inset 1px 1px 2px red;
  }
`;

</script>

<style>
</style>