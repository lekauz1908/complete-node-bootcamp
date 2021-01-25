/* eslint-disable no-console */
const fs = require('fs');

const prodcuts = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/products-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Product id is: ${val}`);

  if (req.params.id * 1 > prodcuts.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllProducts = (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: prodcuts.length,
    data: {
      prodcuts
    }
  });
};

exports.getProduct = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const product = products.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
};

exports.createProduct = (req, res) => {
  console.log(req.body);

  const newId = prodcuts[prodcuts.length - 1].id + 1;
  const newProduct = Object.assign({ id: newId }, req.body);

  prodcuts.push(newProduct);

  fs.writeFile(
    `${__dirname}/dev-data/data/prodcuts-simple.json`,
    JSON.stringify(prodcuts),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          product: newProduct
        }
      });
    }
  );
};

exports.updateProduct = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      product: '<Updated product here...>'
    }
  });
};

exports.deleteProduct = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
