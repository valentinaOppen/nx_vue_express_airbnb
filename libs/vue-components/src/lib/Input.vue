<template>
  <wrapper>
  <styled-input placeholder="@liqueflies" type="text" />
  <StyledInput></StyledInput>
</wrapper>
</template>

<script lang="ts">

import styled from 'vue3-styled-components';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'input',
});

const StyledInput = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

</script>

<style scoped></style>
