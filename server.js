require("dotenv").config();
const { create } = require("express-handlebars");
const path = require("path");
const cors = require("cors");
const swaggerDocs = require("./swagger");

const bodyParser = require("body-parser");

let port = process.env.APP_PORT || "8000";
let host = process.env.APP_HOST || "localhost";

var express = require("express");
var app = express();
const hbs = create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
});

app.engine("hbs", hbs.engine);

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.set("views", "./views");

const routes = require("./routes");
routes(app, "/");

swaggerDocs.swagger(app);

app.get("/", (req, res) => {
  res.render("login", {
    title: "Login",
    showNavbar: false,
    linkStyle:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    showNavbar: false,
    linkStyle:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
  });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard", { title: "Dashboard", showNavbar: true });
});

app.get("/add-category", (req, res) => {
  res.render("add_category", { title: "Add Category", showNavbar: true });
});

app.get("/add-product", (req, res) => {
  res.render("add_product", {
    title: "Add Product",
    style: "/src/css/add-product.css",
    showNavbar: true,
  });
});

app.get("/cart", (req, res) => {
  res.render("cart", { title: "Cart", showNavbar: true });
});

app.get("/profile", (req, res) => {
  res.render("profile", { title: "Profile", showNavbar: true });
});

app.get("/payment", (req, res) => {
  res.render("payment", { title: "Payment", showNavbar: true });
});

app.listen(port, () => {
  console.log(`listening on http://${host}:${port}`);
});
