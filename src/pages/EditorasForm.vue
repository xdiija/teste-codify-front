<template>
    <q-page padding>
        <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="row q-col-gutter-sm"
        >
            <q-input
                outlined
                v-model="form.nome"
                label="Nome"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
            />
            <q-input
                outlined
                v-model="form.endereco"
                label="Endereço"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
            />
            <q-input
                outlined
                v-model="form.telefone"
                label="Telefone"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório!']"
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
import editorasService from 'src/services/editorasService'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
    name: 'EditorasForm',
    setup() {
        const $q = useQuasar()
        const router = useRouter()
        const route = useRoute()
        const { post, getByID, update } = editorasService()
        const form = ref({
            nome: null,
            endereco: null,
            telefone: null
        })

        onMounted(async () => {
            if (route.params.id) {
                await getEditora(route.params.id)
            }
        })

        const getEditora = async (id) => {
            try {
                const res = await getByID(id)
                form.value = res.data
            } catch (error) {
                console.error(error)
            }
        }

        const updateEditora = async () => {
            try {
                const res = await update(form.value)
                console.log(res.data)
                notifyAndRedirect()
            } catch (error) {
                console.error(error)
            }
        }

        const newEditora = async () => {
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
            router.push({ name: 'editoras' })
        }

        const onSubmit = async () => {
            form.value.id ? updateEditora() : newEditora()
        }

        const onCancel = () => {
            router.push({ name: 'editoras' })
        }

        return {
            form,
            onSubmit,
            onCancel,
            onReset() {
                form.value = {
                    nome: null,
                    endereco: null,
                    telefone: null
                }
            }
        }
    }
})
</script>