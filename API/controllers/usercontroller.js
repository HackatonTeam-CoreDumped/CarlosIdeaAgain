const UserSchema = require('../models/user');

function addUser(req, res) {
  console.log('Adding user'.blue);
  const user = new UserSchema(req.body);
  user.save((err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  });
}

// REQUIERE PERMISOS DE ADMINISTRADOR

function getUsers(req, res) {
  console.log('GET de todos los usuarios'.blue);
  UserSchema.find({}, (err, users) => {
    if (err) return res.status(500).send(err);
    if (!users) return res.status(404).send('No hay usuarios registrados');

    return res.status(200).send({ users });
  });
}

function seguir(req, res) { // PARAM SIGUE A BODY
  const { email } = req.params;
  UserSchema.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    user.sigue.push(req.body.email);
    UserSchema.updateOne({ email }, user, (error, updated) => {
      if (err) return res.status(500).send(error);
      if (!updated) return res.status(404).send('...what');

      return 'ok';
    });
    return 'ok';
  });
  UserSchema.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    user.seguidores.push(email);
    UserSchema.updateOne({ email: req.body.email }, user, (error, updated) => {
      if (error) return res.status(500).send(err);
      if (!updated) return res.status(404).send('...wtf?');

      return 'ok';
    });
    return res.status(200).send('Todo correcto');
  });
}
/* WIP
function unfollow(req, res) { // PARAM HACE UNFOLLOW A BODY
  const { email } = req.params;
  UserSchema.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    for (let i = 0; i < user.sigue.lenght; i++) {
      if (user.sigue[i] ===)
    }
    UserSchema.updateOne({ email }, user, (error, updated) => {
      if (err) return res.status(500).send(error);
      if (!updated) return res.status(404).send('...what');

      return 'ok';
    });
    return 'ok';
  });
  UserSchema.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');

    user.seguidores.push(email);
    UserSchema.updateOne({ email: req.body.email }, user, (error, updated) => {
      if (error) return res.status(500).send(err);
      if (!updated) return res.status(404).send('...wtf?');

      return 'ok';
    });
    return res.status(200).send('Todo correcto');
  });
}
*/

function getUser(req, res) {
  const { email } = req.params;
  console.log(`GET de ${email}`.blue);
  UserSchema.findOne({ $or: [{ email }, { username: email }] }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('No existe el usuario');

    return res.status(200).send({ user });
  });
}

function editUser(req, res) {
  const { username } = req.params;
  const updated = req.body;
  console.log(`EDITANDO al usuario ${username}`);

  UserSchema.findOneAndUpdate({ username }, updated, (err) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('Usuario actualizado correctamente');
  });
}

function emailUsado(req, res) {
  const { email } = req.params;
  UserSchema.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('NO EXISTE');
    return res.status(200).send('');
  });
}

function userUsado(req, res) {
  const { username } = req.params;
  UserSchema.findOne({ username }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('NO EXISTE');
    return res.status(200).send('');
  });
}

function logIn(req, res) {
  const { body } = req;
  if (!body || !body.email || !body.password) return res.status(400).send('BAD PETITION');
  UserSchema.findOne({ email: body.email }, (err, user) => {
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send('User not found');
    if (user.password !== body.password) return res.status(403).send('Wrong password');

    return res.status(200).send(user);
  });
  return 'ok';
}

module.exports = {
  addUser,
  getUsers,
  editUser,
  getUser,
  emailUsado,
  userUsado,
  logIn,
  seguir,
};
