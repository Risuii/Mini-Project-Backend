const { lowerUser } = require('../lib/lowerCase');
const { encrypt } = require('../lib/hashing');
const { Users, Biodata } = require('../models');

const edit = async (req, res) => {
  const {
    username, password, nama, domisili, umur, email,
  } = req.body;

  const lowerCUS = lowerUser(username);
  const encryptedPassword = encrypt(password);

  try {
    if (req.body.username === '' || req.body.password === '' || req.body.nama === '' || req.body.email === '') {
      return res.status(406).json('Di Isi Terlebih Dahulu');
    }
    const user = await Users.findOne({
      where: { username: lowerCUS },
    });
    if (user) {
      return res.status(406).json('Username Telah Terdaftar');
    }
  } catch (err) {
    return res.status(400).json(err);
  }
  Users.update({
    username,
    password: encryptedPassword,
  }, { where: { id: req.user.id } })
    .then(() => {
      Biodata.update({
        nama,
        domisili,
        umur,
        email,
      }, { where: { user_id: req.user.id } });
    });
  const result = {
    status: 'success',
    message: 'data berhasil diupdate',
  };
  return res.status(202).json(result);
};

module.exports = {
  edit,
};
