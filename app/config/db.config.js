// Importa la configuración del entorno desde el archivo env.js
const env = require('./env.js');

// Importa el módulo Sequelize
const Sequelize = require('sequelize');

// Crea una nueva instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host, // Dirección del host de la base de datos
  dialect: env.dialect, // Dialecto de la base de datos (e.g., 'mysql', 'postgres')
  dialectOptions: {
    ssl: { // Configuración de SSL
      require: true, // Requiere conexión SSL
      rejectUnauthorized: false // No rechazar conexiones no autorizadas (útil para ciertos entornos)
    }
  },
  operatorsAliases: false, // Desactiva alias de operadores para seguridad

  // Configuración del pool de conexiones
  pool: {
    max: env.max, // Número máximo de conexiones en el pool
    min: env.pool.min, // Número mínimo de conexiones en el pool
    acquire: env.pool.acquire, // Tiempo máximo de espera para adquirir una conexión
    idle: env.pool.idle, // Tiempo máximo que una conexión puede estar inactiva
  }
});

// Crea un objeto para almacenar el módulo de la base de datos
const db = {};

// Almacena la clase Sequelize en el objeto db
db.Sequelize = Sequelize;
// Almacena la instancia de conexión de Sequelize en el objeto db
db.sequelize = sequelize;

// Importa y define el modelo 'Customer' en el objeto db
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);

// Exporta el objeto db para usarlo en otras partes de la aplicación
module.exports = db;
