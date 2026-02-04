import express from 'express';
import {problemRouter} from './problemRoutes';

export const v1Router = express.Router();

v1Router.use('/problems', problemRouter);