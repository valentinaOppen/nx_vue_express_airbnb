<template>
  <wrapper><slot></slot></wrapper>
</template>

<script lang="ts" setup>
  import styled from 'vue3-styled-components';
  
  const Wrapper = styled.section`
  width: 35%;
  margin: 0px auto;
  padding: 1em;
  background: transparent;
  /* box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 26%);
  -webkit-box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 26%);
  -moz-box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 26%);
  border-radius: 10px; */
`;

</script>

<style>

</style>