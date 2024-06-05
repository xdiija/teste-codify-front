<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
            Livraria Codify
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menus
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          @link-click="handleLinkClick"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
        <router-view :user="user"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import authService from 'src/services/authService'
import { useRouter } from 'vue-router'

const linksList = [
    {
        title: 'Home',
        caption: '',
        icon: 'home',
        route: '/'
    },
    {
        title: 'Livros',
        caption: '',
        icon: 'menu_book',
        route: '/livros'
    },
    {
        title: 'Autores',
        caption: '',
        icon: 'person',
        route: '/autores'
    },
    {
        title: 'Editoras',
        caption: '',
        icon: 'edit',
        route: '/editoras'
    },
    {
        title: 'Logout',
        caption: '',
        icon: 'exit_to_app',
        route: 'login'
    }
]

export default defineComponent({
    name: 'MainLayout',

    components: {
        EssentialLink
    },

    setup () {
        const router = useRouter()
        const leftDrawerOpen = ref(true)
        const { getUser, clearAuth } = authService()
        const handleLinkClick = (route) => {
            if (route === 'login') {
                clearAuth()
                router.push({ name: 'login' })
            }
        }

        return {
            user: getUser(),
            essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            },
            handleLinkClick
        }
    }
})
</script>
