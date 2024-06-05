<template>
    <q-page padding>
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="row q-col-gutter-sm"
        >
            <q-input
                outlined
                v-model="form.titulo"
                label="Titulo"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
            />
            <q-input
                outlined
                v-model="form.descricao"
                label="Descrição"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
            />
            <q-input
                outlined
                v-model="form.publicado_em"
                label="Publicação"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
            />
            <q-select
                outlined
                v-model="form.autor_id"
                :options="autores"
                class="col-lg-6 col-xs-12"
                label="Autor"
                option-value="id"
                option-label="nome"
                emit-value
                map-options
            />
            <q-select
                outlined
                v-model="form.editora_id"
                :options="editoras"
                class="col-lg-6 col-xs-12"
                label="Editora"
                option-value="id"
                option-label="nome"
                emit-value
                map-options
            />
            <div class="col-lg-12 col-xs-12">
                <q-btn
                    label="Salvar"
                    type="submit"
                    class="float-right"
                    color="primary"
                    icon="save"
                />
                <q-btn
                    label="Limpar"
                    type="reset"
                    color="primary"
                    class="float-right q-mr-sm"
                    icon="clear_all"
                    outline
                />
                <q-btn
                    label="Cancelar"
                    color="primary"
                    class="float-right q-mr-sm"
                    icon="clear"
                    outline
                    @click="onCancel"
                />
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import livrosService from 'src/services/livrosService'
import autoresService from 'src/services/autoresService'
import editorasService from 'src/services/editorasService'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
    name: 'LivrosForm',
    setup() {
        const $q = useQuasar()
        const router = useRouter()
        const route = useRoute()
        const { post, getByID, update } = livrosService()
        const form = ref({
            titulo: null,
            descricao: null,
            editora_id: null,
            autor_id: null,
            publicado_em: null
        })
        const editoras = ref([])
        const autores = ref([])

        onMounted(async () => {
            if (route.params.id) {
                await getLivro(route.params.id)
            }
            await getEditoras()
            await getAutores()
        })

        const getLivro = async (id) => {
            try {
                const res = await getByID(id)
                form.value = res.data
            } catch (error) {
                console.error(error)
            }
        }

        const getEditoras = async () => {
            try {
                const { list } = editorasService()
                const res = await list()
                editoras.value = res.data
            } catch (error) {
                console.error(error)
            }
        }

        const getAutores = async () => {
            try {
                const { list } = autoresService()
                const res = await list()
                autores.value = res.data
            } catch (error) {
                console.error(error)
            }
        }

        const updateLivro = async () => {
            try {
                const res = await update(form.value)
                if (res.status == 'SUCCESS') {
                    notifyAndRedirect()
                } else {
                    $q.notify({
                        message: 'Erro ao registrar!',
                        icon: 'error',
                        color: 'negative'
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }

        const newLivro = async () => {
            try {
                const res = await post(form.value)
                notifyAndRedirect()
            } catch (error) {
                console.error(error)
            }
        }

        const notifyAndRedirect = () => {
            $q.notify({
                message: 'Registrado com sucesso!',
                icon: 'check',
                color: 'positive'
            })
            router.push({ name: 'livros' })
        }

        const onSubmit = async () => {
            form.value.id ? updateLivro() : newLivro()
        }

        const onCancel = () => {
            router.push({ name: 'livros' })
        }

        return {
            form,
            onSubmit,
            onCancel,
            editoras,
            autores,
            onReset() {
                form.value = {
                    titulo: null,
                    descricao: null,
                    editora_id: null,
                    autor_id: null,
                    publicado_em: null
                }
            }
        }
    }
})
</script>