import useApi from 'src/composables/UseApi'

export default function autoresService () {
    const { list, getByID, post, update, remove } = useApi('autores')

    return {
        list,
        getByID,
        post,
        update,
        remove
    }
}
