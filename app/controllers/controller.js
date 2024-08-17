// Importa la configuración de la base de datos
const db = require('../config/db.config.js');
// Obtiene el modelo Customer de la configuración importada
const Customer = db.Customer;

// Función para crear un nuevo cliente
exports.create = (req, res) => {
    // Inicializa un objeto vacío para el cliente
    let customer = {};

    try{
        // Construye el objeto Customer a partir del cuerpo de la solicitud
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.address = req.body.address;
        customer.age = req.body.age;
    
        // Guarda el cliente en la base de datos MySQL
        Customer.create(customer).then(result => {    
            // Envía un mensaje de éxito al cliente
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.id,
                customer: result,
            });
        });
    }catch(error){
        // Maneja errores y envía un mensaje de error al cliente
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

// Función para recuperar todos los clientes
exports.retrieveAllCustomers = (req, res) => {
    // Busca toda la información de los clientes
    Customer.findAll()
        .then(customerInfos => {
            // Envía la información de todos los clientes al cliente
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                customers: customerInfos
            });
        })
        .catch(error => {
          // Registra el error en la consola
          console.log(error);
          // Envía un mensaje de error al cliente
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

// Función para obtener un cliente por su ID
exports.getCustomerById = (req, res) => {
  // Obtiene el ID del cliente de los parámetros de la solicitud
  let customerId = req.params.id;
  // Busca al cliente por su clave primaria (ID)
  Customer.findByPk(customerId)
      .then(customer => {
          // Envía la información del cliente al cliente
          res.status(200).json({
              message: "Successfully Get a Customer with id = " + customerId,
              customers: customer
          });
      })
      .catch(error => {
        // Registra el error en la consola
        console.log(error);
        // Envía un mensaje de error al cliente
        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

// Función para filtrar clientes por edad
exports.filteringByAge = (req, res) => {
  // Obtiene la edad de los parámetros de consulta de la solicitud
  let age = req.query.age;

  // Busca todos los clientes que coincidan con la edad especificada
  Customer.findAll({
                      attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'copyrightby'],
                      where: {age: age}
                    })
          .then(results => {
            // Envía la información de los clientes filtrados al cliente
            res.status(200).json({
                message: "Get all Customers with age = " + age,
                customers: results,
            });
          })
          .catch(error => {
              // Registra el error en la consola
              console.log(error);
              // Envía un mensaje de error al cliente
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}

// Función para la paginación de clientes
exports.pagination = (req, res) => {
  try{
    // Convierte los parámetros de consulta a enteros
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    // Calcula el desplazamiento para la paginación
    const offset = page ? page * limit : 0;
  
    // Busca y cuenta todos los clientes con límite y desplazamiento
    Customer.findAndCountAll({ limit: limit, offset: offset })
      .then(data => {
        // Calcula el número total de páginas
        const totalPages = Math.ceil(data.count / limit);
        // Crea la respuesta con la información de la paginación
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
              "copyrightby": "UMG ANTIGUA",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "customers": data.rows
          }
        };
        // Envía la respuesta al cliente
        res.send(response);
      });  
  }catch(error) {
    // Maneja errores y envía un mensaje de error al cliente
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

// Función para la paginación, filtrado y ordenamiento de clientes
exports.pagingfilteringsorting = (req, res) => {
  try{
    // Convierte los parámetros de consulta a enteros
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let age = parseInt(req.query.age);
  
    // Calcula el desplazamiento para la paginación
    const offset = page ? page * limit : 0;

    // Registra el desplazamiento en la consola
    console.log("offset = " + offset);
  
    // Busca y cuenta todos los clientes con atributos, condiciones, orden, límite y desplazamiento
    Customer.findAndCountAll({
                                attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
                                where: {age: age}, 
                                order: [
                                  ['firstname', 'ASC'], // Ordena por nombre en orden ascendente
                                  ['lastname', 'DESC'] // Ordena por apellido en orden descendente
                                ],
                                limit: limit, 
                                offset: offset 
                              })
      .then(data => {
        // Calcula el número total de páginas
        const totalPages = Math.ceil(data.count / limit);
        // Crea la respuesta con la información de la paginación, filtrado y ordenamiento
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
              "copyrightby": "UmgAntigua",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "age-filtering": age,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "customers": data.rows
          }
        };
        // Envía la respuesta al cliente
        res.send(response);
      });  
  }catch(error) {
    // Maneja errores y envía un mensaje de error al cliente
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }      
}

// Función para actualizar un cliente por su ID
exports.updateById = async (req, res) => {
    try{
        // Obtiene el ID del cliente de los parámetros de la solicitud
        let customerId = req.params.id;
        // Busca al cliente por su clave primaria (ID)
        let customer = await Customer.findByPk(customerId);
    
        if(!customer){
            // Si el cliente no existe, envía una respuesta de error
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                customer: "",
                error: "404"
            });
        } else {    
            // Crea un objeto con los cambios actualizados
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age
            }
            // Actualiza el cliente en la base de datos
            let result = await Customer.update(updatedObject, {returning: true, where: {id: customerId}});
            
            // Si la actualización falla, envía un mensaje de error
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            // Envía un mensaje de éxito al cliente
            res.status(200).json({
                message: "Update successfully a Customer with id = " + customerId,
                customer: updatedObject,
            });
        }
    } catch(error){
        // Maneja errores y envía un mensaje de error al cliente
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

// Función para eliminar un cliente por su ID
exports.deleteById = async (req, res) => {
    try{
        // Obtiene el ID del cliente de los parámetros de la solicitud
        let customerId = req.params.id;
        // Busca al cliente por su clave primaria (ID)
        let customer = await Customer.findByPk(customerId);

        if(!customer){
            // Si el cliente no existe, envía una respuesta de error
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            // Elimina al cliente de la base de datos
            await customer.destroy();
            // Envía un mensaje de éxito al cliente
            res.status(200).json({
                message: "Delete Successfully a Customer with id = " + customerId,
                customer: customer,
            });
        }
    } catch(error) {
        // Maneja errores y envía un mensaje de error al cliente
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}
