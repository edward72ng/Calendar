function getforSection(id, arr){
    const myId = parseInt(id)
    const section = arr.find((elem)=>{
        return elem.id == myId
    })

    const {tasksInSections, orders} = section
    const orderArray = orders.split("|")

    return [section, tasksInSections, orderArray]
}

const reorder = (arr, origin, destination) => {
    const result = [...arr]
    const [removed] = result.splice(origin, 1)
    result.splice(destination, 0, removed)
  
    return result
  }
  



const getNestedValue = (arrayObjects, arrayKeys) => {
    const copyArr = arrayObjects;
    const copyKeys = arrayKeys

    if (copyKeys.length === 1) {
        const arr = copyArr.filter((e)=>{
            return e.id == copyKeys[0].id
        })
        const res = arr[0][copyKeys[0].key]
        return res
    }

    const arr = copyArr.filter((e)=>{
        return e.id == copyKeys[0].id
    })
    const newArrObj = arr[0][copyKeys[0].key]
    copyKeys.shift()

    return getNestedValue(newArrObj, copyKeys)
} 

export {getforSection, reorder, getNestedValue}