class GlobalState {
  constructor() {
    if (!GlobalState.instance) {
      this.value = [];
      this.functions = {
        folder: undefined,
        dispatchs: []
      }
      GlobalState.instance = this;
    }         

    return GlobalState.instance;
  }

  getValue() {
    return this.value;
  }

  setValue(data) {
    this.value = data
  }

  setFolder(folderId){
    this.functions.dispatchs = []
    this.functions.folder = folderId;
  }
  setFirstFunction(funct){
    this.functions.dispatchs = []
    this.functions.dispatchs.push(funct)
    ////console.log('COMPLETO FIRST',this.functions)
  }
  setMoreFunctions(funct){
    this.functions.dispatchs.push(funct)
    ////console.log('COMPLETO MORE',this.functions)
  }

  getDispatch(sectionId){
    const items =  this.functions.dispatchs.find(elem => elem.id == sectionId)?.items
    const dispatch =  this.functions.dispatchs.find(elem => elem.id == sectionId)?.dispatch
    const dispatchSections = this.functions.dispatchs.find(elem => elem.id == sectionId)?.dispatchSections
    const order = this.functions.dispatchs.find(elem => elem.id == sectionId)?.order
    //const setAnimation = this.functions.dispatchs.find(elem => elem.id == sectionId)?.setAnimation
    return [dispatch, dispatchSections, items, order]
  }
  getUsingPath(path, arrayState){
    ////console.log('PATH', path)
    if(path.length == 0){
      return arrayState
    }else{
      const idPath = path.shift()
      ////console.log('THIS ARRSTATE', arrayState)
      const objItem = arrayState.find(elem => elem.id == idPath)
      ////console.log(objItem, idPath)
      const objPath = path.shift()
      const arrItems = objItem[objPath]
      ////console.log('THIS ARRITEMS', arrItems)

      return this.getUsingPath(path, arrItems)
    }
  }

  changeOrderSection(folderId, sectionId, newStringOrder){
    const folder = this.value.find(elem => elem.id == folderId)
    const {sectionsInFolder} = folder
    const section = sectionsInFolder.find(section => section.id == sectionId)
    section.orders = newStringOrder
  }

  addItemInValue(path, newItem){
    //path: [31,'blocksInfolder']
    //path: [3,'sectionsInFolder', 12, 'tasksInSection']
    //console.log('THISVALUE DE ADDITEMSING', this.value)
    const arrItems = this.getUsingPath(path, this.value)
    //console.log(arrItems)
    arrItems.push(newItem)
  }

  deleteItemInValue(path, id){
    //path: [31,'blocksInfolder']
    //path: [3,'sectionsInFolder', 12, 'tasksInSection']
    //console.log('THISVALUE DE DELETEITEMSING', this.value)
    const arrItems = this.getUsingPath(path, this.value)
    //console.log(arrItems)
    const index = arrItems.findIndex(elem => elem.id == id)
    if(index != -1){
      arrItems.splice(index, 1)
    }
  }

}

const instance = new GlobalState();

export default instance;
