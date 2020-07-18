import mongoose from "mongoose";
import { Router } from "express";
import Account from "../model/account";
import bodyParser from "body-parser";
import passport from "passport";
import config from "../config";
import User from "../model/user";
var express = require("express");
var app = express();
var RateLimit = require("express-rate-limit");

app.enable("trust proxy");

import {
  generateAccessToken,
  respond,
  authenticate,
} from "../middleware/authMiddleware";
var createAccountLimiter = new RateLimit({
  windowMs: 30 * 60 * 1000, // 1 hour window
  delayAfter: 1, // begin slowing down responses after the first request
  delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request
  max: 5, // start blocking after 5 requests
  message: "to many request",
});
export default ({ config, db }) => {
  let api = Router();

  // /v1/account/register
  api.post("/register", createAccountLimiter, (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.lastName = req.body.lastName;
    newUser.imageUrl = req.body.imageUrl;
    newUser.signDate = req.body.signDate;
    newUser.phoneNumber = req.body.phoneNumber;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.lat = req.body.lat;
    newUser.lon = req.body.lon;
    newUser.address = req.body.address;
    newUser.deviceID = req.body.deviceID;
    newUser.deviceOS = req.body.deviceOS;
    newUser.deviceModel = req.body.deviceModel;

    Account.register(
      new Account({
        username: req.body.email,
      }),
      req.body.password,
      function (err, account) {
        if (err) {
          // res.setHeader("X-Powered-By", "PHP 4.2.0");
          // res.setHeader("Date", "-");
          // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
          // res.setHeader("X-RateLimit-Remaining", "-");
          // res.setHeader("X-RateLimit-Limit", "-");
          // res.setHeader("Retry-After", "-");
          res.send(err);
        } else {
          passport.authenticate("local", {
            session: false,
          })(req, res, () => {
            newUser.save(function (err) {
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
                res.status(200).json({ message: "Account Successfully Added" });
              }
            });
          });
        }
      }
    );
  });

  // /v1/account/login
  api.post(
    "/login",
    passport.authenticate("local", {
      session: false,
      scope: [],
    }),
    generateAccessToken,
    respond
  );

  // /v1/account/logout
  api.get("/logout", authenticate, (req, res) => {
    // res.setHeader("X-Powered-By", "PHP 4.2.0");
    // res.setHeader("Date", "-");
    // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
    // res.setHeader("X-RateLimit-Remaining", "-");
    // res.setHeader("X-RateLimit-Limit", "-");
    // res.setHeader("Retry-After", "-");
    res.logout;
    res.status(200).send({ Message: "log out successfully" });
  });

  // /v1/account/info use for getting user Information Back
  api.get("/info", authenticate, (req, res) => {
    // res.setHeader("X-Powered-By", "PHP 4.2.0");
    // res.setHeader("Date", "-");
    // res.setHeader("ETag", "W/kjasjh32jh3LAOmiqozeA");
    // res.setHeader("X-RateLimit-Remaining", "-");
    // res.setHeader("X-RateLimit-Limit", "-");
    // res.setHeader("Retry-After", "-");
    res.status(200).json(req.user);
  });

  api.delete("/account_delete/:id", (req, res) => {
    Account.remove(
      {
        _id: req.params.id,
      },
      (err, account) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Account Successfully Removed" });
      }
    );
  });

  api.get("/get_all_account", (req, res) => {
    Account.find({}, (err, account) => {
      if (err) {
        res.send(err);
      }
      res.json(account);
    });
  });

  return api;
};
