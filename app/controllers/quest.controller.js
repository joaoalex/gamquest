const { google } = require("googleapis");
bodyParser = require('body-parser');
var http = require("http");
//const { Json } = require("sequelize/types/utils");
const proxy="localhost";
const proxyport=8888;

const db = require("../models");
//const questionarioModel = require("../models/questionario.model");

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const Quest = db.quests;
const Questionario = db.questionario;
const Vetores = db.vetores;
const Respostas = db.respostas;

const Op = db.Sequelize.Op;


// update
exports.updatesheets = (req, res) => {
console.log("updatesheets");

    console.log('setting up proxy to call google');
    var options = {
      host: proxy,
      port: proxyport,
      path: "https://script.google.com/macros/s/AKfycbz3NrHTF_5sJuOJwhFpQG7bQbgufJlPAecmNgthEdZ8O88Akn-D/exec?rate=2&phone=962034069&email=joao.alexandre@cgd.pt",
      headers: {
        Host: "script.google.com"
      }
    };
    console.log('calling google');
    http.get(options, function(res) {
      console.log(res);
      res.pipe(process.stdout);
    });
  
 }

 
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

  Quest.findAll({ where: condition })
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

  Quest.findByPk(id)
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

// Find with an name
exports.findOneByname = (req, res) => {
  const id = req.params.name;

  Quest.findOne({ where: { name: id } })
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

  Quest.update(req.body, {
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

  Quest.destroy({
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
exports.deleteAll = (req, res) => {
  Quest.destroy({
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

// find all published
exports.findAllPublished = (req, res) => {
  Quest.findAll({ where: { published: true } })
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

