const envelopes = require('../db/envelopes');

let id = 5;

const getAllEnvelopes = (req, res) => {
    res.json(envelopes)
}

const getEnvelope = (req, res) => {
    res.json(envelopes[req.envelopeIndex])
}

const createEnvelope = (req, res) => {
    const { name, budget } = req.body;
    id++;
    if (name && budget) {
        envelopes.push({ id, name, budget });
        res.json(envelopes)
    } else {
        res.status(400).json({ msg: `Please include both budget and name` })
    }
}

const changeEnvelope = (req, res) => {
    const { name, budget } = req.body;
    if (!(name && budget)) {
        res.status(400).json({ msg: 'Please include both name and budget' })
    } else {
        envelopes[req.envelopeIndex].name = name;
        envelopes[req.envelopeIndex].budget = budget;
        res.json(envelopes)
    }
}

const deleteAllEnvelopes = (req, res) => {
    envelopes.length = 0;
    res.status(204)
}

const deleteEnvelope = (req, res) => {
    envelopes.splice(req.envelopeIndex, 1);
    res.json(envelopes)
}

const transferMoney = (req, res) => {
    const { target, amount } = req.body;
    const targetIndex = envelopes.findIndex(env => env.id === parseInt(target))
    if (targetIndex === -1) {
        res.status(404).json({ msg: `Envelope with id: ${target} not found.` })
    } else if (req.envelopeIndex === targetIndex) {
        res.status(400).json({ msg: 'Sorry you cannot transfer to the same account' })
    } else if (!(target && amount)) {
        res.status(404).json({ msg: 'please include the amount you want to transfer.' })
    } else if (envelopes[req.envelopeIndex].budget < amount) {
        res.status(400).json({ msg: 'not enough funds for this transaction' })
    } else {
        envelopes[req.envelopeIndex].budget -= amount;
        envelopes[targetIndex].budget += amount;
        res.json([envelopes[req.envelopeIndex], envelopes[targetIndex]])
    }
}

module.exports = {
    getAllEnvelopes,
    getEnvelope,
    createEnvelope,
    changeEnvelope,
    deleteAllEnvelopes,
    deleteEnvelope,
    transferMoney,
}