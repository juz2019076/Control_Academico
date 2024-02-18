const { response } = require('express');
const bcrypt = require('bcryptjs');
const Alumno = require('../models/alumno');

const registrarAlumno = async (req, res = response) => {
    const { nombre, correo, password } = req.body;
    try {
        const existeAlumno = await Alumno.findOne({ correo });
        if (existeAlumno) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un alumno con ese correo electrónico'
            });
        }
        const alumno = new Alumno(req.body);
        const salt = bcrypt.genSaltSync();
        alumno.password = bcrypt.hashSync(password, salt);
        await alumno.save();

        res.status(201).json({
            ok: true,
            msg: 'Alumno registrado exitosamente',
            alumno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar el alumno'
        });
    }
}

const loginAlumno = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        const alumno = await Alumno.findOne({ correo });
        if (!alumno) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        const validPassword = bcrypt.compareSync(password, alumno.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        res.json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            alumno
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
}

const editarPerfilAlumno = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const alumnoDB = await Alumno.findById(uid);
        if (!alumnoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un alumno con el ID proporcionado'
            });
        }
        const { password, correo, ...campos } = req.body;
        if (alumnoDB.correo !== correo) {
            const existeCorreo = await Alumno.findOne({ correo });
            if (existeCorreo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un alumno con ese correo electrónico'
                });
            }
        }
        if (password) {
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(password, salt);
        }
        const alumnoActualizado = await Alumno.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            msg: 'Alumno actualizado correctamente',
            alumno: alumnoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el perfil del alumno'
        });
    }
}

const eliminarAlumno = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const alumnoDB = await Alumno.findById(uid);
        if (!alumnoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró un alumno con el ID proporcionado'
            });
        }
        await Alumno.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Alumno eliminado correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el alumno'
        });
    }
}

module.exports = {
    registrarAlumno,
    loginAlumno,
    editarPerfilAlumno,
    eliminarAlumno
};
