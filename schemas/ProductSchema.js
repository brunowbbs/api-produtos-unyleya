const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: String,
    required: true,
  },
  fornecedor: {
    type: String,
    required: true,
  },
  url_imagem: {
    type: String,
    required: false,
  },
  descricao: {
    type: String,
    max: 1000,
    required: true,
  },
});

module.exports = model("Product", ProductSchema);
