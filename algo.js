function* generadorIds(id=700){
    while(true){
        yield id
        id++
    }
}

let ids = [] 
let id = generadorIds().next()
ids.push(id)
ids.push(id)
console.log(ids[0], ids[1])
let date= new Date("2022-09-30")
console.log(date)
console.log(date.getDay(), date.getMonth(), date.getFullYear())
console.log(Date())

