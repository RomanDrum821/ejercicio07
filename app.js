const express = require("express");
const routesUser = require("./src/routes/user.routes");
const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());
app.use("/partners/v3/users", routesUser);

//Ejecutar el servidor
app.listen(puerto, () => {
  console.log("Servidor escuchando en el puerto", puerto);
});
