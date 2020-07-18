import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Basket from '../model/basket';
var express = require('express')
var app = express()
var RateLimit = require('express-rate-limit');

app.enable('trust proxy');

var apiLimiter = new RateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 30,
  delayMs: 25,
  message: "to many request"
});
export default({ config, db }) => {
  let api = Router();

  api.get('/basket/:userId', (req, res) => {
    Basket.find({
      userId: req.params.userId
    }, (err, basket) => {
      if (err) {
        res.setHeader('X-Powered-By', 'PHP 4.2.0');
        res.setHeader("Date", "-");
        res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.send(err)
      }
      res.setHeader('X-Powered-By', 'PHP 4.2.0');
      res.setHeader("Date", "-");
      res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
      // res.setHeader("X-RateLimit-Remaining", "-");
      // res.setHeader("X-RateLimit-Limit", "-");
      // res.setHeader("Retry-After", "-");
      res.json(basket)
    })
  })
  api.get('/basket/get_all_basket', (req, res) => {
    Basket.find({}, (err, basket) => {
      if (err) {

        res.send(err);
      }
      res.json(basket);
    });
  });
  api.post('/basket/add_Basket',apiLimiter, (req, res) => {
    let newBasket = new Basket()
    newBasket.picTitle = req.body.picTitle
    newBasket.titleOriginal = req.body.titleOriginal
    newBasket.title = req.body.title
    newBasket.cateId = req.body.cateId
    newBasket.userId = req.body.userId
    newBasket.email = req.body.email
    newBasket.color = req.body.color
    newBasket.guarantee = req.body.guarantee
    newBasket.productId = req.body.productId
    newBasket.date = req.body.date
    newBasket.time = req.body.time
    newBasket.price = req.body.price
    newBasket.status = req.body.status

    newBasket.save(function(err) {
      if (err) {
        res.setHeader('X-Powered-By', 'PHP 4.2.0');
        res.setHeader("Date", "-");
        res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        res.setHeader("X-RateLimit-Remaining", "-");
        res.setHeader("X-RateLimit-Limit", "-");
        res.setHeader("Retry-After", "-");
        res.send(err)
      }
      res.setHeader('X-Powered-By', 'PHP 4.2.0');
      res.setHeader("Date", "-");
      res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
      res.setHeader("X-RateLimit-Remaining", "-");
      res.setHeader("X-RateLimit-Limit", "-");
      res.setHeader("Retry-After", "-");
      res.json({ message: "Basket Added for specific User"})
    })
  })

  api.put('/basket_update/:id', (req, res) => {
    Basket.findById(req.params.id, (err, basket) => {

      if (err) {

        res.send(err)
      }
      basket.picTitle = req.body.picTitle
      basket.titleOriginal = req.body.titleOriginal
      basket.title = req.body.title
      basket.cateId = req.body.cateId
      basket.userId = req.body.userId
      basket.color = req.body.color
      basket.guarantee = req.body.guarantee
      basket.productId = req.body.productId
      basket.date = req.body.date
      basket.time = req.body.time
      basket.price = req.body.price
      basket.status = req.body.status

      basket.save(function(err) {
        if (err) {
          res.send(err)
        }
        res.json({ message: "Basket info updated for specific user"})
      })
    })
  })

  api.delete('/basket_delete/:id', (req, res) => {
    Basket.remove({
      _id: req.params.id
    }, (err, basket) => {
      if (err) {
        res.send(err)
      }
        res.json({message: "Basket Removed for specific User Successfully"})
      })
  })


  return api
}
