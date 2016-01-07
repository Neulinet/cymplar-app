import * as express from 'express';

import {sendError, formatSend, getAuthorizationData} from '../core/web_util';
import {salesLeadService} from './sales_lead_service';
import {SalesLead, ModelOptions} from '../../client/core/dto';

const router = express.Router();

router.post('/', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  salesLeadService.createOne(req.body, modelOptions)
    .then((member: SalesLead) => formatSend(res, member), (err) => sendError(res, err));
});

router.put('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  salesLeadService.updateOne(req.body, modelOptions)
    .then((member: SalesLead) => formatSend(res, member), (err) => sendError(res, err));
});

router.delete('/:id', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req),
    additionalData: {_id: req.params.id}
  };
  salesLeadService.removeOneById(req.params.id, modelOptions)
    .then((member: SalesLead) => formatSend(res, member), (err) => sendError(res, err));
});

router.get('/_find', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  salesLeadService.find(req.query, modelOptions)
    .then((members: SalesLead[]) => formatSend(res, members), (err: any) => sendError(res, err));
});

router.get('/_exist', (req, res) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  salesLeadService.exist(req.query, modelOptions)
    .then((exist: boolean) => formatSend(res, exist), (err: any) => sendError(res, err));
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const modelOptions: ModelOptions = {
    authorization: getAuthorizationData(req)
  };
  salesLeadService.findOneById(req.params.id, modelOptions)
    .then((member: SalesLead) => formatSend(res, member), (err: any) => sendError(res, err));
});


export = router;

