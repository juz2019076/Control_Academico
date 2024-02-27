const Role = require('../models/role');
const Estudiante = require('../models/estudiante');
const Profesor =  require('../models/profesor')
const Curso = require('../models/cursos');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeProfesorById = async (id = '') => {
    const existeProfesor = await Profesor.findOne({id});
    if(existeProfesor){
        throw new Error(`El profesor con el ${ id } no existe`)
    }
}

const existeAsignaProfCurso = async (profesorId, cursoId) => {
    const asignacion = await Profesor.findOne({ _id: profesorId, curso: cursoId });
    return asignacion !== null;
};
//------------------------------------------------ Cursos --------------------------------------
const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`el id ${id} no pertenece a un curso`)
    }
}

const existeEstudianteById = async (id = '') => {
    const existeEstudiante = await Estudiante.findOne({id});
    if(existeEstudiante){
        throw new Error(`El estudiante con el ${ id } no existe`)
    }
}

const existeAsignaEstuCurso = async (estudianteId, cursoId) => {
    const asignacion = await Estudiante.findOne({ _id: estudianteId, curso: cursoId });
    return asignacion !== null;
};

const existeEmailEstudiante = async (correo = '') => {
    const existeEmailA = await Estudiante.findOne({correo});
    if(existeEmailA){
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
}

const existeCursoByIdA = async (cursoId) => {
    const curso = await Curso.findById(cursoId);
    if (!curso || curso.eliminado) {
        throw new Error(`El curso con el ID ${cursoId} no existe`);
    }
};

module.exports = {
    esRoleValido,
    existenteEmail,
    existeProfesorById,
    existeCursoById,
    existeEmailEstudiante,
    existeEstudianteById,
    existeAsignaEstuCurso,
    existeAsignaProfCurso,
    existeCursoByIdA
}