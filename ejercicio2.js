// const nombre = "Carolina";
// const notas = [4.0, 4.5, 3.8];
// const promedio = (notas[0] + notas[1] + notas[2]) / 3;
// console.log(`Aprendiz: ${nombre}`);
// console.log(`Promedio: ${promedio.toFixed(2)}`);
// console.log(`Estado: ${promedio >= 3 ? "Aprobado" : "No Aprobado"}`);


// const edad = 18;
// const mensaje = edad >= 18
//  ? "Mayor de edad"
//  : "Menor de edad";
// console.log(mensaje); // Mayor de edad


// const aprendiz = {
//  nombre: "Gustavo",
//  ficha: 3223874,
//  programa: "ADSO"
// };
// console.log(aprendiz.nombre); // Gustavo
// console.log(aprendiz["ficha"]); // 3223874
// console.log(aprendiz);

// aprendiz.edad = 22;
// aprendiz.programa = "Desarrollo Web";
// console.log(aprendiz);

// // { nombre: "Gustavo", ficha: 3223874,
// // programa: "Desarrollo Web", edad: 22 }



const aprendiz = {
 nombre: "Carolina",
 ficha: 3223876,

 saludar: function() {
 console.log(`Hola, soy ${this.nombre}`);
 },

 mostrarInfo: function() {
 console.log(`Ficha: ${this.ficha}`);
 }
};
aprendiz.saludar(); // Hola, soy Carolina
aprendiz.mostrarInfo(); // Ficha: 3223876