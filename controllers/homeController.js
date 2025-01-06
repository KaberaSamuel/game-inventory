import { body } from "express-validator";

function handleHomeReqs(req, res) {
  res.render("index");
}

export { handleHomeReqs };
