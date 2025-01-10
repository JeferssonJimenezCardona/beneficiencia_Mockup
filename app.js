let isAuthenticated = false;
let inmuebles = [
    {
        id: 1,
        direccion: 'Calle 45 #23-56',
        edificio: 'Torre Nueva',
        tipoInmueble: 'Apartamento',
        conContrato: true,
        estado: 'En alquiler',
        arrendatarioActual: 'Juan Pérez',
        fechaInicio: '2023-01-15',
        fechaFinal: '2025-01-15',
        canonArrendamiento: 1200000,
        ciudadMunicipio: 'Medellín',
        escriturasPredio: 'Registradas',
        ubicacionEspecifica: 'Piso 5, apartamento 502',
        estadoAvaluo: 'Actualizado',
        fechaAvaluo: '2023-06-10',
        edad: 8,
        vidaInmueble: 50
    }
];
let pagos = [
    {id: 1, idAvaluo: 'AV-001', cliente: 'Cliente A', fechaPago: '2024-03-15', estado: 'Pendiente', valor: 1000000},
    {id: 2, idAvaluo: 'AV-002', cliente: 'Cliente B', fechaPago: '2024-03-20', estado: 'Realizado', valor: 1500000},
    {id: 3, idAvaluo: 'AV-003', cliente: 'Cliente C', fechaPago: '2024-03-25', estado: 'Pendiente', valor: 2000000},
    {id: 4, idAvaluo: 'AV-004', cliente: 'Cliente D', fechaPago: '2024-03-10', estado: 'Vencido', valor: 1200000}
];

