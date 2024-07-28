const folderBase = {
    blocsInFolder: [],
    collaborative: false,
    colorid: 8,
    id: undefined, //number
    myColor: {id: 8, color: '0,0,0'},
    name: "",
    sectionsInFolder: [],
    userid: undefined //number
}

const sectionBase = {
    id: undefined, //number 
    section: "",
    orders: "", //example: '225|216|219||226' 
    folderid: undefined, //number 
    tasksInSections: []
}

const itemBase = {
    id: undefined, //number
    assignedto: undefined, //number
    content: "",
    creation: "", //example: '29112022'
    details: "",
    eventid: undefined, //number
    evento:null, 
    /*{ 
        id: undefined, //number
        event: ''//example: '2023-02-01'  
    }.*/
    folderid: null, //number

    myPriority: undefined, //number 
    priorityid: undefined, //nuumber

    sectionid: null, //number
    timeblockdate: null, //string
    timeblockend: null, //string
    timeblockstart: null, //string
    userid: undefined, //number

    myImages: [],
    mySubtasks: [],
    myTags: [],
    notifications: [],
}

export {folderBase, sectionBase, itemBase}