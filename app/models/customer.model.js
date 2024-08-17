// Exporta una función que define el modelo de 'Customer'
module.exports = (sequelize, Sequelize) => {
	// Define el modelo 'Customer' utilizando Sequelize
	const Customer = sequelize.define('customer', {	
	  // Define el campo 'id' como un número entero que se auto incrementa
	  id: {
		type: Sequelize.INTEGER,
		autoIncrement: true, // Incremento automático
		primaryKey: true // Clave primaria
	  },
	  // Define el campo 'firstname' como una cadena de texto
	  firstname: {
		type: Sequelize.STRING
	  },
	  // Define el campo 'lastname' como una cadena de texto
	  lastname: {
		type: Sequelize.STRING
	  },
	  // Define el campo 'address' como una cadena de texto
	  address: {
		type: Sequelize.STRING
	  },
	  // Define el campo 'age' como un número entero
	  age: {
		type: Sequelize.INTEGER
	  },
	  // Define el campo 'copyrightby' como una cadena de texto con un valor por defecto
	  copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua' // Valor por defecto
	  }
	});
	
	// Retorna el modelo 'Customer' definido
	return Customer;
  }
  