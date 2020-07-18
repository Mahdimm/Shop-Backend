import mongoose from 'mongoose';
import {
  Router
} from 'express';
import Laptop from '../model/laptop';
import bodyParser from 'body-parser';

export default ({
  config,
  db
}) => {
  let api = Router();

  // '/v1/technoop' - GET all laptop
  api.get('/get_all_laptop', (req, res) => {
    Laptop.find({}, (err, laptop) => {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });
  api.get('/most_soled_laptops', (req, res) => {
    Laptop.find().limit(10).sort({
      buyed: -1
    }).exec(function(err, laptop) {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });

  api.get('/most_viewed_laptops', (req, res) => {
    Laptop.find().limit(10).sort({
      viewed: -1
    }).exec(function(err, laptop) {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });
  //low to high
  api.get('/sort_low_price_laptops', (req, res) => {
    Laptop.find().sort({
      price: +1
    }).exec(function(err, laptop) {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });
  //high to low
  api.get('/sort_high_price_laptops', (req, res) => {
    Laptop.find().sort({
      percent_offer: -1
    }).exec(function(err, laptop) {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });
  //high to low
  api.get('/sort_high_percent_offer_laptops', (req, res) => {
    Laptop.find().sort({
      price: -1
    }).exec(function(err, laptop) {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });

  //'/v1/technoop/:title' - GET a specific laptop based on title
  api.get('/laptop/:title_orginal', (req, res) => {
    Laptop.find({
      title_orginal: {
        $regex: req.params.title_orginal
      }
    }, (err, laptop) => {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });

  // '/v1/technoop/add-laptop' - POST - add a laptop
  api.post('/add_laptop', (req, res) => {
    let newLaptop = new Laptop();
    newLaptop.title = req.body.title;
    newLaptop.title_orginal = req.body.title_orginal;
    newLaptop.info = req.body.info;
    newLaptop.pics = req.body.pics;
    newLaptop.color = req.body.color;
    newLaptop.share = req.body.share;
    newLaptop.hardware = req.body.hardware;
    newLaptop.price = req.body.price;
    newLaptop.buyed = req.body.buyed;
    newLaptop.viewed = req.body.viewed;
    newLaptop.products_id = req.body.products_id;

    newLaptop.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Laptop is added'
      });
    });
  });
  api.get('/laptop_data/:id', (req, res) => {
    Laptop.findById(req.params.id, (err, laptop) => {
      if (err) {
        res.send(err);
      }
      res.json(laptop);
    });
  });
  //'/v1/technoop/:id' - DELETE - remove a laptop
  api.delete('/laptop_delete/:id', (req, res) => {
    Laptop.remove({
      _id: req.params.id
    }, (err, laptop) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Laptop Successfully Removed"
      });

    });
  });
  //
  // '/v1/technoop/:id' - PUT - update an existing record
  api.put('/laptop_update/:id', (req, res) => {
    Laptop.findById(req.params.id, (err, laptop) => {
      if (err) {
        res.send(err);
      }
      laptop.title = req.body.title;
      laptop.title_orginal = req.body.title_orginal;
      laptop.info = req.body.info;
      laptop.share = req.body.share;
      laptop.pics = req.body.pics;
      laptop.color = req.body.color;
      laptop.hardware = req.body.hardware;
      laptop.price = req.body.price;
      laptop.buyed = req.body.buyed;
      laptop.viewed = req.body.viewed;
      laptop.products_id = req.body.products_id;
      laptop.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'Laptop info updated'
        });
      });
    });
  });

  return api;
}
