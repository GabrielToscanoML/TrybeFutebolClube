import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard/home', () => {
  describe('Retornando ta classificação baseado nos times da casa', () => {
    it('Retornando status 200 quando é feita a requisição', async () => {
      const httpResponse = await chai.request(app).get('/leaderboard/home');
      expect(httpResponse.status).to.equal(200);
    });

    // it('Retornando as partidas em progresso', async () => {
    //   const httpResponse = await chai.request(app).get('/matches?inProgress=true');
    //   expect(httpResponse.status).to.equal(200);
    // });
  });
});
