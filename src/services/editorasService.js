import useApi from 'src/composables/UseApi'

export default function editorasService () {
    const { list, getByID, post, update, remove } = useApi('editoras')

    return {
        list,
        getByID,
        post,
        update,
        remove
    }
}
