<script lang="ts" setup>

import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';

import Title from '../../../components/TitleStyled.vue';
import FormWrapper from '../../../components/FormWrapperStyled.vue';
import Button from '../../../components/ButtonStyled.vue';

import { useAuthStore } from '../store/auth.store';
import { swalError } from '@airbnb-vue-express/ui-helpers'



const schema = Yup.object().shape({    
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const onSubmit = async (values:any) => {
  const authStore = useAuthStore();  
  try {
    await authStore.login(values);    
  }
  catch(error:any) {    
    swalError(error);
  } 
}


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
          border
          color="primary"
          size="lg"
          type="submit"
          text="Login"
          :disabled="isSubmitting"
        ></Button>
        <Button 
          border         
          color="secondary"
          size="lg"
          to="/register"
          text="¿Don't have an account?"
        ></Button>
      </div>
    </Form>
  </form-wrapper>
</template>



<style scoped></style>
