<template>
  <styled-title>{{msg}}</styled-title>
</template>

<script setup lang="ts">

  import styled from "vue3-styled-components";

 const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 30px;
`;

  defineProps({
    msg: String
  })

</script>

<style>

</style>