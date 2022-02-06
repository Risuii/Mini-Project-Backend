const { Users, Biodata } = require('../models');

const delet = async (req, res) => {
  try {
    Biodata.destroy({
      where: { id: req.user.id },
    }).then(() => {
      Users.destroy({
        where: { id: req.user.id },
      }).then(() => {
        res.status(202).json('berhasil dihapus');
      });
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = {
  delet,
};
