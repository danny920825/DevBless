import ExodusFetch from './exodusFetch';
async function test() {
    // Primera petición: usa caché
    const [error1, data1] = await ExodusFetch.get('https://jsonplaceholder.typicode.com/posts', { verbose: true });
    console.log('✅ Primera respuesta:', data1);
    // Segunda petición: fuerza datos frescos
    const [error2, data2] = await ExodusFetch.get('https://jsonplaceholder.typicode.com/posts', { verbose: true, bypassCache: true });
    console.log('🔄 Datos actualizados:', data2);
}
test();
//# sourceMappingURL=test.js.map