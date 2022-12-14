/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* post
* Afficher le dossier.
*
* idCrra String Identifiant du CRRA
* idDossier String Identifiant du dossier
* body AffichageDossier Information du dossier
* no response value expected for this operation
* */
const afficherDossier = ({ idCrra, idDossier, body }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idCrra,
        idDossier,
        body,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* post
* Appel Entrant.
*
* idCrra String Identifiant du CRRA
* idNatPs String Identifiant de l'agent
* body AppelEntrant Information de l'appel
* no response value expected for this operation
* */
const appelEntrant = ({ idCrra, idNatPs, body }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idCrra,
        idNatPs,
        body,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  afficherDossier,
  appelEntrant,
};
