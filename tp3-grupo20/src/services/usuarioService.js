const usuarioService= ( ()=>{
 
    //bd simulada
 const usuariosRegistrados = [
  { nombre: "Juan Pérez", dni: "12345678", rol: "Alumno", institucion: "Universidad Nacional", password: "1234" },
  { nombre: "María Sosa", dni: "11223344", rol: "Docente", institucion: "Universidad Nacional", password: "profesora2026" }
];

//buscar usuario por DNI y contraseña
const login = (dni, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const encontrado = usuariosRegistrados.find(
            u => u.dni === dni && u.password === password);
        if (encontrado) {
            resolve({ dni: encontrado.dni, nombre: encontrado.nombre, rol: encontrado.rol, institucion: encontrado.institucion });
        } else {
            reject(new Error("Usuario o contraseña incorrectos"));
        }
    }, 300);
});
};

return { login };

});
export default usuarioService();