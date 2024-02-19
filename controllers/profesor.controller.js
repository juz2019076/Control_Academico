const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const { response } = require('express');

const profesorGet = async (req, res = response) => {
  const {limite, desde} = req.query;
  const query = {estado: true};

  const [total, profesor] = await Promise.all([
      Profesor.countDocuments(query),
      Profesor.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ]);

  res.status(200).json({
      total,
      profesor
  });
};

const getProfesorById = async (req, res) => {
  const {id} = req.params;
  const profesor = await Profesor.findOne({_id: id});

  res.status(200).json({
      profesor
  });
};

const profesorPut = async (req, res = response) => {
  const { id } = req.params;
  const {_id, password,  correo,  ...resto } = req.body;
  if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
  }
  const profesor =  await Profesor.findByIdAndUpdate(id, resto);
  res.status(200).json({
      msg: 'Profesor Actualizado Exitosamente!!!',
      profesor
  });
}

const profesorDelete = async (req, res) => {
  const {id} = req.params;
  const profesor = await Profesor.findByIdAndUpdate(id, {estado: false});
  const profesorAutenticado = req.profesor;

  res.status(200).json({
      msg: 'Profesor a eliminar',
      profesor,
      profesorAutenticado
  });
};

const ProfesorPost = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    const profesor = new Profesor({ nombre, correo, password, role });

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(202).json({
      profesor
    });
};

module.exports = {
    ProfesorPost,
    profesorGet,
    getProfesorById,
    profesorPut,
    profesorDelete
}