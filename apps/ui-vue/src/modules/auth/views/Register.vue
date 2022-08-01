<template>
  <Title msg="Te damos la bienvenida a Airbnb"></Title>

  <ul class="error-messages">
    <li v-for="(error, field) in errors" :key="field">
      {{ field }} {{ error ? error[0] : '' }}
    </li>
  </ul>

  <form-wrapper>
    <form @submit.prevent="onSubmit" ref="formRef">
      <div data-validate="Ingrese su nombre">
        <input-vue
          v-model="form.name"
          placeholder="Username"
          required
        ></input-vue>
        <span class="focus-input100" data-placeholder="&#xe82a;"></span>
      </div>

      <div data-validate="Ingrese correo">
        <input-vue
          v-model="form.email"
          placeholder="Email"
          required
        ></input-vue>
        <span class="focus-input100" data-placeholder="&#xe818;"></span>
      </div>

      <div data-validate="Ingrese contraseña">
        <input-vue
          v-model="form.password"
          placeholder="Password"
          required
          type="password"
        ></input-vue>
        <span class="focus-input100" data-placeholder="&#xe80f;"></span>
      </div>
      <div class="flex flex-col gap-y-4 mt-4">
        <Button
          color="primary"
          size="lg"
          type="submit"
          text="Crear cuenta"
          :disabled="!form.email || !form.password"
        ></Button>
        <Button
          color="secondary"
          size="lg"
          to="/login"
          text="¿Ya tienes cuenta?"
        ></Button>
      </div>
    </form>
  </form-wrapper>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import InputVue from '../../../components/StyledInput.vue';
import Title from '../../../components/Title.vue';
import FormWrapper from '../../../components/FormWrapper.vue';
import Button from '../../../components/Button.vue';

const errors = ref()

const formRef = ref<HTMLFormElement | null>(null)
const form = reactive({
  name: 'uno',
  email: 'dos',
  password: 'tres',
  // name: {type : String, required: true},
  // email: {type : String, required: true},
  // password: {type : String, required: true},
});


const onSubmit = async () => {
  errors.value = {};
  console.log("VALID", formRef.value?.checkValidity());
  if (!formRef.value?.checkValidity()) return

  console.log('ON SUBMIT', form);
};


</script>

<style scoped></style>
