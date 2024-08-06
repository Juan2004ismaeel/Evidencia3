// Callback Example
function fetchPokemonCallback(name, callback) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    fetch(url)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

// Promise Example
function fetchPokemonPromise(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Pokémon no encontrado');
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Async/Await Example
async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
    const pokemonCard = document.getElementById('pokemonCard');
    const pokemonOutput = document.getElementById('pokemonOutput');

    try {
        const data = await fetchPokemonPromise(pokemonName);
        pokemonOutput.innerHTML = `
            <h3>${data.name.toUpperCase()}</h3>
            <p>ID: ${data.id}</p>
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
            <p>Tipos: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <img src="${data.sprites.front_default}" alt="${data.name} image">
        `;
        pokemonCard.style.display = 'block';
    } catch (error) {
        pokemonOutput.innerHTML = `<p style="color: red;">${error.message}</p>`;
    }
}

function closeCard() {
    document.getElementById('pokemonCard').style.display = 'none';
}

function showDefinition(type) {
    const definitions = {
        callback: {
            title: 'Callback',
            content: `
                <p>Un callback es una función que se pasa como argumento a otra función para ser ejecutada posteriormente. Esto permite ejecutar código de manera asíncrona, lo cual es útil cuando queremos realizar una operación que lleva tiempo, como una solicitud de red o una operación de lectura/escritura en un archivo, y continuar con el flujo del programa sin bloquear la ejecución del mismo.</p>
                <p>Ejemplo de Callback:</p>
                <button onclick="runCallbackExample()">Ejecutar Ejemplo de Callback</button>
                <div id="callbackOutput"></div>
            `
        },
        promise: {
            title: 'Promesa',
            content: `
                <p>Una promesa es un objeto que representa la eventual finalización o fracaso de una operación asincrónica. Las promesas tienen tres estados principales: pendiente (pending), cumplida (fulfilled) y rechazada (rejected). Una promesa comienza en el estado pendiente y, dependiendo del resultado de la operación asincrónica, puede cambiar a cumplida o rechazada.</p>
                <p>Ejemplo de Promesa:</p>
                <button onclick="runPromiseExample()">Ejecutar Ejemplo de Promesa</button>
                <div id="promiseOutput"></div>
            `
        },
        async: {
            title: 'Función Async',
            content: `
                <p>Una función marcada con la palabra clave <code>async</code> siempre devuelve una promesa. Dentro de una función <code>async</code>, puedes usar la palabra clave <code>await</code> para esperar a que una promesa se resuelva antes de continuar con el código. Esto simplifica el trabajo con promesas, haciendo que el código asíncrono se lea y escriba de manera más similar al código síncrono.</p>
                <p>Ejemplo de Función Async:</p>
                <button onclick="runAsyncExample()">Ejecutar Ejemplo de Función Async</button>
                <div id="asyncOutput"></div>
            `
        },
        await: {
            title: 'Await',
            content: `
                <p>La palabra clave <code>await</code> se usa dentro de funciones <code>async</code> para pausar la ejecución de la función hasta que la promesa que se está esperando se resuelva o sea rechazada. Esto permite escribir código asíncrono que se parece al código síncrono, lo que facilita su lectura y mantenimiento.</p>
                <p>Ejemplo de Await:</p>
                <button onclick="runAwaitExample()">Ejecutar Ejemplo de Await</button>
                <div id="awaitOutput"></div>
            `
        }
    };

    const pokemonCard = document.getElementById('pokemonCard');
    const pokemonOutput = document.getElementById('pokemonOutput');

    const definition = definitions[type] || { title: 'No Encontrado', content: 'Definición no encontrada.' };

    setTimeout(() => {
        pokemonOutput.innerHTML = `
            <h3>${definition.title}</h3>
            ${definition.content}
        `;
        pokemonCard.style.display = 'block';
    }, 1000); // Aparece después de 1 segundo
}

// Funciones para ejecutar ejemplos
function runCallbackExample() {
    fetchPokemonCallback('pikachu', (error, data) => {
        if (error) {
            document.getElementById('callbackOutput').innerHTML = '<p style="color: red;">' + error.message + '</p>';
        } else {
            document.getElementById('callbackOutput').innerHTML = '<p><strong>' + data.name.toUpperCase() + '</strong><br>ID: ' + data.id + '<br>Altura: ' + (data.height / 10) + ' m<br>Peso: ' + (data.weight / 10) + ' kg</p>';
        }
    });
}

async function runPromiseExample() {
    try {
        const data = await fetchPokemonPromise('pikachu');
        document.getElementById('promiseOutput').innerHTML = '<p><strong>' + data.name.toUpperCase() + '</strong><br>ID: ' + data.id + '<br>Altura: ' + (data.height / 10) + ' m<br>Peso: ' + (data.weight / 10) + ' kg</p>';
    } catch (error) {
        document.getElementById('promiseOutput').innerHTML = '<p style="color: red;">' + error.message + '</p>';
    }
}

async function runAsyncExample() {
    try {
        const data = await fetchPokemon();
        document.getElementById('asyncOutput').innerHTML = '<p><strong>' + data.name.toUpperCase() + '</strong><br>ID: ' + data.id + '<br>Altura: ' + (data.height / 10) + ' m<br>Peso: ' + (data.weight / 10) + ' kg</p>';
    } catch (error) {
        document.getElementById('asyncOutput').innerHTML = '<p style="color: red;">' + error.message + '</p>';
    }
}

async function runAwaitExample() {
    try {
        const data = await fetchPokemonPromise('pikachu');
        document.getElementById('awaitOutput').innerHTML = '<p><strong>' + data.name.toUpperCase() + '</strong><br>ID: ' + data.id + '<br>Altura: ' + (data.height / 10) + ' m<br>Peso: ' + (data.weight / 10) + ' kg</p>';
    } catch (error) {
        document.getElementById('awaitOutput').innerHTML = '<p style="color: red;">' + error.message + '</p>';
    }
}
