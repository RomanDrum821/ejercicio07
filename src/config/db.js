const mongosee = require("mongoose");
const uriRemota =
  "mongodb+srv://hector-roman:JgqILVwx12qchytv@clusterhirv.i5ivvh1.mongodb.net/?retryWrites=true&w=majority";
const uriLocal = "mongodb://127.0.0.1:27017/tienda";

mongosee.connect(uriRemota);

module.exports = mongosee;
