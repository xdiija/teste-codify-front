<template>
  <div class="q-pa-md">
    <q-table
        title="Receitas"
        :rows="rows"
        :columns="columns"
        row-key="name">
        <template v-slot:top>
            <span class="text-h5">Livros</span>
            <q-space />
            <q-btn
                color="primary"
                label="Adicionar"
                icon="add"
                :to="{ name: 'livrosForm' }"
            />
        </template>
        <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-sm">
                <q-btn
                    icon="edit"
                    color="warning"
                    dense size="sm"
                    @click="handleEdit(props.row.id)"
                />
                <q-btn
                    icon="delete"
                    color="negative"
                    dense size="sm"
                    @click="handleDelete(props.row.id)"
                />
            </q-td>
        </template>
  </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import livrosService from 'src/services/livrosService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'LivrosPage',
    setup () {
        const $q = useQuasar()
        const router = useRouter()
        const rows = ref([])
        const { list, remove } = livrosService()
        const columns = [
            {
                label: 'Titulo',
                field: 'titulo',
                name: 'titulo',
                sortable: true,
                align: 'left'
            },
            {
                label: 'Descrição',
                field: 'descricao',
                name: 'descricao',
                sortable: false,
                align: 'left'
            },
            {
                label: 'Autor',
                field: row => row.autor.nome,
                name: 'autor',
                sortable: true,
                align: 'left'
            },
            {
                label: 'Editora',
                field: row => row.editora.nome,
                name: 'editora',
                sortable: true,
                align: 'left'
            },
            {
                label: 'Publicação',
                field: 'publicado_em',
                name: 'publicado_em',
                sortable: true,
                align: 'left'
            },
            {
                label: 'Ações',
                field: 'actions',
                name: 'actions',
                align: 'right'
            }
        ]

        onMounted(() => {
            getData()
        })

        const getData = async () => {
            try {
                const { data } = await list()
                rows.value = data
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }

        const handleDelete = async (id) => {
            try {
                $q.dialog({
                    title: 'Confirmação',
                    message: `Deseja realmente apagar o registro nº ${id}?`,
                    cancel: {
                        label: 'Cancelar',
                        color: 'negative'
                    },
                    ok: {
                        label: 'Confirmar',
                        color: 'positive',
                        textColor: 'yellow'
                    },
                    persistent: true
                }).onOk(async () => {
                    await remove(id)
                    $q.notify({
                        message: `Registro ${id} removido!`,
                        icon: 'check',
                        color: 'positive'
                    })
                    await getData()
                })
            } catch (error) {
                $q.notify({
                    message: 'Erro ao apagar!',
                    icon: 'times',
                    color: 'negative'
                })
            }
        }

        const handleEdit = (id) => {
            router.push({ name: 'livrosForm', params: { id } })
        }

        return {
            rows,
            columns,
            handleDelete,
            handleEdit
        }
    }
})
</script>
