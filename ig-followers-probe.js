function generarCSV(datos, nombreArchivo) {
  // Encabezados
  let csvContent = 'Nombre,Cuenta instagram, Privada?, History? \n';

  // Agregar datos
  datos.forEach(function (fila) {
    csvContent += fila.join(',') + '\n';
  });

  // Crear un objeto Blob con el contenido CSV
  var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

  // Crear un enlace de descarga
  var enlace = document.createElement('a');
  enlace.href = window.URL.createObjectURL(blob);
  enlace.download = nombreArchivo;

  // Agregar el enlace al documento
  document.body.appendChild(enlace);

  // Simular clic en el enlace para iniciar la descarga
  enlace.click();

  // Eliminar el enlace del documento
  document.body.removeChild(enlace);
}

const targuetAccountHashtag = '';
const accountHeaders = {}; // Get inspecting your browser and some ig request

let config = {
  headers: accountHeaders,
  referrer: `https://www.instagram.com/${targuetAccountHashtag}/followers/`, // REPLACE FOR YOUR TARGET ACCOUNT
  referrerPolicy: 'strict-origin-when-cross-origin',
  body: null,
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
};

const users = [];
const limiter = 500; // RECOMMENDED FOR PREVENT ACCOUNT BLOCK AND TRACK
let max_id = undefined;
const targuetAccountId = '';

for (let i = 0; i < limiter; i++) {
  const url = new URL(
    `https://www.instagram.com/api/v1/friendships/${targuetAccountId}/followers/?count=25&search_surface=follow_list_page`
  );

  if (max_id) {
    url.searchParams.set('max_id', max_id);
  }
  const crudResponse = await fetch(url.href, config);
  const res = await crudResponse.json();

  if (res.next_max_id) {
    max_id = res.next_max_id;
  }

  users.push(...res.users);

  console.info("Request number: ", i + 1);
}

console.info("Probe finished");
console.info("Generating csv file");

generarCSV(
  users.map((u) => [
    u.full_name,
    'https://www.instagram.com/' + u.username,
    u.is_private ? 'SI' : 'NO',
    u.latest_reel_media > 0 ? 'SI' : 'NO',
  ])
);

console.info("csv file generated");
