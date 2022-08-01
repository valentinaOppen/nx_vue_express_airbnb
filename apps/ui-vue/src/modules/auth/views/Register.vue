<template>
<Title msg="Te damos la bienvenida a Airbnb"></Title>
  <div class="border-dashed border-2">probando wailtinig</div>
    <form-wrapper>
      <form class="login100-form validate-form p-b-33 p-t-5"
          @submit.prevent="onSubmit">

          <div class="wrap-input100 validate-input" data-validate = "Ingrese su nombre">
              <input-vue v-model="userForm.name" placeholder="Username" required></input-vue>            
              <span class="focus-input100" data-placeholder="&#xe82a;"></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate = "Ingrese correo">
              <input-vue v-model="userForm.email" placeholder="Email" required></input-vue>
              <span class="focus-input100" data-placeholder="&#xe818;"></span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="Ingrese contraseña">
              <!-- <input v-model="userForm.password" class="input100" type="password" placeholder="Contraseña" required> -->
              <input-vue v-model="userForm.password" placeholder="Password" required type="password"></input-vue>
              <span class="focus-input100" data-placeholder="&#xe80f;"></span>
          </div>

          <div class="container-login100-form-btn m-t-32">
              <button type="submit" class="login100-form-btn">
                  Crear cuenta
              </button>

          </div>          

          <div class="container-login100-form-btn m-t-32">
              <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
          </div>
      </form>      
      </form-wrapper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import InputVue from '../../../components/StyledInput.vue';  
  import Title from '../../../components/Title.vue'; 
  import FormWrapper from '../../../components/FormWrapper.vue';

  const userForm = ref({
    name: 'uno',
    email: 'dos', 
    password: 'tres'
    // name: {type : String, required: true},
    // email: {type : String, required: true},
    // password: {type : String, required: true},
  })

  const onSubmit = async () => {
    console.log('ON SUBMIT', userForm.value);
  }

</script>

<style scoped></style>
