const bcryptjs = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const Curso = require('../models/cursos');
const { response } = require('express');

const estudianteGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, estudiante] = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        estudiante
    });
}

const getEstudianteById = async (req, res) => {
    const {id} = req.params;
    const estudiante = await Estudiante.findOne({_id: id});

    res.status(200).json({
      estudiante
    });
}



const estudiantePut = async (req, res = response) => {
  const { id } = req.params;
  const { curso, ...resto } = req.body;
  try {
      if (!curso) {
          return res.status(400).json({ error: 'No definiste el campo "Curso" en tu solicitud' });
      }
      const cursosExistentes = await Curso.find({ _id: { $in: curso } });
      
      if (cursosExistentes.length !== curso.length) {
          return res.status(400).json({ error: `Los siguientes cursos no existen en la base de datos:`});
      }  
      const estudiante = await Estudiante.findByIdAndUpdate(id, { ...resto, curso });  
      
      res.status(200).json({
          msg: 'Estudiante actualizado exitosamente!!!',
          estudiante
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al actualizar Estudiante' });
  }
}

const estudianteDelete = async (req, res) => {
    const {id} = req.params;
    const estudiante = await Estudiante.findByIdAndUpdate(id, {estado: false});
    const estudianteAutenticado = req.estudiante;

    res.status(200).json({
        msg: 'Estudiante a eliminar',
        estudiante,
        estudianteAutenticado
    });
}

const estudiantePost = async (req, res) => {
    const { nombre, email, password } = req.body;
    const estudiante = new Estudiante({ nombre, email, password });
    const salt = bcryptjs.genSaltSync();
    estudiante.password = bcryptjs.hashSync(password, salt);
    await estudiante.save();
    res.status(202).json({
      estudiante
    });
}

module.exports = {
    estudiantePost,
    estudianteGet,
    getEstudianteById,
    estudiantePut,
    estudianteDelete
}