const Profesor = require('../models/profesor');

const crearProfesor = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;
    const profesor = new Profesor({ nombre, correo, password });
    await profesor.save();
    res.status(201).json({
      ok: true,
      profesor
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear el profesor'
    });
  }
};
const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.json({
      ok: true,
      profesores
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener los profesores'
    });
  }
};
const obtenerProfesorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findById(id);
    if (!profesor) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Profesor no encontrado'
      });
    }
    res.json({
      ok: true,
      profesor
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener el profesor'
    });
  }
};

const actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;
    const profesorActualizado = await Profesor.findByIdAndUpdate(
      id,
      { nombre, correo, password },
      { new: true }
    );
    if (!profesorActualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Profesor no encontrado'
      });
    }
    res.json({
      ok: true,
      profesor: profesorActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar el profesor'
    });
  }
};
const eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    await Profesor.findByIdAndDelete(id);
    res.json({
      ok: true,
      mensaje: 'Profesor eliminado correctamente'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar el profesor'
    });
  }
};

module.exports = {
  crearProfesor,
  obtenerProfesores,
  obtenerProfesorPorId,
  actualizarProfesor,
  eliminarProfesor
};
