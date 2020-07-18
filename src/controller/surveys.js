import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import Surveys from '../model/surveys';

export default({ config, db }) => {
  let api = Router();

  api.get('/surveys/:productId', (req, res) => {
    Surveys.find({
      productId: req.params.productId
    }, (err, surveys) => {
      if (err) {
        res.send(err)
      }
      res.json(surveys)
    })
  })

  api.post('/surveys/add_Surveys', (req, res) => {
    Surveys.findOne({
      users_id: req.body.users_id
    }).exec(function(err, surveys) {
      if (err) {
        console.log(err);
      }
      var message;
      if (surveys) {
        message = "surveys exists";
        console.log(message)
      } else {
        let newSurveys = new Surveys()
        newSurveys.productId = req.body.productId
        newSurveys.score = req.body.score
        newSurveys.users_id = req.body.users_id
        newSurveys.comment = req.body.comment
        newSurveys.profile_image = req.body.profile_image
        message = "surveys is added";
        console.log(message)
        newSurveys.save(function(err) {
          if (err) {
            res.send(err)
          }
        })

      }
      res.json({
        message: message
      });

    });

  })

  api.put('/surveys_update/:id', (req, res) => {
    Surveys.findById(req.params.id, (err, surveys) => {

      if (err) {
        res.send(err)
      }
      surveys.users_id = req.body.users_id

      surveys.productId = req.body.productId
      surveys.score = req.body.score
      surveys.comment = req.body.comment
      surveys.profile_image = req.body.profile_image

      surveys.save(function(err) {
        if (err) {
          res.send(err)
        }
        res.json({ message: "surveys info updated for specific product"})
      })
    })
  })

  api.delete('/surveys_delete/:id', (req, res) => {
    Surveys.remove({
      _id: req.params.id
    }, (err, surveys) => {
      if (err) {
        res.send(err)
      }
        res.json({message: "surveys Removed for specific product Successfully"})
      })
  })


  return api
}
