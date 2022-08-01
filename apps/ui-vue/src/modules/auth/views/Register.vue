<script lang="ts" setup>
import { reactive, ref } from 'vue';
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';

import Title from '../../../components/TitleStyled.vue';
import FormWrapper from '../../../components/FormWrapperStyled.vue';
import Button from '../../../components/ButtonStyled.vue';
import router from '../../../router/index';

const schema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email("Format invalid").required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const errors = ref();

const formRef = ref<HTMLFormElement | null>(null);
const form = reactive({
  name: 'uno',
  email: 'dos',
  password: 'tres',
});

const onSubmit = async (values) => {
  const userStore = useUserStore();
  const alertStore = useAlertStore(); 
  try {
    await userStore.register(values);
    await router.push('/login');
    alertStore.succes('Registration successful');    
  }
  catch(error) {
    alertStore.error(error);
  }
};
</script>

<template>
  <Title msg="Te damos la bienvenida a Airbnb"></Title>

  <form-wrapper>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">        
        <Field
          name="firstName"
          type="text"
          placeholder="First Name"
          class="form-control"
          :class="{ 'is-invalid': errors.firstName }"
        />
        <div class="invalid-feedback">{{ errors.firstName }}</div>
      </div>
      <div class="form-group">        
        <Field
          name="lastName"
          type="text"
          placeholder="Last Name"
          class="form-control"
          :class="{ 'is-invalid': errors.lastName }"
        />
        <div class="invalid-feedback">{{ errors.lastName }}</div>
      </div>
      <div class="form-group">        
        <Field
          placeholder="Username"
          name="username"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="form-group">        
        <Field
          placeholder="Email"
          name="email"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
        />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="form-group">        
        <Field
          name="password"
          placeholder="Password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="invalid-feedback">{{ errors.password }}</div>
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
    </Form>
  </form-wrapper>
</template>

<style scoped></style>
