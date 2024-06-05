import useApi from 'src/composables/UseApi'

export default function livrosService () {
    const { list, getByID, post, update, remove } = useApi('livros')

    return {
        list,
        getByID,
        post,
        update,
        remove
    }
}
