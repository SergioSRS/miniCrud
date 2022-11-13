/**
	@file Contiene la vista inicial de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaInicio extends Vista{
	/**
		Constructor de la clase
	**/
	
	constructor(div,controlador){
		super(div)
		this.controlador=controlador
		
		//Hacemos que la VistaCRUD "observe" al Modelo
		this.modelo = this.controlador.getModelo()
		this.modelo.registrar(this.actualizar.bind(this))
		//Valores para hacer un alta
		this.iNombre = this.div.getElementsByTagName('input')[0]
		this.iDescripcion = this.div.getElementsByTagName('input')[1]
		this.iFecha = this.div.getElementsByTagName('input')[2]
		this.iTipo = this.div.getElementsByTagName('select')[0]
		this.iUrl = this.div.getElementsByTagName('input')[3]
		this.iFile= this.div.getElementsByTagName('input')[4]	
		//Valor para buscar
		this.iBuscar = this.div.getElementsByTagName('input')[5]
		//Boton para buscar
		this.btnBuscar = this.div.getElementsByTagName('button')[1]
		//Boton para aceptar los datos
		this.btnAceptar = this.div.getElementsByTagName('button')[0]
		//Div para la lista de personajes insertados
		this.tabla = this.div.getElementsByTagName('tbody')[0]
		//Eventos
		this.btnAceptar.onclick = this.aceptar.bind(this)
		this.btnBuscar.onclick = this.buscar.bind(this)
		
	}
	/**
	 * Metodo para ingresar un registro
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

				this.controlador.aceptarAlta(this.iNombre.value, this.iDescripcion.value,
					this.iFecha.value, this.iTipo.value, this.iUrl.value , this.iFile.files[0])

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
	}
	/**
	 * Refresca y crea la tabla de ingresos de la consulta
	 */
	actualizar(){
	
		this.borrarIngresos()
		
		let datos = this.modelo.getDatos()
		if(datos != null)
		{
			for (let dato of datos){

				let tr = document.createElement('tr')
				this.tabla.appendChild(tr)
				let td1 = document.createElement('td')
				tr.appendChild(td1)
				td1.textContent = dato.nombre
			
				let td2 = document.createElement('td')
				tr.appendChild(td2)
				if (dato.file){
					
					let img = document.createElement('img')
					img.setAttribute('width', '96px')
					img.setAttribute('height', '96px')
					img.setAttribute('src', dato.file)
					td2.appendChild(img)
				}
				else{
					td2.textContent=("Sin foto 😞")
				}
				let td3 = document.createElement('td')
			
				tr.appendChild(td3)
				let spanEliminar = document.createElement('span')
				td3.appendChild(spanEliminar)
				spanEliminar.classList.add('icono')
				spanEliminar.textContent = '🗑'
				spanEliminar.onclick = this.eliminar.bind(this, dato.id)
			
				let spanConsultar = document.createElement('span')
				td3.appendChild(spanConsultar)
				spanConsultar.classList.add('icono')
				spanConsultar.textContent = '🔎'
				spanConsultar.onclick = this.consultar.bind(this, dato)
			
				let spanEditar = document.createElement('span')
				td3.appendChild(spanEditar)
				spanEditar.classList.add('icono')
				spanEditar.textContent = '✏'
				spanEditar.onclick = this.editar.bind(this, dato)
		}
		if(datos.length==0)
		{
			let tr = document.createElement('tr')
			this.tabla.appendChild(tr)
			let td1 = document.createElement('td')
			tr.appendChild(td1)
			td1.textContent = "No hay registros"
			td1.setAttribute("colspan", "3")
		}
	
	}
	}
	/**
	 * Metodo para borrar los registros de la vista
	 */
	borrarIngresos(){
		while (this.tabla.firstElementChild)
		this.tabla.firstElementChild.remove()
	}
	/**
	 * Metodo para buscar por nombre en la tabla registro
	 */
	buscar(){
		this.controlador.pulsarBuscar(this.iBuscar.value)
		this.actualizar();
	}
	/** 
	 * Metodo para eliminar un registro
	*/
	eliminar(id){	
		this.controlador.eliminarPersonaje(id)
		this.actualizar();
	}
	/** 
	 * Metodo para consultar un registro 
	*/
	consultar(dato){	
		this.controlador.pulsarConsulta(dato);
	}
	/** 
	 * Metodo para editar un registro
	*/
	editar(dato){
		this.controlador.pulsarModificar(dato);
		this.actualizar();
	}
}
