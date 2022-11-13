/**
	@file Contiene la vista modificar de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaModificar extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
        
        this.id = null;
    	this.iNombre = this.div.getElementsByTagName('input')[0]
		this.iDescripcion = this.div.getElementsByTagName('input')[1]
		this.iFecha = this.div.getElementsByTagName('input')[2]
		this.iTipo = this.div.getElementsByTagName('select')[0]
		this.iUrl = this.div.getElementsByTagName('input')[3]
        this.iFile= this.div.getElementsByTagName('input')[4]

        this.btnAceptar = this.div.getElementsByTagName('button')[0]
        this.btnVolver = this.div.getElementsByTagName('button')[1]
      
        this.btnVolver.onclick = this.volver.bind(this)
        this.btnAceptar.onclick =this.aceptar.bind(this)
        
        
    }
    /** 
     * Rellena los inputs con los valores del campo a modificar
    */
    rellenar(dato){
     
        this.id = dato.id
        this.iNombre.value = dato.nombre
        this.iDescripcion.value = dato.descripcion
        this.iFecha.value = dato.fecha
        this.iTipo.value = dato.tipo
        this.iUrl.value = dato.url
        this.iFile.value = null
        
    }
    /**
     * Introduce y valida los cambios que se quieren realizar en el campo
     */
    aceptar(){
        let expRegNombre = /^[A-Z][a-z]{2,9}$/
		try{
			if(!expRegNombre.test(this.iNombre.value))
			throw "Introduce un nombre válido"
			if(!this.iDescripcion.value)
			throw "Debes de introducir descripcion"
			if(!this.iFecha.value)
			throw "Debes de introducir una fecha de aparición"
			if(!this.iTipo.value)
			throw "Debes introducir un tipo"
			if(!this.iUrl.value)
			throw "Debes de introducir una url"
			
            this.controlador.aceptarModificar(this.id,this.iNombre.value, this.iDescripcion.value,
                this.iFecha.value, this.iTipo.value, this.iUrl.value, this.iFile.files[0])

			this.iNombre.value = null
			this.iDescripcion.value = ""
			this.iFecha.value = ""
			this.iTipo.value = ""
			this.iUrl.value = ""
	        this.iFile.value = null 
	
		}
		catch(error){
			alert(error)
		}
        this.controlador.pulsarVolver();
    }
    /**
     * Vuelve a la vista inicio de la aplicacion
     */
    volver(){
        this.controlador.pulsarVolver();
    }
}