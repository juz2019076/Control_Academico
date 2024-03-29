const TeacherRole = (req, res, next) => {
    if (!req.profesor && !req.estudiante) {
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

    const user = req.profesor || req.estudiante;

    if (user && user.role !== "TEACHER_ROLE") {
        return res.status(401).json({
            msg: `${user.nombre} no eres Teacher, no tienes acceso`
        });
    };
    next();
}

const tieneRolAutorizado = (...roles) => {
    return (req, res, next) => {
        if (!req.profesor && !req.estudiante) {
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }

        const user = req.profesor || req.estudiante;

        if (user && !roles.includes(user.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados: ${roles.join(", ")}`
            });
        }
        next();
    }
}

module.exports = {
    TeacherRole,
    tieneRolAutorizado
}