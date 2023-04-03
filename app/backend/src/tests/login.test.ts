import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  describe('Erros ao fazer login', () => {
    it('Erro status 400 ao fazer a requisição com email vazio', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        "email": '',
        "password": "senha123"
      });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body.message).to.equal('All fields must be filled');
    });
    it('Erro status 400 ao fazer a requisição com o campo senha vazio', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        "email": 'gabriel@email.com',
        "password": ""
      });
      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body.message).to.equal('All fields must be filled');
    });
  
    it('Erro status 401 ao fazer a requisição com senha inválida', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        "email": 'gabriel@email.com',
        "password": "senha"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body.message).to.equal('Invalid email or password');
    });

    it('Erro status 401 ao fazer a requisição com formato de email inválido', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        "email": 'gabriel@.com',
        "password": "senha123"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body.message).to.equal('Invalid email or password');
    });

    it('Erro status 401 ao fazer a requisição com usuário inexistente', async () => {
      const httpResponse = await chai.request(app).post('/login').send({
        "email": 'gabriel@gmail.com',
        "password": "senha123"
      });
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body.message).to.equal('Invalid email or password');
    });
  });
  // describe('Fazendo Login com sucesso', () => {
  //   it('Fazendo login com sucesso', async () => {
  //     const httpResponse = await chai.request(app).post('/login').send({
  //       email: 'user@user.com',
  //       password: "senha_secreta",
  //     });
  //     // expect(httpResponse.status).to.equal(200);
  //     expect(httpResponse.body.message).to.equal('nu');
  //     // expect(httpResponse.body.token).to.exist;
  //   });
  // });
});
