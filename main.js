import { carregarPaises, buscarDadosPais } from './paises.js';
import { buscarDados } from './ddd.js';

window.onload = carregarPaises;

window.buscarDadosPais = buscarDadosPais;
window.buscarDados = buscarDados;