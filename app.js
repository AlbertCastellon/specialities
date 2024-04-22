const express = require('express')
const app = express()
const usersData = require('./users.js')
const marketingUsers = []
const developersUsers = []
const ventasUsers = []
const qasUsers = []
const filterUsers = (usersInfo) => {
    usersInfo.forEach(element => {
        if(element.specialty === 'marketing'){
            marketingUsers.push(element)
        }else if(element.specialty === 'developers'){
            developersUsers.push(element)
        }else if(element.specialty === 'ventas'){
            ventasUsers.push(element)
        }else if(element.specialty === 'QAs'){
            qasUsers.push(element)
        }
    })
}
filterUsers(usersData)
const createTable = (specialty) => {
    let strTable = `<tablehead><th>ID</th><th>Name</th><th>Age</th></tablehead>`
    specialty.forEach(element => {
        strTable = strTable + `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.age}</td></tr>`
    })
    return strTable
}
const tableMarketing = createTable(marketingUsers)
const tableDevelopers = createTable(developersUsers)
const tableVentas = createTable(ventasUsers)
const tableQas = createTable(qasUsers)

app.get('/', (req, res) => {
    res.send(`<h1>Home</h1><ul><li><a href="/marketing">Marketing</a></li><li><a href="/developers">Developers</a></li><li><a href="/ventas">Ventas</a></li><li><a href="/qas">QAs</a></li></ul>`)
})
app.get('/marketing', (req, res) => {
    res.send(`<h1>Marketing</h1><ul><li><a href="/">Home</a></li><li><a href="/developers">Developers</a></li><li><a href="/ventas">Ventas</a></li><li><a href="/qas">QAs</a></li></ul><h2>Usuarios</h2><p>En marketing trabajan ${marketingUsers.length} personas</p><table>${tableMarketing}</table>`)
})
app.get('/developers', (req, res) => {
    res.send(`<h1>Developers</h1><ul><li><a href="/">Home</a></li><li><a href="/marketing">Marketing</a></li><li><a href="/ventas">Ventas</a></li><li><a href="/qas">QAs</a></li></ul><h2>Usuarios</h2><p>Developers tiene ${developersUsers.length} miembros</p><table>${tableDevelopers}</table>`)
})
app.get('/ventas', (req, res) => {
    res.send(`<h1>Ventas</h1><ul><li><a href="/">Home</a></li><li><a href="/marketing">Marketing</a></li><li><a href="/developers">Developers</a></li><li><a href="/qas">QAs</a></li></ul><h2>Usuarios</h2><p>Los que trabajan en ventas son ${ventasUsers.length} personas</p><table>${tableVentas}</table>`)
})
app.get('/qas', (req, res) => {
    res.send(`<h1>QAs</h1><ul><li><a href="/">Home</a></li><li><a href="/marketing">Marketing</a></li><li><a href="/developers">Developers</a></li><li><a href="/ventas">Ventas</a></li></ul><h2>Usuarios</h2><p>QAs está compuesto por ${qasUsers.length} miembros</p><table>${tableQas}</table>`)
})
app.use((req, res) => {
    res.status(404).send('<h1>Error 404 Página no encontrada</h1><a href="/">Home</a>')
})
app.listen(3000, () => {
    console.log('http://localhost:3000')
})
