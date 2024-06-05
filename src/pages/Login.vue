<template>
  <q-page class="flex flex-center">
    <q-card
        style="width: 300px;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;"
    >
      <form>
        <q-card-section class="q-pt-none full-width q-mt-lg"> 
            <q-input
                filled
                v-model="login.email"
                label="Email"
                autocomplete="email"
            />
            <q-input
                class="q-mt-sm"
                v-model="login.senha"
                filled
                label="Password"
                :type="login.isPwd ? 'password' : 'text'"
                autocomplete="current-password"
            >
                <template v-slot:append>
                <q-icon
                    :name="login.isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="login.isPwd = !login.isPwd"
                />
                </template>
            </q-input>
        </q-card-section>
    </form>
      <q-card-actions class="full-width">
        <q-btn
            class="q-mx-sm"
            color="primary"
            label="Login"
            style="width: 100%"
            @click="onSubmit"
        />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
import authService from 'src/services/authService'

export default {
    name: 'LoginPage',
    data () {
        return {
            login: {
                email: 'djalma@gmail.com',
                senha: '98753210',
                isPwd: true
            }
        }
    },
    methods: {
        async onSubmit () {
            const { post, setToken, setUser } = authService('login')
            const userCredentials = { email: this.login.email, senha: this.login.senha }
            try {
                const { data } = await post(userCredentials)
                setToken(data.access_token)
                setUser(data.user)
                this.$router.push({ name: 'home' })
            } catch (error) {
                console.error('Login error:', error)
            }
        }
    }
}
</script>
