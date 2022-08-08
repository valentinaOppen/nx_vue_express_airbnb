<template>
  <styled-input :placeholder="placeholder"/>  
</template>


<script lang="ts" setup>
import styled from "vue3-styled-components";

defineProps({
  placeholder: String
})

const StyledInput = styled.input`  
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  width:90%;
  /* color: rgb(248 113 113); */
  border: solid 1px lightgrey;
  border-radius:10px;
  outline: none !important;
  &:hover {
    box-shadow: 0px 0px 3px 0px rgb(248 113 113)
  };
  &:focus-visible {
    /* box-shadow: 0px 0px 3px 0px rgb(248 113 113) */
    outline: none !important;
  };
`;

</script>

<style>
</style>