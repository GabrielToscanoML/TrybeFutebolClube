import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  it('Retornando todos os times com status 200', async () => {
    const httpResponse = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.equal(200);
  });

  it('Buscando time por ID = 2, retornando o Bahia', async () => {
    const httpResponse = await chai.request(app).get('/teams/2');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body.teamName).to.equal('Bahia');
  });
});
