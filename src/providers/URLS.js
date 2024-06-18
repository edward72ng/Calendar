const tasksUrl = '/api/v1/inbox/get-all/2' //obtiene solo las tareas
const timeBlockDate = '/api/v1/inbox/time-block/2023-05-06'
const inboxUrl = '/api/v1/inboxtasks/'

const colorsUrl = '/api/v1/colors'
const myTagsUrl = '/api/v1/tags/my-tags'
const prioritiesUrl = '/api/v1/priorities/'

const projectsUrl = '/api/v1/folders/me' //obtiene solo folders
const myAll = '/api/v1/folders/all' //obtiene folders con todas las tareas
const withoutSections = '/api/v1/folders/without-sections'

const imagesBaseUrl = 'api/v1/images/'
const subTasksBaseUrl = '/api/v1/subtasks/'
const tagsBaseUrl = '/api/v1/tags/'
const funcTaksBaseUrl = '/api/v1/inbox/your-todos/'
const funcFoldersUrl = '/api/v1/folders/'
const funcSectionsBaseUrl = '/api/v1/sections/'

const reloadSectionsUrl = '/api/v1/sections//all/with-task/'

export {
    tasksUrl,
    timeBlockDate,
    inboxUrl,
    colorsUrl,
    myTagsUrl,
    prioritiesUrl,
    projectsUrl,
    myAll,
    withoutSections,
    imagesBaseUrl,
    subTasksBaseUrl,
    tagsBaseUrl,
    funcTaksBaseUrl,
    funcFoldersUrl,
    funcSectionsBaseUrl,
    reloadSectionsUrl}