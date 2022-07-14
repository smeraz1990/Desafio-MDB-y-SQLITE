const knex = require('knex')
const configSQL3 = {
    client: 'sqlite3',
    connection: { filename: `./mysql.sqlite`, },
    useNullAsDefault: true
}
const databaseConnection = knex(configSQL3)
createTable = async() => {
    try {
        await databaseConnection.schema.hasTable('productos').then(function(exists) {
            if (!exists) {
                console.log("voy a crear tabla")
                return databaseConnection.schema.createTable('productos ', producttable => {
                    producttable.increments('ProductoID').primary()
                    producttable.string('title', 100).notNullable()
                    producttable.integer('price').notNullable()
                    producttable.string('thumbnail', 100).notNullable()
                })
            } else {
                //console.log("no creo tabla")
            }
        });
        databaseConnection.destroy()

    } catch (err) {
        console.log(err)
        databaseConnection.destroy()
    }
}

createTable()


class Contenedor {
    constructor() {}
    async save(Objeto) {

        try {
            const idInsert = await databaseConnection('productos').insert(Objeto, "productoid")
            console.log(`El id insertado es: ${idInsert[0]}`)
            databaseConnection.destroy()

        } catch (err) {
            console.log(err)
            databaseConnection.destroy()
        }
    }



    async getByid(index) {
        try {
            const camposProductos = ['productoid as id', 'title', 'price', 'thumbnail']
            const resultReadProductos = await databaseConnection
                .from('productos').select(camposProductos)
                .where({ productoid: `${index}` })
            databaseConnection.destroy()
            if (resultReadProductos.length == 0) {
                console.log(`El id ${index} del producto no se encuentraen la base de datos`)

            } else {
                console.log(resultReadProductos)
            }
        } catch (err) {
            console.log(err)
            databaseConnection.destroy()
        }
    }


    async getAll() {
        try {
            const camposProductos = ['productoid as id', 'title', 'price', 'thumbnail']
            const resultReadProductos = await databaseConnection
                .from('productos').select(camposProductos)
            databaseConnection.destroy()
            if (resultReadProductos.length == 0) {
                console.log(`La base de datos esta vacia`)

            } else {
                console.log(resultReadProductos)
            }
        } catch (err) {
            console.log(err)
            databaseConnection.destroy()
        }
    }

    async deletebynumber(IndexEliminar) {
        try {
            const resultReadProductos = await databaseConnection
                .from('productos').where({ productoid: `${IndexEliminar}` }, )
                .del()
            databaseConnection.destroy()
            if (resultReadProductos == 0) {
                console.log(`El id no existe en la BD`)

            } else {
                console.log(`El id ${IndexEliminar} del producto fue eliminado`)
            }
        } catch (err) {
            console.log(err)
            databaseConnection.destroy()
        }
    }

    async deleteall() {
        try {
            const resultReadProductos = await databaseConnection
                .from('productos').truncate()
            databaseConnection.destroy()
            console.log(resultReadProductos)

            console.log(`Se eliminaron todos los registos de la bd`)
        } catch (err) {
            console.log(err)
            databaseConnection.destroy()
        }
    }


}

const contenedor = new Contenedor()
    //contenedor.createTable()
contenedor.save({ title: 'Producto2', price: '22.90', thumbnail: '2' })
    //contenedor.getByid(5)
    //contenedor.getAll()
    //contenedor.deletebynumber(1)
    //contenedor.deleteall()