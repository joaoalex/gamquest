
bodyParser = require('body-parser');
//var http = require("http");
//const { Json } = require("sequelize/types/utils");
//const proxy="localhost";
//const proxyport=8888;

const db = require("../models");
//const questionarioModel = require("../models/questionario.model");

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const Teams = db.teams;
const Questionario = db.questionario;
const Vetores = db.vetores;
const Respostas = db.respostas;
const Roles = db.roles;

const Op = db.Sequelize.Op;
 
exports.getusers = async (req, res) => {
  const { sheets } = await  authSheets();
  
  // Read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: "1TE9QeZB1n40jvraNvoDAwSlAUcFhNmkIV35s4YltvFk",
    range: "teams",
  });

  res.send(getRows.data.values);
}

// Retrieve all  from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Teams.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving"
      });
    });
};

// Find by team
exports.findVetoresByteam = (req, res) => {
  const team = req.params.team;

  Vetores.findAll({
    where: {
        equipa: req.params.team 
    },
    }) 
    .then(data => {
      if (data) {
        res.send(data);

      } else {
        res.status(404).send({
          message: `Cannot find records with team=${team}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving records with team=" + team
      });
    });
};

exports.findRespostasByteam = (req, res) => {
  const team = req.params.team;

  Respostas.findAll({
    where: {
        equipa: req.params.team 
    },
    order: [
      ['vetor', 'ASC'],
      ['ordem', 'ASC'],
    ],
    //attributes: ['id', 'texto', 'updated_at']
      }) 
    .then(data => {
      if (data) {
        res.send(data);

      } else {
        res.status(404).send({
          message: `Cannot find records with team=${team}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving records with team=" + team
      });
    });
};

// Find by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teams.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find records with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving records with id=" + id
      });
    });
};

// Find Role by team id
exports.findRolesByteam = (req, res) => {
  const id = req.params.id;

  Roles.findAll({ where: { team: id } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find records with team=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving records with team=" + id
      });
    });
};

// Find with an name
exports.findOneByname = (req, res) => {
  const id = req.params.name;

  Teams.findOne({ where: { name: id } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find records with name=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving records with name=" + name
      });
    });
};

// Update by id
exports.update = (req, res) => {
  const id = req.params.id;

  Teams.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Record was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update record with id=${id}. was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating record with id=" + id
      });
    });
};

// Delete by id 
exports.delete = (req, res) => {
  const id = req.params.id;

  Teams.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Record was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete record with id=${id}. Maybe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete record with id=" + id
      });
    });
};

// insert into the database.
exports.create = (req, res) => {
 console.log(req.body);
 var dados = JSON.stringify(req.body);
 console.log(dados);
 var team=JSON.parse(dados).team
 var questionario=JSON.parse(dados).questionario
 
 console.log(team);
 console.log(questionario);
 
 Questionario.create({
    equipa: team, pergunta: JSON.stringify(questionario), resposta: ""
  })
    .then(nums => {
      res.send({ message: `${nums} records were inserted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all."
      });
    });
    
};

// Delete all from the database.
/*
exports.deleteAll = (req, res) => {
  Teams.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} records were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all."
      });
    });
};
*/

// find all published
exports.findAllActive = (req, res) => {
  Teams.findAll({ where: { ativo: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving records."
      });
    });
};

