import express from 'express';
import config from '../config';
import middleware from '../middleware';
import phone from '../controller/phone';
import tablet from '../controller/tablet';
import watch from '../controller/watch';
import laptop from '../controller/laptop';
import favorite from '../controller/favorite';
import basket from '../controller/basket';
import surveys from '../controller/surveys';

import contact from '../controller/contact';
import account from '../controller/account';
import initializeDb from '../db';

let router = express();

initializeDb (db =>{

  router.use(middleware({config,db}));

  router.use('/technoop',phone({ config, db}));
  router.use('/technoop',tablet({ config, db}));
  router.use('/technoop',watch({ config , db}));
  router.use('/technoop',laptop({ config , db}));
  router.use('/technoop',contact({ config , db}));
  router.use('/technoop',favorite({ config , db}));
  router.use('/technoop',basket({config , db}));
  router.use('/technoop',surveys({config , db}));
  router.use('/account', account({config , db}));

});

export default router;
