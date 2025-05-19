/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'


describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then((resposta) =>{
      return contrato.validateAsync(resposta.body)
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios',
    }).should((resposta => {
      expect(resposta.status).to.equal(200)
    }))
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario('arthur3', 'arthur3@qa.com.br', 'arthutteste', 'true')
    .should((resposta) =>{
      expect(resposta.body.message).to.equal('Cadastro realizado com sucesso')
      expect(resposta.status).to.equal(201)
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios/1bFocrZMAecabOv7',
      failOnStatusCode: false
    }) 
    .should((email) =>{
      expect(email.body.usuarios).to.not.equal('arthur3@qa.com.br')
      expect(email.status).to.equal(400 )
    })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
      cy.request({
        method: 'PUT',
        url: 'usuarios/HWGQQuzL4t5dxxbT',
        body:{
        "nome": "arthur 1",
        "email": "arthur@qa.com.br",
        "password": "arthutteste",
        "administrador": "true"
      }
      }).should((resposta =>{
        expect(resposta.body.message).to.equal('Registro alterado com sucesso')
        expect(resposta.status).to.equal(200)
      }))
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
      cy.request({
        method: 'DELETE',
        url:'usuarios/BZaiZlo4i8yYvSjZ'
    })
    .should((resposta) =>{
    expect(resposta.body.message).to.equal('Registro excluído com sucesso')
    expect(resposta.status).to.equal(201)
  });

  });
})
