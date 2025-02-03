export function handleNotFoundPages(req, res) {
  res.status(404);
  res.render("notFound");
}
