<template>
  <div class="base-screen">
    <div class="base-card">
      <div class="space-y-4">
        <h1 class="base-heading">Registration</h1>
        <div>
          <label for="firstName" class="base-label">First name</label>
          <input v-model="fields.firstName" type="text" class="base-input"/>
        </div>
        <div>
          <label for="lastName" class="base-label">Last name</label>
          <input v-model="fields.lastName" type="text" class="base-input"/>
        </div>
        <div>
          <label for="email" class="base-label">Email</label>
          <input v-model="fields.email" type="text" class="base-input"/>
        </div>
        <div>
          <label for="phoneNumber" class="base-label">Phone number</label>
          <input v-model="fields.phoneNumber" type="text" class="base-input"/>
        </div>
        <div>
          <label for="password" class="base-label">Password</label>
          <input v-model="fields.password" type="text" class="base-input"/>
        </div>
        <div>
          <label for="passwordConfirm" class="base-label">Password confirm</label>
          <input v-model="fields.passwordConfirm" type="text" class="base-input"/>
        </div>
      </div>
      <button @click.prevent="handleSubmit" class="btn-blue">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useMutation} from 'villus';
import {useRouter} from 'vue-router'

export default {
  name: "register",
  setup() {
    const router = useRouter()
    const Signup = /*GraphQL*/`
      mutation signup($input: SignupInput!) {
        signup(input: $input) {
          message
          token
          user {
            id
          }
        }
      }
    `;
    const {data, error, execute} = useMutation(Signup);

    const fields = ref({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: ''
    })

    const handleSubmit = () => {
      if (!!fields.value.firstName && !!fields.value.lastName && !!fields.value.email && !!fields.value.phoneNumber && !!fields.value.password) {
        execute({input: fields.value}).then(() => {
          console.log('data', data.value)
          console.log('error', error?.value?.graphqlErrors)
          if (!!data.value.signup) {
            router.push({
              name: 'home'
            })
          }
        })
      }
    }

    return {
      fields,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.btn-blue {
  @apply mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide
}

.base-label {
  @apply block mb-1 text-gray-600 font-semibold
}

.base-input {
  @apply bg-indigo-50 px-4 py-2 outline-none rounded-md w-full
}

.base-heading {
  @apply text-center text-2xl font-semibold text-gray-600
}

.base-card {
  @apply bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm
}

.base-screen {
  @apply h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full
}
</style>
