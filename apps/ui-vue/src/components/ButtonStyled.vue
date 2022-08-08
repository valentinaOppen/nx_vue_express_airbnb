<template>
<styled-anchor v-if="to" :href="to" :color="color" :size="size">{{text}}</styled-anchor>
<styled-button v-else :color="color" :size="size"><slot></slot>{{text}}</styled-button>

</template>

<script setup lang="ts">
import styled from "vue3-styled-components";


defineProps({
  text: String,
  color: String,
  size: String,
  to: String,
  border: Boolean
})

const btnProps = { color: String, size: String, border: Boolean };

const StyledButton = styled("button", btnProps)`
  font-size:  ${props => (props.size === 'lg' ? '1.4rem' : '1rem')};  
  border: border ? '2px solid palevioletred' : 'none !important';
  border-radius: 3px;
  padding: 3px 10px;
  margin: auto;
  background: ${props => (props.color === 'primary' ? "var(--color-primary)" : props.color === 'secondary' ? "white" : "transparent")};
  color: ${props => (props.color === 'primary' ? "white" : "var(--color-primary)")};
  width: ${props => (props.size === 'lg' ? '100%' : props.size ==='sm' ? '10%' : '30%')};    
   &:focus {
        outline: none;
        /* box-shadow: 0px 0px 2px red; */
    }
`;

const StyledAnchor = styled("a", btnProps)`
  font-size:  ${props => (props.size === 'lg' ? '1.4rem' : '1rem')};  
  border: 2px solid palevioletred;
  border-radius: 3px;
  padding: 3px 10px;
  margin: auto;
  background: ${props => (props.color === 'primary' ? "var(--color-primary)" : "white")};
  color: ${props => (props.color === 'primary' ? "white" : "var(--color-primary)")};
  width: ${props => (props.size === 'lg' ? '100%' : '30%')};  
`

</script>

<style>

</style>