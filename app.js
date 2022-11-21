const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const users = require("./modules/users");

const port = 3000;
const app = express();

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  for (const user of users) {
    if (user.email === req.body.useremail) {
      if (user.password === req.body.password) {
        return res.render("welcome", { Name: user.firstName });
      } else {
        return res.render("home", { error: "Email or Password not correct" });
      }
    }
  }
});

app.listen(port, () =>
  console.log(`app is running on http://localhost:${port}`)
);
