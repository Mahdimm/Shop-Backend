import mongoose from 'mongoose';
import {
  Router
} from 'express';
import Watch from '../model/watch';
import bodyParser from 'body-parser';
export default ({
  config,
  db
}) => {
  let api = Router();

  // '/v1/technoop' - GET all Watchs
  api.get('/get_all_watch', (req, res) => {
    Watch.find({}, (err, w) => {
      if (err) {
        res.send(err);
      }
      res.json(w);
    });
  });
  //moset
  api.get('/most_soled_watchs', (req, res) => {
    Watch.find().limit(10).sort({
      buyed: -1
    }).exec(function(err, watch) {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });
  api.get('/most_viewed_watchs', (req, res) => {
    Watch.find().limit(10).sort({
      viewed: -1
    }).exec(function(err, watch) {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });
  //low to high
  api.get('/sort_low_price_watchs', (req, res) => {
    Watch.find().sort({
      price: +1
    }).exec(function(err, watch) {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });
  //high to low
  api.get('/sort_high_price_watchs', (req, res) => {
    Watch.find().sort({
      percent_offer: -1
    }).exec(function(err, watch) {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });
  //high to low
  api.get('/sort_high_percent_offer_watchs', (req, res) => {
    Watch.find().sort({
      price: -1
    }).exec(function(err, watch) {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });


  //'/v1/technoop/:title' - GET a specific watch based on title
  api.get('/watch/:title_orginal', (req, res) => {
    Watch.find({
      title_orginal: {
        $regex: req.params.title_orginal
      }
    }, (err, watch) => {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });

  // '/v1/technoop/add-watch' - POST - add a watch
  api.post('/add_watch', (req, res) => {
    let newWatch = new Watch();
    newWatch.title = req.body.title;
    newWatch.title_orginal = req.body.title_orginal;
    newWatch.info = req.body.info;
    newWatch.pics = req.body.pics;
    newWatch.share = req.body.share;
    newWatch.color = req.body.color;
    newWatch.hardware = req.body.hardware;
    newWatch.price = req.body.price;
    newWatch.buyed = req.body.buyed;
    newWatch.viewed = req.body.viewed;
    newWatch.products_id = req.body.products_id;

    newWatch.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'watch is added'
      });
    });
  });
  //'/v1/technoop/:id' - DELETE - remove a watch
  api.delete('/watch_delete/:id', (req, res) => {
    Watch.remove({
      _id: req.params.id
    }, (err, watch) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "watch Successfully Removed"
      });
    });
  });
  //
  // '/v1/technoop/:id' - PUT - update an existing record
  api.put('/watch_update/:id', (req, res) => {
    Watch.findById(req.params.id, (err, watch) => {
      if (err) {
        res.send(err);
      }
      watch.title = req.body.title;
      watch.title_orginal = req.body.title_orginal;
      watch.info = req.body.info;
      watch.share = req.body.share;
      watch.pics = req.body.pics;
      watch.color = req.body.color;
      watch.hardware = req.body.hardware;
      watch.price = req.body.price;
      watch.buyed = req.body.buyed;
      watch.viewed = req.body.viewed;

      watch.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'watch info updated'
        });
      });
    });
  });
  api.get('/watch_data/:id', (req, res) => {
    Watch.findById(req.params.id, (err, watch) => {
      if (err) {
        res.send(err);
      }
      res.json(watch);
    });
  });


  return api;
}
