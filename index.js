const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const ProductSchema = require("./schemas/ProductSchema");

const server = express();

server.use(cors());

server.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.yjct1pj.mongodb.net/?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

server.get("/", (req, res) => {
  return res.json({
    message: "Seja bem vindo à API - Wesley Bruno!!!😉",
    product_list: {
      url: "https://api-products-dh-next.vercel.app/products",
      method: "GET",
    },
    product_details: {
      url: "https://api-products-dh-next.vercel.app/products/[id]",
      method: "GET",
    },
    create_product: {
      url: "https://api-products-dh-next.vercel.app/products",
      method: "POST",
      body: {
        nome: "Nome do produto",
        preco: 120,
        fornecedor: "Nome do fornecedor",
        url_imagem: "https:minha_imagem.com/023912j",
        descricao: "Descrição do produto",
      },
    },
    edit_product: {
      url: "https://api-products-dh-next.vercel.app/products/[id]",
      method: "PUT",
      body: {
        nome: "Nome do produto",
        preco: 120,
        fornecedor: "Nome do fornecedor",
        url_imagem: "https:minha_imagem.com/023912j",
        descricao: "Descrição do produto",
      },
    },
    remove_product: {
      url: "https://api-products-dh-next.vercel.app/products/[id]",
      method: "DELETE",
    },
  });
});

//Categories

const fornecedores = [
  {
    id: 1,
    label: "Amazon",
  },
  {
    id: 2,
    label: "Ms",
  },
  {
    id: 3,
    label: "Novatech Solutions",
  },
  {
    id: 4,
    label: "Global Supplies Co.",
  },
  {
    id: 5,
    label: "ExcelPro Services",
  },
  {
    id: 6,
    label: "OptiTech Industries",
  },
  {
    id: 7,
    label: "PrimeSource Distribution",
  },
  {
    id: 8,
    label: "EliteTrade Solutions",
  },
  {
    id: 9,
    label: "StarCorp Suppliers",
  },
  {
    id: 10,
    label: "Quantum Supplies Ltd.",
  },
  {
    id: 11,
    label: "ProLink Ventures",
  },
  {
    id: 12,
    label: "IntegraTrade Solutions",
  },
  {
    id: 13,
    label: "Outros",
  },
];

//Fornecedores
server.get("/fornecedores", (req, res) => {
  return res.json(fornecedores);
});

//Product
server.get("/produtos", async (req, res) => {
  const products = await ProductSchema.find();
  return res.json(products);
});

server.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const product = await ProductSchema.findById(id);
  return res.json(product);
});

server.post("/produtos", async (req, res) => {
  const result = await ProductSchema.create(req.body);
  return res.status(201).json(result);
});

server.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ProductSchema.findOneAndUpdate({ _id: id }, req.body);
  return res.json(todo);
});

server.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await ProductSchema.deleteOne({ _id: id });
  return res.json({ message: "Successfully deleted" });
});

server.listen(PORT, () =>
  console.log("Servidor iniciado em http://localhost:" + PORT)
);