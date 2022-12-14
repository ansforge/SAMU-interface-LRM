/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* put
* Corrélation d'un dossier à un appel.
*
* idCrra String Identifiant du CRRA
* idDossier String Identifiant du dossier
* correlationDossierDto CorrelationDossier Information du dossier
* no response value expected for this operation
* */
const correlerDossierAppel = ({ idCrra, idDossier, correlationDossierDto }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idCrra,
        idDossier,
        correlationDossierDto,
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
* Appel Sortant. Crée un nouvel appel (clickToCall).
*
* idCrra String Identifiant du CRRA
* idNatPs String Identifiant de l'agent
* demandeAppelSortantDto DemandeAppelSortant Information de l'appel
* no response value expected for this operation
* */
const creerAppel = ({ idCrra, idNatPs, demandeAppelSortantDto }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        idCrra,
        idNatPs,
        demandeAppelSortantDto,
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
  correlerDossierAppel,
  creerAppel,
};
