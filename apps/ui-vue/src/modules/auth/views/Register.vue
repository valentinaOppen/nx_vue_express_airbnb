<script lang="ts" setup>
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';

import Title from '../../../components/TitleStyled.vue';
import FormWrapper from '../../../components/FormWrapperStyled.vue';
import Button from '../../../components/ButtonStyled.vue';
import router from '../../../router/index';
import { useAuthStore } from '../store/auth.store';
// import { useSwal } from '../../../helpers/swal';
import { useSwal } from '@airbnb-vue-express/ui-helpers'


const schema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email("Format invalid").required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(6, 'Password must be at least 6 characters'),
});


const onSubmit = async (values:any) => {
  const authStore = useAuthStore();    
  try {
    const resp:any = await authStore.register(values);    
    useSwal('Done!', resp.response ? resp.response : 'There is not a message','success', 'Ok');
    setTimeout(() => {
      router.push('/login');    
    }, 2000);
    
  }
  catch(error:any) {    
    useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
  }     
};

</script>

<template>
  <Title msg="Welcome to Airbnb"></Title>

  <form-wrapper>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors, isSubmitting }"
    >
      <div class="form-group">        
        <Field
          name="firstname"
          type="text"
          placeholder="First Name"
          class="form-control"
          :class="{ 'is-invalid': errors.firstname }"
        />
        <div class="invalid-feedback">{{ errors.firstname }}</div>
      </div>
      <div class="form-group">        
        <Field
          name="lastname"
          type="text"
          placeholder="Last Name"
          class="form-control"
          :class="{ 'is-invalid': errors.lastname }"
        />
        <div class="invalid-feedback">{{ errors.lastname }}</div>
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
      <div class="form-group">        
        <Field
          name="passwordConfirmation"
          placeholder="Confirm password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.passwordConfirmation }"
        />
        <div class="invalid-feedback">{{ errors.passwordConfirmation }}</div>
      </div>
     <div class="flex flex-col gap-y-4 mt-4">
        <Button
          color="primary"
          size="lg"
          type="submit"
          text="Create account"
          :disabled="isSubmitting"
        ></Button>
        <Button          
          color="secondary"
          size="lg"
          to="/login"
          text="¿Already have an account?"
        ></Button>
      </div>
    </Form>
  </form-wrapper>
</template>

<style scoped></style>
