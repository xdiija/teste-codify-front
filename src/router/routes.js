const routes = [
    {
        path: '/',
        redirect: 'home',
        component: () => import('layouts/MainLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            { 
                path: '/home', name: 'home', props: true, 
                component: () => import('src/pages/HomePage.vue') 
            },
            { 
                path: '/livros', name: 'livros', 
                component: () => import('src/pages/LivrosPage.vue') 
            },
            { 
                path: '/livros-form/:id?', name: 'livrosForm', 
                component: () => import('src/pages/LivrosForm.vue') 
            },
            { 
                path: '/autores', name: 'autores', 
                component: () => import('src/pages/AutoresPage.vue') 
            },
            { 
                path: '/autores-form/:id?', name: 'autoresForm', 
                component: () => import('src/pages/AutoresForm.vue') 
            },
            { 
                path: '/editoras', name: 'editoras', 
                component: () => import('src/pages/EditorasPage.vue') 
            },
            { 
                path: '/editoras-form/:id?', name: 'editorasForm', 
                component: () => import('src/pages/EditorasForm.vue') 
            }
        ]
    },
    {
        path: '/auth',
        redirect: 'login',
        name: 'Auth',
        component: () => import('layouts/LoginLayout.vue'),
        children: [
            { 
                path: '/login', name: 'login', 
                component: () => import('pages/Login.vue') 
            }
        ]
    },

    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
