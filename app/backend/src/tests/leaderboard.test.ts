import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', () => {
  describe('Retornando ta classificação baseado na requisição', () => {
    it('Retornando status 200 quando é feita a requisição para /home', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home');
      expect(httpResponse.status).to.equal(200);
    });

    it('Retornando status 200 quando é feita a requisição para /away', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/away');
      expect(httpResponse.status).to.equal(200);
    });

    it('Retornando status 200 quando é feita a requisição para /leaderboard', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard');
      expect(httpResponse.status).to.equal(200);
    });
  });
});
