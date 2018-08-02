function sortByOrder(xs, order) {
  const others = difference(xs, order)
  const ordered = intersection(order, xs)
  return others.concat(ordered)
}

function difference(a, b) {
  return a.filter(x => !b.includes(x))
}

function intersection(a, b) {
  return a.filter(x => b.includes(x))
}

module.exports = sortByOrder
