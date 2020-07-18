import mongoose from 'mongoose';
import {
  Router
} from 'express';
import Tablet from '../model/tablet';
import bodyParser from 'body-parser';

export default ({
  config,
  db
}) => {
  let api = Router();

  // '/v1/technoop' - GET all tablets
  api.get('/get_all_tablet', (req, res) => {
    Tablet.find({}, (err, tablet) => {
      if (err) {
        res.send(err);
      }
      res.json(tablet);
    });
  });
  api.get('/most_soled_tablets', (req, res) => {
    Tablet.find().limit(10).sort({
      buyed: -1
    }).exec(function(err, tablet) {
      if (err) {
        res.send(err);
      }
      res.json(tablet);
    });
  });


    api.get('/most_viewed_tablets', (req, res) => {
      Tablet.find().limit(10).sort({
        viewed: -1
      }).exec(function(err, tablet) {
        if (err) {
          res.send(err);
        }
        res.json(tablet);
      });
    });
    //low to high
    api.get('/sort_low_price_tablets', (req, res) => {
      Tablet.find().sort({
        price: +1
      }).exec(function(err, tablet) {
        if (err) {
          res.send(err);
        }
        res.json(tablet);
      });
    });
    //high to low
    api.get('/sort_high_price_tablets', (req, res) => {
      Tablet.find().sort({
        percent_offer: -1
      }).exec(function(err, tablet) {
        if (err) {
          res.send(err);
        }
        res.json(tablet);
      });
    });
    //high to low
    api.get('/sort_high_percent_offer_tablets', (req, res) => {
      Tablet.find().sort({
        price: -1
      }).exec(function(err, tablet) {
        if (err) {
          res.send(err);
        }
        res.json(tablet);
      });
    });

  //'/v1/technoop/:name' - GET a specific tablet
  api.get('/tablet/:title_orginal', (req, res) => {
    Tablet.find({
      title_orginal: {
        $regex: req.params.title_orginal
      }
    }, (err, tablet) => {
      if (err) {
        res.send(err);
      }
      res.json(tablet);
    });
  });

  // '/v1/technoop/add' - POST - add a tablet
  api.post('/add_tablet', (req, res) => {
    let newTablet = new Tablet();
    newTablet.title = req.body.title;
    newTablet.title_orginal = req.body.title_orginal;
    newTablet.info = req.body.info;
    newTablet.pics = req.body.pics;
    newTablet.color = req.body.color;
    newTablet.share = req.body.share;
    newTablet.hardware = req.body.hardware;
    newTablet.price = req.body.price;
    newTablet.buyed = req.body.buyed;
    newTablet.viewed = req.body.viewed;
    newTablet.products_id = req.body.products_id;

    newTablet.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'tablet is added'
      });
    });
  });
  api.get('/tablet_data/:id', (req, res) => {
    Tablet.findById(req.params.id, (err, tablet) => {
      if (err) {
        res.send(err);
      }
      res.json(tablet);
    });
  });
  //'/v1/technoop/:id' - DELETE - remove a tablet
  api.delete('/tablet_delete/:id', (req, res) => {
    Tablet.remove({
      _id: req.params.id
    }, (err, tablet) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: "Tablet Successfully Removed"
      });
    });
  });
  //
  // '/v1/technoop/:id' - PUT - update an existing record
  api.put('/tablet_update/:id', (req, res) => {
    Tablet.findById(req.params.id, (err, tablet) => {
      if (err) {
        res.send(err);
      }
      tablet.title = req.body.title;
      tablet.title_orginal = req.body.title_orginal;
      tablet.info = req.body.info;
      tablet.share = req.body.share;
      tablet.pics = req.body.pics;
      tablet.color = req.body.color;
      tablet.hardware = req.body.hardware;
      tablet.price = req.body.price;
      tablet.buyed = req.body.buyed;
      tablet.viewed = req.body.viewed;
      tablet.products_id = req.body.products_id;

      tablet.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({
          message: 'Tablet info updated'
        });
      });
    });
  });

  return api;
}
