import mongoose from "mongoose";
import { Router } from "express";
import Phone from "../model/phone";
import bodyParser from "body-parser";
export default ({ config, db }) => {
  let api = Router();

  // '/v1/technoop' - GET all phones
  api.get("/get_all_phone", (req, res) => {
    Phone.find({}, (err, phone) => {
      if (err) {
        // res.setHeader("X-Powered-By", "PHP 4.2.0");
        // res.setHeader("Date", "-");
        // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.send(err);
      } else {
        // res.setHeader("X-Powered-By", "PHP 4.2.0");
        // res.setHeader("Date", "-");
        // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.json(phone);
      }
    });
  });

  api.get("/most_soled_phones", (req, res) => {
    Phone.find()
      .limit(10)
      .sort({
        buyed: -1,
      })
      .exec(function (err, phone) {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      });
  });

  api.get("/most_viewed_phones", (req, res) => {
    Phone.find()
      .limit(10)
      .sort({
        viewed: -1,
      })
      .exec(function (err, phone) {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      });
  });
  //low to high
  api.get("/sort_low_price_phones", (req, res) => {
    Phone.find()
      .sort({
        price: +1,
      })
      .exec(function (err, phone) {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      });
  });
  //high to low
  api.get("/sort_high_price_phones", (req, res) => {
    Phone.find()
      .sort({
        percent_offer: -1,
      })
      .exec(function (err, phone) {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      });
  });
  //high to low
  api.get("/sort_high_percent_offer_phones", (req, res) => {
    Phone.find()
      .sort({
        price: -1,
      })
      .exec(function (err, phone) {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      });
  });

  //'/v1/technoop/:name' - GET a specific phone
  api.get("/phone/:title_orginal", (req, res) => {
    Phone.find(
      {
        title_orginal: {
          $regex: req.params.title_orginal,
          $options: "i",
        },
      },
      (err, phone) => {
        if (err) {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          res.setHeader("X-Powered-By", "PHP 4.2.0");
          res.setHeader("Date", "-");
          res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.json(phone);
        }
      }
    );
  });
  // '/v1/technoop/add' - POST - add a phone
  api.post("/add_phone", (req, res) => {
    let newPhone = new Phone();
    newPhone.title = req.body.title;
    newPhone.title_orginal = req.body.title_orginal;
    newPhone.share = req.body.share;
    newPhone.info = req.body.info;
    newPhone.pics = req.body.pics;
    newPhone.color = req.body.color;
    newPhone.hardware = req.body.hardware;
    newPhone.price = req.body.price;
    newPhone.buyed = req.body.buyed;
    newPhone.viewed = req.body.viewed;
    newPhone.products_id = req.body.products_id;

    newPhone.save(function (err) {
      if (err) {
        // res.setHeader("X-Powered-By", "PHP 4.2.0");
        // res.setHeader("Date", "-");
        // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.send(err);
      } else {
        // res.setHeader("X-Powered-By", "PHP 4.2.0");
        // res.setHeader("Date", "-");
        // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.json({
          message: "phone is added",
        });
      }
    });
  });

  //'/v1/technoop/:id' - DELETE - remove a phone
  api.delete("/phone_delete/:id", (req, res) => {
    Phone.remove(
      {
        _id: req.params.id,
      },
      (err, phone) => {
        if (err) {
          res.send(err);
        }
        res.json({
          message: "Phone Successfully Removed",
        });
      }
    );
  });
  api.get("/phone_data/:id", (req, res) => {
    Phone.findById(req.params.id, (err, phone) => {
      if (err) {
        res.send(err);
      }
      res.json(phone);
    });
  });

  //
  // '/v1/technoop/:id' - PUT - update an existing record
  api.put("/phone_update/:id", (req, res) => {
    Phone.findById(req.params.id, (err, phone) => {
      if (err) {
        // res.setHeader("X-Powered-By", "PHP 4.2.0");
        // res.setHeader("Date", "-");
        // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
        // res.setHeader("X-RateLimit-Remaining", "-");
        // res.setHeader("X-RateLimit-Limit", "-");
        // res.setHeader("Retry-After", "-");
        res.send(err);
      } else {
        phone.title = req.body.title;
        phone.title_orginal = req.body.title_orginal;
        phone.share = req.body.share;
        phone.info = req.body.info;
        phone.pics = req.body.pics;
        phone.color = req.body.color;
        phone.hardware = req.body.hardware;
        phone.price = req.body.price;
        phone.buyed = req.body.buyed;
        phone.products_id = req.body.products_id;

        phone.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: "Phone info updated",
          });
        });
      }
    });
  });

  return api;
};
