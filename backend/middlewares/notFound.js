export const notFound = (req, res, next) => {
  res.status(404).send('404')
}
