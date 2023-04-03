import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  describe('Retornando todas as partidas', () => {
    it('Retornando as partidas sem filtro', async () => {
      const httpResponse = await chai.request(app).get('/matches');
      expect(httpResponse.status).to.equal(200);
    });

    it('Retornando as partidas em progresso', async () => {
      const httpResponse = await chai.request(app).get('/matches?inProgress=true');
      expect(httpResponse.status).to.equal(200);
    });
  });
});
