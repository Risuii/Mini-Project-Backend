const { lowerUser, lowerEmail } = require('../lib/lowerCase');
const { generateToken } = require('../lib/generateToken');
const { checkPW } = require('../lib/checkPW');
const { encrypt } = require('../lib/hashing');
const { Users, Biodata } = require('../models');

const registerAdmin = async (req, res) => {
  const {
    username, password, nama, domisili, umur, email,
  } = req.body;

  const lowerCUS = lowerUser(username);
  const lowerCEM = lowerEmail(email);
  const encryptedPassword = encrypt(password);

  try {
    if (req.body.username === '' || req.body.password === '') {
      const result = {
        status: 'error',
        message: 'Username atau Password Tidak Boleh Kosong',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }

  try {
    const user = await Users.findOne({
      where: { username: lowerCUS },
    });
    if (user) {
      const result = {
        status: 'error',
        message: 'Username Telah Terdaftar',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }
  try {
    const data = await Biodata.findOne({
      where: { email: lowerCEM },
    });

    if (data) {
      const result = {
        status: 'error',
        message: 'Email Telah Terdaftar',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }
  const user = await Users.create({
    username,
    password: encryptedPassword,
    role: 'Admin',
    Biodata: {
      nama,
      domisili,
      umur,
      email,
    },
  }, {
    include: {
      model: Biodata,
      as: 'Biodata',
    },
  });

  const result = {
    status: 'success',
    message: 'Register Berhasil',
    data: user,
  };
  return res.status(202).json(result);
};

const register = async (req, res) => {
  const {
    username, password, nama, domisili, umur, email,
  } = req.body;

  const lowerCUS = lowerUser(username);
  const lowerCEM = lowerEmail(email);
  const encryptedPassword = encrypt(password);

  try {
    if (req.body.username === '' || req.body.password === '') {
      const result = {
        status: 'error',
        message: 'Username atau Password Tidak Boleh Kosong',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }

  try {
    const user = await Users.findOne({
      where: { username: lowerCUS },
    });
    if (user) {
      const result = {
        status: 'error',
        message: 'Username Telah Terdaftar',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }
  try {
    const data = await Biodata.findOne({
      where: { email: lowerCEM },
    });

    if (data) {
      const result = {
        status: 'error',
        message: 'Email Telah Terdaftar',
      };
      return res.status(409).json(result);
    }
  } catch (err) {
    return res.status(409).json(err);
  }
  const user = await Users.create({
    username,
    password: encryptedPassword,
    role: 'User',
    Biodata: {
      nama,
      domisili,
      umur,
      email,
    },
  }, {
    include: {
      model: Biodata,
      as: 'Biodata',
    },
  });

  const result = {
    status: 'success',
    message: 'Register Berhasil',
    data: user,
  };
  return res.status(202).json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let user = {};
  try {
    user = await Users.findOne({
      where: { username },
    });
  } catch (err) {
    return res.status(409).json(err);
  }

  if (!user) {
    const result = {
      status: 'Failed',
      message: 'User Tidak Ditemukan',
    };
    return res.status(409).json(result);
  }

  if (user.role === 'Admin') {
    const result = {
      status: 'success',
      message: `Halo admin ${user.username}`,
      accessToken: generateToken(user),
    };
    return res.status(202).json(result);
  }
  try {
    user = await Users.findOne({
      where: { username },
    });
  } catch (err) {
    return res.status(409).json(err);
  }
  if (req.body.username === '' || req.body.password === '') {
    const result = {
      status: 'error',
      message: 'Username atau Password Tidak Boleh Kosong',
    };
    return res.status(409).json(result);
  }

  const isPasswordValid = checkPW(password, user.password);
  if (!isPasswordValid) {
    const result = {
      status: 'Failed',
      message: 'Password Salah',
    };
    return res.status(409).json({ result });
  }
  const result = {
    status: 'Success',
    message: 'Login Berhasil',
    accessToken: generateToken(user),
    usernameLogin: username,
  };
  return res.status(202).json(result);
};

module.exports = {
  registerAdmin,
  register,
  login,
};
