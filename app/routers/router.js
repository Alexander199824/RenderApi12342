// Importa el módulo Express
let express = require('express');
// Crea un nuevo enrutador de Express
let router = express.Router();
 
// Importa el controlador de clientes
const customers = require('../controllers/controller.js');

// Define una ruta POST para crear un nuevo cliente
router.post('/api/customers/create', customers.create);

// Define una ruta GET para obtener todos los clientes
router.get('/api/customers/all', customers.retrieveAllCustomers);

// Define una ruta GET para obtener un cliente por su ID
router.get('/api/customers/onebyid/:id', customers.getCustomerById);

// Define una ruta GET para filtrar clientes por edad
router.get('/api/customers/filteringbyage', customers.filteringByAge);

// Define una ruta GET para la paginación de clientes
router.get('/api/customers/pagination', customers.pagination);

// Define una ruta GET para la paginación, filtrado y ordenamiento de clientes
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);

// Define una ruta PUT para actualizar un cliente por su ID
router.put('/api/customers/update/:id', customers.updateById);

// Define una ruta DELETE para eliminar un cliente por su ID
router.delete('/api/customers/delete/:id', customers.deleteById);

// Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
