import mongoose from 'mongoose';
import {
  Router
} from 'express';
import Favorite from '../model/favorite';
import bodyParser from 'body-parser';
import Account from '../model/account';
var RateLimit = require('express-rate-limit');
// var helmet = require('helmet')
var express = require('express')
var app = express()
app.enable('trust proxy');

var apiLimiter = new RateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 30,
  delayMs: 25,
  message: "to many request"
});
export default ({
  config,
  db
}) => {
  let api = Router();

  // '/v1/technoop' - GET all favorites
  api.get('/get_all_favorite', (req, res) => {
    Favorite.find({}, (err, favorite) => {
      if (err) {
        res.setHeader('X-Powered-By', 'PHP 4.2.0');
        res.setHeader("Date", "-");
        res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");

        res.send(err);
      }
      res.setHeader('X-Powered-By', 'PHP 4.2.0');
      res.setHeader("Date", "-");
      res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");

      res.json(favorite);
    });
  });

  //'/v1/technoop/:name' - GET a specific favorite
  api.get('/favorite/:users_id', (req, res) => {
    Favorite.find({
      users_id: req.params.users_id
    }, (err, favorite) => {
      if (err) {
        res.setHeader('X-Powered-By', 'PHP 4.2.0');
        res.setHeader("Date", "-");
        res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");

        res.send(err);
      }
      res.setHeader('X-Powered-By', 'PHP 4.2.0');
      res.setHeader("Date", "-");
      res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
      res.json(favorite);
    });
  });

  // '/v1/technoop/add' - POST - add a favorite
  api.post('/add_favorite',apiLimiter, (req, res) => {
    Favorite.findOne({
      title: req.body.title
    }).exec(function(err, favorite) {
      if (err) {
      }
      var message;
      if (favorite) {
        message = "favorite exists";
      } else {

        let newFavorite = new Favorite();
        newFavorite.users_id = req.body.users_id;
        newFavorite.products_id = req.body.products_id;
        newFavorite.cateId = req.body.cateId;
        newFavorite.title = req.body.title;
        newFavorite.title_orginal = req.body.title_orginal;
        newFavorite.pic_title = req.body.pic_title;
        message = "favorite is added";
        newFavorite.save(function(err) {
          if (err) {
            res.setHeader('X-Powered-By', 'PHP 4.2.0');
            res.setHeader("Date", "-");
            res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
            res.setHeader("X-RateLimit-Remaining", "-");
            res.setHeader("X-RateLimit-Limit", "-");
            res.setHeader("Retry-After", "-");

            res.send(err);
          }

        });
      }
      res.setHeader('X-Powered-By', 'PHP 4.2.0');
      res.setHeader("Date", "-");
      res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
      res.setHeader("X-RateLimit-Remaining", "-");
      res.setHeader("X-RateLimit-Limit", "-");

      res.setHeader("Retry-After", "-");
      res.json({
        message: message
      });

    });

  });

  //'/v1/technoop/:id' - DELETE - remove a favorite
  api.delete('/favorite_delete/:id', (req, res) => {
    Favorite.remove({
      _id: req.params.id
    }, (err, favorite) => {
      if (err) {
        res.send(err);
      }

      res.json({
        message: "favorite is removed"
      });
    });
    //  });
  });
  //
  // '/v1/technoop/:id' - PUT - update an existing record
  api.put('/favorite_update/:id', (req, res) => {
    Favorite.findById(req.params.id, (err, favorite) => {
      if (err) {
        res.send(err);
      }
      favorite.users_id = req.body.users_idtitle;
      favorite.products_id = req.body.products_id;
      favorite.cateId = req.body.cateId;
      favorite.title = req.body.title;
      favorite.title_orginal = req.body.title_orginal;
      favorite.pic_title = req.body.pic_title;


      favorite.save(function(err) {
        if (err) {
          res.setHeader('X-Powered-By', 'PHP 4.2.0');
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        }
        res.setHeader('X-Powered-By', 'PHP 4.2.0');
        res.setHeader("Date", "-");
        res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("Retry-After", "-");
        res.json({
          message: 'Favorite info updated'
        });
      });
    });
  });


  return api;
}
