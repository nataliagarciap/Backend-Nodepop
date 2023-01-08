'use strict';

//Hacer un script de inicialización de la base de datos

const readline = require('readline');

//cargar los modelos
const Anuncio = require('./models/Anuncios');

async function main() {
    //preguntar al usuario si quiere borrar la base de datos
    const continuar = await preguntaSiNo('Estas seguro que deseas borrar la base de datos?')
    if (!continuar) {
      process.exit();
    }
  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  await initAnuncios();
  //desconectamos de la base de datos 
  connection.close();

}

main().catch(err => console.log(`Ha ocurrido un error`, err));

async function initAnuncios() {
    //borrar anuncios
 const result = await  Anuncio.deleteMany();
 console.log(`Borrado ${result.deletedCount} anuncios.`);
 //crear anuncios iniciales 
 const inserted = await Anuncio.insertMany([
  {
    "nombre": "Bicicleta",
    "venta": true,
    "precio": 230.15,
    "foto": "./public/images/bici.jpg",
    "tags": [ "lifestyle", "motor"]
  },
  {
    "nombre": "iPhone 3GS",
    "venta": false,
    "precio": 50.00,
    "foto": "./public/images/iphone.png",
    "tags": [ "lifestyle", "mobile"]
  },

  {
    "nombre": "Teclado",
    "venta": true,
    "precio": 100.00,
    "foto": "./public/images/teclado.png",
    "tags": ["work", "lifestyle"]
  },
  {
    "nombre": "Mouse",
    "venta": false,
    "precio": 20.0,
    "foto": "./public/images/mouse.png",
    "tags": ["work", "lifestyle"]
  },
  {
    "nombre": "Auriculares",
    "venta": true,
    "precio": 64.0,
    "foto": "./public/images/auriculares.png",
    "tags": ["lifestyle"]
  },
  {
    "nombre": "Mochila",
    "venta": false,
    "precio": 35.30,
    "foto": "./public/images/mochila.png",
    "tags": ["work", "lifestyle"]
  }
 ]);

 console.log(`Agregados ${inserted.lenght} anuncios.`)

}

function preguntaSiNo(texto) {
    return new Promise((resolve, reject) => {
      const inter = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      inter.question(texto, respuesta => {
        inter.close();
        if (respuesta.toLowerCase() === 'si') {
          resolve(true);
          return;
        }
        resolve(false);
      })
    })
  }