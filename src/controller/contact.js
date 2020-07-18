import mongoose from 'mongoose';
import { Router } from 'express';
import Contact from '../model/contact';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  api.get('/contact/get_all_contact', (req, res) => {
    Contact.find({}, (err, contact) => {
      if (err) {
        res.send(err)
      }
      res.json(contact)
    });
  });

  api.post('/contact/add_contact', (req, res) => {
    let newContact = new Contact()
    newContact.comment = req.body.comment

    newContact.save(err => {
      if (err) {
        res.send(err)
      }
      res.json({Message: 'contact comment has been added Successfully'})
    })
  })

  api.get('/contact/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err)
      }
      res.json(contact)
    })
  })

  api.delete('/contact_delete/:id', (req, res) => {
    Contact.remove({_id: req.params.id}, (err, contact) => {
      if (err) {
        res.send(err)
      }
      res.send({Message: 'The contact comment has been Successfully deleted'})
    })
  })

  return api
}
