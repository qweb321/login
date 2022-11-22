const express = require("express");
const router = express.Router();
const users = require("./users");

router.get("/", (req, res) => {
  // if user already login, login page won't show
  if (Object.keys(req.cookies).length) {
    return res.redirect("/welcome");
  }
  res.render("home");
});

router.post("/", (req, res) => {
  for (const user of users) {
    if (user.email === req.body.useremail) {
      if (user.password === req.body.password) {
        res.cookie("user", user.firstName);
        return res.render("welcome", { Name: user.firstName });
      } else {
        return res.render("home", { error: "Email or Password not correct" });
      }
    }
  }
});

router.get("/welcome", (req, res) => {
  // if user don't login, it won't show page
  if (!Object.keys(req.cookies).length) {
    return res.redirect("/");
  }
  res.render("welcome", { Name: req.cookies.user });
});

router.get("/detail", (req, res) => {
  let Edituser = "";
  if (!Object.keys(req.cookies).length) {
    return res.redirect("/");
  }
  for (const user of users) {
    if (user.firstName === req.cookies.user) {
      Edituser = user;
    }
  }
  res.render("detail", { User: Edituser });
});

router.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.render("logout");
});

module.exports = router;