function renderPage(page) {
    if (page !== 'login' && !isAuthenticated) {
        renderPage('login');
        return;
    }

    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';

    if (isAuthenticated && page !== 'login') {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <ul>
                <li><a href="#" onclick="logout()">Cerrar Sesión</a></li>
                <li><a href="#" onclick="renderPage('inmuebles')">Inmuebles</a></li>
                <li><a href="#" onclick="renderPage('analitica')">Analítica</a></li>
                <li><a href="#" onclick="renderPage('chat')">Chat</a></li>
                <li><a href="#" onclick="renderPage('pagos')">Pagos</a></li>
            </ul>
        `;
        appContainer.appendChild(navbar);
    }
    
    if (page === 'login') {
        appContainer.innerHTML = `
            <div class="login-container">
                <div class="login-box">
                    <div class="login-logo">
                        <img src="logo.png" alt="Kognia Logo">
                    </div>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="username">Usuario</label>
                            <input type="text" id="username" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Contraseña</label>
                            <input type="password" id="password" required>
                        </div>
                        <button type="submit" class="btn">Iniciar Sesión</button>
                    </form>
                    <div id="login-message"></div>
                </div>
            </div>
        `;
        document.querySelector('#login-form').addEventListener('submit', handleLogin);
        return;
    }

    appContainer.innerHTML = `
        <div class="app-container">
            <aside class="sidebar">
                <div class="sidebar-logo">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-vertical-dark-CifArf6nKziSJc4mtEqLkr2eDNQAJ4.png" alt="Kognia Logo">
                </div>
               
                <nav>
                    <ul class="nav-links">
                        <li><a href="#" onclick="renderPage('inmuebles')" class="${page === 'inmuebles' ? 'active' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Inmuebles
                        </a></li>
                        <li><a href="#" onclick="renderPage('analitica')" class="${page === 'analitica' ? 'active' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            Analítica
                        </a></li>
                        <li><a href="#" onclick="renderPage('chat')" class="${page === 'chat' ? 'active' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            Chat
                        </a></li>
                        <li><a href="#" onclick="renderPage('pagos')" class="${page === 'pagos' ? 'active' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                            Pagos
                        </a></li>
                    </ul>
                </nav>
            </aside>
            <main class="main-content">
                <div id="page-content"></div>
            </main>
        </div>
    `;

    const pageContent = document.getElementById('page-content');
    
    switch (page) {
        case 'inmuebles':
            renderInmueblesPage(pageContent);
            break;
        case 'analitica':
            renderAnaliticaPage(pageContent);
            break;
        case 'chat':
            renderChatPage(pageContent);
            break;
        case 'pagos':
            renderPagosPage(pageContent);
            break;
    }
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('login-message');

    if (username === 'kognia' && password === '1234') {
        isAuthenticated = true;
        messageElement.textContent = 'Inicio de sesión exitoso';
        messageElement.className = 'success';
        setTimeout(() => {
            renderPage('inmuebles');
        }, 1000);
    } else {
        messageElement.textContent = 'Credenciales incorrectas';
        messageElement.className = 'error';
    }
}

function logout() {
    isAuthenticated = false;
    renderPage('login');
}

function renderInmueblesPage(container) {
    container.innerHTML = `
        <h1>Administración de Inmuebles</h1>
        <div class="card">
            <button class="btn" onclick="showInmuebleForm()">Agregar Inmueble</button>
            <div id="inmueble-form" style="display: none;">
                <h2>Agregar/Editar Inmueble</h2>
                <form id="inmueble-form">
                    <div class="form-group">
                        <label for="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion" required>
                    </div>
                    <div class="form-group">
                        <label for="edificio">Edificio:</label>
                        <input type="text" id="edificio" name="edificio" required>
                    </div>
                    <div class="form-group">
                        <label for="tipoInmueble">Tipo de Inmueble:</label>
                        <select id="tipoInmueble" name="tipoInmueble" required>
                            <option value="">Seleccione...</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Casa">Casa</option>
                            <option value="Local">Local</option>
                            <option value="Oficina">Oficina</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="conContrato">Inmueble con Contrato:</label>
                        <select id="conContrato" name="conContrato" required>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="estado">Estado:</label>
                        <select id="estado" name="estado" required>
                            <option value="">Seleccione...</option>
                            <option value="Disponible">Disponible</option>
                            <option value="En alquiler">En alquiler</option>
                            <option value="Vendido">Vendido</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="arrendatarioActual">Arrendatario Actual:</label>
                        <input type="text" id="arrendatarioActual" name="arrendatarioActual">
                    </div>
                    <div class="form-group">
                        <label for="fechaInicio">Fecha de Inicio:</label>
                        <input type="date" id="fechaInicio" name="fechaInicio">
                    </div>
                    <div class="form-group">
                        <label for="fechaFinal">Fecha Final:</label>
                        <input type="date" id="fechaFinal" name="fechaFinal">
                    </div>
                    <div class="form-group">
                        <label for="canonArrendamiento">Canon de Arrendamiento:</label>
                        <input type="number" id="canonArrendamiento" name="canonArrendamiento" min="0">
                    </div>
                    <div class="form-group">
                        <label for="ciudadMunicipio">Ciudad o Municipio:</label>
                        <input type="text" id="ciudadMunicipio" name="ciudadMunicipio" required>
                    </div>
                    <div class="form-group">
                        <label for="escriturasPredio">Escrituras del Predio:</label>
                        <input type="text" id="escriturasPredio" name="escriturasPredio">
                    </div>
                    <div class="form-group">
                        <label for="ubicacionEspecifica">Ubicación Específica:</label>
                        <input type="text" id="ubicacionEspecifica" name="ubicacionEspecifica">
                    </div>
                    <div class="form-group">
                        <label for="estadoAvaluo">Estado del Avalúo:</label>
                        <select id="estadoAvaluo" name="estadoAvaluo" required>
                            <option value="">Seleccione...</option>
                            <option value="Actualizado">Actualizado</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Vencido">Vencido</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="fechaAvaluo">Fecha Avalúo:</label>
                        <input type="date" id="fechaAvaluo" name="fechaAvaluo">
                    </div>
                    <div class="form-group">
                        <label for="edad">Edad:</label>
                        <input type="number" id="edad" name="edad" min="0">
                    </div>
                    <div class="form-group">
                        <label for="vidaInmueble">Vida del Inmueble:</label>
                        <input type="number" id="vidaInmueble" name="vidaInmueble" min="0">
                    </div>
                    <button type="submit" class="btn">Guardar</button>
                </form>
            </div>
        </div>
        <div class="table-container">
            <div id="inmuebles-table"></div>
            <div id="pagination"></div>
        </div>
    `;
    renderInmueblesTable();
    document.getElementById('inmueble-form').addEventListener('submit', handleInmuebleSubmit);
}

function renderAnaliticaPage(container) {
    container.innerHTML = `
        <h1>Analítica Descriptiva</h1>
        <div class="chart-container">
            <canvas id="ingresos-chart"></canvas>
        </div>
        <h2>Georreferenciación de Inmuebles en Bogotá</h2>
        <div id="map-container"></div>
        <div class="kpi-container">
            <div class="kpi-card">
                <h3>Cantidad de Arriendos</h3>
                <p id="kpi-arriendos"></ph3>Cantidad de Arriendos</h3>
                <p id="kpi-arriendos"></p>
            </div>
            <div class="kpi-card">
                <h3>Cantidad de Ventas</h3>
                <p id="kpi-ventas"></p>
            </div>
            <div class="kpi-card">
                <h3>Promedio de Ingresos</h3>
                <p id="kpi-promedio"></p>
            </div>
        </div>
    `;
    setTimeout(() => {
        renderCharts();
        renderMap();
    }, 0);
}

// function renderChatPage(container) {
//     container.innerHTML = `
//         <h1 style="
//             font-size: 2rem;
//             color: var(--text);
//             margin-bottom: 1rem;
//             text-align: center;
//             background: var(--primary-gradient);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//         ">Chat Generativo</h1>
//         <div class="chat-container" style="
//             height: 600px;
//             background: var(--surface);
//             border-radius: 1rem;
//             overflow: hidden;
//             display: flex;
//             flex-direction: column;
//             border: 1px solid var(--border);
//             box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//             position: relative;
//         ">
//             <div class="chat-header" style="
//                 background: var(--primary-gradient);
//                 padding: 1rem;
//                 color: white;
//                 text-align: center;
//                 font-weight: bold;
//                 font-size: 1.2rem;
//                 box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//             ">Alan</div>
//             <iframe src="https://copilotstudio.microsoft.com/environments/Default-a8195a51-a3b6-4a79-b3ea-7031366f77d5/bots/cr65f_2Beneficiencia2025/webchat?__version__=2" 
//                 frameborder="0" 
//                 style="
//                     width: 100%; 
//                     height: calc(100% - 50px);
//                     border: none;
//                     background: transparent;
//                 "
//             ></iframe>
//         </div>
//     `;
// }


function renderChatPage(container) {
    container.innerHTML = `
        <h1 class="chat-title">Chat Generativo</h1>
        <div class="chat-container">
            <div class="chat-header">
                <span class="chat-bot-name">Alan</span>
                <div class="chat-bot-status">
                    <span class="status-dot"></span>
                    <span class="status-text">En línea</span>
                </div>
            </div>
            <iframe src="https://copilotstudio.microsoft.com/environments/Default-a8195a51-a3b6-4a79-b3ea-7031366f77d5/bots/cr65f_2Beneficiencia2025/webchat?__version__=2" 
                frameborder="0" 
                class="chat-iframe"
            ></iframe>
        </div>
    `;
}

function renderPagosPage(container) {
    container.innerHTML = `
        <h1>Alertas y Estado de Pagos</h1>
        <div id="alertas"></div>
        <div class="table-container">
            <div id="pagos-table"></div>
            <div id="pagination"></div>
        </div>
    `;
    renderPagosTable();
    renderAlertas();
}

function showInmuebleForm() {
    const form = document.getElementById('inmueble-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function handleInmuebleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newInmueble = {
        id: inmuebles.length + 1,
        direccion: formData.get('direccion'),
        edificio: formData.get('edificio'),
        tipoInmueble: formData.get('tipoInmueble'),
        conContrato: formData.get('conContrato') === 'true',
        estado: formData.get('estado'),
        arrendatarioActual: formData.get('arrendatarioActual'),
        fechaInicio: formData.get('fechaInicio'),
        fechaFinal: formData.get('fechaFinal'),
        canonArrendamiento: parseFloat(formData.get('canonArrendamiento')),
        ciudadMunicipio: formData.get('ciudadMunicipio'),
        escriturasPredio: formData.get('escriturasPredio'),
        ubicacionEspecifica: formData.get('ubicacionEspecifica'),
        estadoAvaluo: formData.get('estadoAvaluo'),
        fechaAvaluo: formData.get('fechaAvaluo'),
        edad: parseInt(formData.get('edad')),
        vidaInmueble: parseInt(formData.get('vidaInmueble'))
    };
    inmuebles.push(newInmueble);
    renderInmueblesTable();
    e.target.reset();
    showInmuebleForm();
}

function renderInmueblesTable(page = 1, itemsPerPage = 10) {
    const tableContainer = document.getElementById('inmuebles-table');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = inmuebles.slice(start, end);

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Dirección</th>
                    <th>Edificio</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Arrendatario</th>
                    <th>Canon</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    paginatedData.forEach(inmueble => {
        tableHTML += `
            <tr>
                <td>${inmueble.direccion}</td>
                <td>${inmueble.edificio}</td>
                <td>${inmueble.tipoInmueble}</td>
                <td>${inmueble.estado}</td>
                <td>${inmueble.arrendatarioActual}</td>
                <td>$${inmueble.canonArrendamiento.toLocaleString()}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-small" onclick="editInmueble(${inmueble.id})">Editar</button>
                        <button class="btn btn-small btn-danger" onclick="deleteInmueble(${inmueble.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;

    tableContainer.innerHTML = tableHTML;

    renderPagination(page, Math.ceil(inmuebles.length / itemsPerPage), renderInmueblesTable);
}

function editInmueble(id) {
    const inmueble = inmuebles.find(i => i.id === id);
    if (inmueble) {
        document.getElementById('direccion').value = inmueble.direccion;
        document.getElementById('edificio').value = inmueble.edificio;
        document.getElementById('tipoInmueble').value = inmueble.tipoInmueble;
        document.getElementById('conContrato').value = inmueble.conContrato.toString();
        document.getElementById('estado').value = inmueble.estado;
        document.getElementById('arrendatarioActual').value = inmueble.arrendatarioActual;
        document.getElementById('fechaInicio').value = inmueble.fechaInicio;
        document.getElementById('fechaFinal').value = inmueble.fechaFinal;
        document.getElementById('canonArrendamiento').value = inmueble.canonArrendamiento;
        document.getElementById('ciudadMunicipio').value = inmueble.ciudadMunicipio;
        document.getElementById('escriturasPredio').value = inmueble.escriturasPredio;
        document.getElementById('ubicacionEspecifica').value = inmueble.ubicacionEspecifica;
        document.getElementById('estadoAvaluo').value = inmueble.estadoAvaluo;
        document.getElementById('fechaAvaluo').value = inmueble.fechaAvaluo;
        document.getElementById('edad').value = inmueble.edad;
        document.getElementById('vidaInmueble').value = inmueble.vidaInmueble;
        showInmuebleForm();
    }
}

function deleteInmueble(id) {
    if (confirm('¿Está seguro de que desea eliminar este inmueble?')) {
        const index = inmuebles.findIndex(i => i.id === id);
        if (index !== -1) {
            inmuebles.splice(index, 1);
            renderInmueblesTable();
        }
    }
}

function renderCharts() {
    const ctx = document.getElementById('ingresos-chart').getContext('2d');
    
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
            label: 'Ingresos 2024',
            data: [
                1200000, 1500000, 1800000, 1600000, 1900000, 1700000,
                1400000, 1600000, 1800000, 2000000, 1900000, 1700000
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Ingresos (COP)'
                    }
                }
            }
        }
    });

    // Actualizar KPIs
    document.getElementById('kpi-arriendos').textContent = '45';
    document.getElementById('kpi-ventas').textContent = '23';
    document.getElementById('kpi-promedio').textContent = '$1,700,000';
}

function renderMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;

    const map = L.map(mapContainer).setView([4.6097, -74.0817], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Datos simulados de inmuebles en Bogotá
    const inmueblesBogota = [
        { lat: 4.6561, lng: -74.0580, nombre: "Apartamento Centro" },
        { lat: 4.6486, lng: -74.1068, nombre: "Casa Chapinero" },
        { lat: 4.6735, lng: -74.0351, nombre: "Oficina Usaquén" },
        { lat: 4.6294, lng: -74.0652, nombre: "Local Comercial Teusaquillo" },
        { lat: 4.6777, lng: -74.0469, nombre: "Bodega Toberín" }
    ];

    inmueblesBogota.forEach(inmueble => {
        L.marker([inmueble.lat, inmueble.lng])
            .addTo(map)
            .bindPopup(inmueble.nombre);
    });
}

function renderPagosTable(page = 1, itemsPerPage = 10) {
    const tableContainer = document.getElementById('pagos-table');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = pagos.slice(start, end);

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID Avalúo</th>
                    <th>Cliente</th>
                    <th>Fecha de Pago</th>
                    <th>Estado</th>
                    <th>Valor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    paginatedData.forEach(pago => {
        tableHTML += `
            <tr>
                <td>${pago.idAvaluo}</td>
                <td>${pago.cliente}</td>
                <td>${pago.fechaPago}</td>
                <td>${pago.estado}</td>
                <td>${pago.valor}</td>
                <td>
                    <div class="button-group">
                        <button class="btn btn-small" onclick="verDetallesPago(${pago.id})">Ver Detalles</button>
                        <button class="btn btn-small btn-warning" onclick="actualizarEstadoPago(${pago.id})">Actualizar Estado</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    tableContainer.innerHTML = tableHTML;

    renderPagination(page, Math.ceil(pagos.length / itemsPerPage), renderPagosTable);
}

function renderAlertas() {
    const alertasContainer = document.getElementById('alertas');
    const hoy = new Date();
    const alertas = pagos.filter(pago => {
        const fechaPago = new Date(pago.fechaPago);
        const diasRestantes = Math.ceil((fechaPago - hoy) / (1000 * 60 * 60 * 24));
        return (diasRestantes <= 3 && pago.estado === 'Pendiente') || (diasRestantes < 0 && pago.estado !== 'Realizado');
    });

    let alertasHTML = '';
    alertas.forEach(alerta => {
        const fechaPago = new Date(alerta.fechaPago);
        const diasRestantes = Math.ceil((fechaPago - hoy) / (1000 * 60 * 60 * 24));
        let clase = '';
        let mensaje = '';

        if (diasRestantes < 0) {
            clase = 'alert-danger';
            mensaje = `Pago vencido hace ${Math.abs(diasRestantes)} días`;
        } else if (diasRestantes <= 3) {
            clase = 'alert-warning';
            mensaje = `Pago próximo a vencer en ${diasRestantes} días`;
        }

        alertasHTML += `
            <div class="alert ${clase}">
                <strong>${alerta.cliente}</strong> - ${alerta.idAvaluo}: ${mensaje}
            </div>
        `;
    });

    alertasContainer.innerHTML = alertasHTML;
}

function verDetallesPago(id) {
    const pago = pagos.find(p => p.id === id);
    if (pago) {
        alert(`Detalles del pago:
        ID Avalúo: ${pago.idAvaluo}
        Cliente: ${pago.cliente}
        Fecha de Pago: ${pago.fechaPago}
        Estado: ${pago.estado}
        Valor: ${pago.valor}`);
    }
}

function actualizarEstadoPago(id) {
    const pago = pagos.find(p => p.id === id);
    if (pago) {
        const nuevoEstado = prompt("Ingrese el nuevo estado del pago (Pendiente, Realizado, Vencido):");
        if (nuevoEstado && ['Pendiente', 'Realizado', 'Vencido'].includes(nuevoEstado)) {
            pago.estado = nuevoEstado;
            renderPagosTable();
            renderAlertas();
        } else {
            alert("Estado no válido. Por favor, ingrese Pendiente, Realizado o Vencido.");
        }
    }
}

function renderPagination(currentPage, totalPages, callback) {
    const paginationContainer = document.getElementById('pagination');
    let paginationHTML = '';

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="btn pagination-btn ${i === currentPage ? 'active' : ''}" onclick="${callback.name}(${i})">${i}</button>`;
        }
    }

    paginationContainer.innerHTML = paginationHTML;
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderPage('login');
});
