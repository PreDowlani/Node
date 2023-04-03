const server = (req, res, next) => {
    console.log("Logging..."); // ! Aquí vendría toda la funcionalidad del login de usuario
    next();
  };
  
module.exports = server;