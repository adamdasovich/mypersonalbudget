const envelopes = require('../middleware/envelopeId.js');

module.exports = (req, res, next) => {
    const id = req.params.id;
    const envelopeIndex = envelopes.findIndex(env => env.id === id);
    if (envelopeIndex === -1) {
        res.status(404).json({ msg: `Envelope with id: ${id} not found.` })
    } else {
        req.envelopeIndex = envelopeIndex;
        next();
    }
}