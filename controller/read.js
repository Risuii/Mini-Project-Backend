const { Users, Biodata } = require('../models');

const read = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { id: req.user.id },
      include: {
        model: Biodata,
        as: 'Biodata',
      },
    });
    if (!user) {
      return res.status(404).json('error');
    }
    return res.status(202).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  read,
};
