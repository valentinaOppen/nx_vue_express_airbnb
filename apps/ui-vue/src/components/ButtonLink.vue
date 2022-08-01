<template>
  
</template>

<script setup lang="ts">

import styled from "vue3-styled-components";

defineProps({
  text: String,
  color: String,
  size: String,
  to: String
})

const btnProps = { color: String, size: String  };

const StyledButton = styled("a", btnProps)`
  font-size:  ${props => (props.size === 'lg' ? '1.3rem' : '1rem')};  
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 3px 10px;
  margin-top: 20px;
  background: ${props => (props.color === 'primary' ? "var(--color-primary)" : "white")};
  color: ${props => (props.color === 'primary' ? "white" : "var(--color-primary)")};
  width: ${props => (props.size === 'lg' ? '90%' : '30%')};  
`;

</script>

<style>

</style>