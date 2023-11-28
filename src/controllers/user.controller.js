const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({
        estado: 1,
        mensaje: "Usuarios encontrados",
        users: users,
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "No se encontraron usuarios",
        users: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrio un error desonocido",
      users: [],
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        estado: 0,
        mensaje: "Usuario no encontrado",
        user: [],
      });
    } else {
      res.status(200).json({
        estado: 1,
        mensaje: "Usuario encontrado",
        user: [user],
      });
    }
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrio un error desconocido",
      user: [],
    });
  }
};

exports.addUser = async (req, res) => {
  const salt = await bcrypt.genSalt(8);
  try {
    const { names, lastnames, username, email, password } = req.body;
    if (!names || !lastnames || !username || !email || !password) {
      res.status(400).json({
        estado: 0,
        mensaje: "Faltan parametros",
        user: [],
      });
    } else {
      const userfound = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (userfound) {
        res.status(200).json({
          estado: 0,
          mensaje: "El usuario y/o correo ya existe, favor de utilizar otro",
          user: [],
        });
      } else {
        const user = await User.create({
          names,
          lastnames,
          username,
          email,
          password: await bcrypt.hash(password, salt),
        });
        if (user) {
          res.status(200).json({
            estado: 1,
            mensaje: "Se creo el usuario de manera correcta",
            user: user,
          });
        } else {
          res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
            user: [],
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrio un error desconocido",
      user: [],
    });
  }
};

exports.updateUser = async (req, res) => {
  const { names } = req.body;
  const { lastnames } = req.body;
  const { email } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);
  try {
    if (!user) {
      res.status(404).json({
        estado: 0,
        mensaje: "Usuario no encontrado",
        user: [],
      });
    } else {
      if (!names || !lastnames || !password) {
        res.status(400).json({
          estado: 0,
          mensaje: "Faltan parametros en la solicitud",
          user: [],
        });
      } else {
        const salt = await bcrypt.genSalt(8);
        await user.updateOne({
          names: names,
          lastnames: lastnames,
          password: await bcrypt.hash(password, salt),
        });
        res.status(200).json({
          estado: 1,
          mensaje: "Usuario actualizado correctamente",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrio un error desconocido",
      user: [],
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        estado: 0,
        mensaje: "No se encontro el usuario",
        user: [],
      });
    } else {
      await user.deleteOne();
      res.status(200).json({
        estado: 1,
        mensaje: "Se elimino el usuario de manera correcta",
        user: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      estado: 0,
      mensaje: "Ocurrio un error desconocido",
      user: [],
    });
  }
};
