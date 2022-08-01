<template>
  <wrapper><slot></slot></wrapper>
</template>

<script lang="ts" setup>
  import styled from 'vue3-styled-components';
  
  const Wrapper = styled.section`
  width: 40%;
  margin: 0px auto;
  padding: 1em;
  background: transparent;
  border: solid 2px black;
`;

</script>

<style>

</style>