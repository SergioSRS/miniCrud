/**
	@file Contiene el controlador de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {VistaModificar} from './vistamodificar.js'
import {VistaInicio} from './vistainicio.js'
import {VistaConsulta} from './vistaconsulta.js'
import {Modelo} from './modelo.js';
class Controlador{
    constructor(){
        window.onload = this.iniciar.bind(this)
    }
    /**
     * Inicia el modelo y las vistas
     */
    iniciar(){
        //Primero creamos el modelo porque tarda en crear
        this.modelo = new Modelo()
        
        this.divVistaInicio = document.getElementById('vistaInicio')
        this.divVistaConsulta= document.getElementById('vistaConsulta')
        this.divVistaModificar = document.getElementById('vistaModificar')
    
        this.vistaInicio = new VistaInicio(this.divVistaInicio, this);
        this.vistaConsulta = new VistaConsulta(this.divVistaConsulta, this)
        this.vistaModificar = new VistaModificar(this.divVistaModificar, this)
        this.vistaConsulta.mostrar(false)
        this.vistaModificar.mostrar(false)
       
    }
    /**
     * Oculta las vistas de la aplicacion
     */
    ocultarVistas(){
        this.vistaModificar.mostrar(false)
        this.vistaInicio.mostrar(false)
        this.vistaConsulta.mostrar(false)
    }
    /**
     * Oculta las vistas y muestra la vista de consultas de un dato en concreto
     */
    pulsarConsulta(dato){
        this.ocultarVistas();
        this.vistaConsulta.mostrar(true)
        this.vistaConsulta.pintar(dato)
      
    }
    /**
     * Oculta las vistas y muestra la vista modificar seteando los datos del registro que quieres modificar en los inputs
     */
    pulsarModificar(dato){
        this.ocultarVistas();
        this.vistaModificar.mostrar(true)
        this.vistaModificar.rellenar(dato)
    }
    /**
     * Cuano se pulsa el boton buscar de la vistainicio se piden los registros que correspondan al nombre buscado
     */
    pulsarBuscar(nombre){
        this.modelo.obtenerRegistro2(nombre)
    }
    /**
     * Se utiliza para volver a la vista inicio desde las otras vistas
     */
    pulsarVolver(){
        this.ocultarVistas();
        this.vistaInicio.mostrar(true)
    }
    /**  
     * metodo que llama al modelo para editar los datos que se encuentran en el
    */
    aceptarModificar(id, nombre, descripcion, fecha, tipo, url, file){
       
        this.modelo.editar(id, nombre, descripcion, fecha, tipo, url, file)      
    }
    /**  
     * metodo que llama al modelo para insertar datos
    */
    aceptarAlta(nombre, descripcion, fecha, tipo, url, file){
       
        this.modelo.insertar(nombre, descripcion, fecha, tipo, url, file)      
    }
    /**
     * metodo para eliminar registros del modelo
     */
    eliminarPersonaje(id){
		this.modelo.borrar(id)
	}
    getModelo(){
        return this.modelo
    }
}
const app = new Controlador()