const { Socket } = require('dgram')
const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Servisdor conectado pueto 8080') })
const io = new IOServer(expressServer)
const database = require('./database')
const qryInsert = require('../controller/CreateInsertQry')
const qryRead = require('../controller/ReadQry')
let ProductosDB = []
let messagesArray = []
    //Mandamos llamar la funcion para crear la tabla
qryInsert.createTable()
    //Mandamos llamar la funcion para crear la tabla
qryInsert.createTableMensajes()

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    //console.log(`Nuevo usuario conectado ${socket.id}`)
    socket.on('client:product', async productInfo => {
        await qryInsert.InsertProductos(productInfo)
        ProductosDB = await qryRead.ReadProductos()
        io.emit('server:productos', ProductosDB)
            //console.log('si llegue primero', ProductosDB)
    })
    socket.emit('server:productos', ProductosDB)
        //Socket Mensajes
    socket.emit('server:mensajes', messagesArray)
    socket.on('client:menssage', async messageInfo => {
        //fs.appendFileSync(`./Messages/appMensajes.txt`, JSON.stringify(messageInfo))
        await qryInsert.InsertMensajes(messageInfo)
        messagesArray = await qryRead.ReadMensajes()
        io.emit('server:mensajes', messagesArray)
            //console.log(messageInfo)
    })
})