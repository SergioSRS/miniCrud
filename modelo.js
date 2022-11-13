/**
	@file Contiene el modelo de la aplicación
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
export class Modelo{
	/**
		Constructor de la clase
	**/
	constructor(){
		this.baseDatos
		this.lista = []
		this.callbacks = [] 
		this.conexionBD()
	}
	/**
		Inserta un nuevo registro.
		@param nombre {String} Atributo nombre del nuevo registro
		@param descripcion {String} Atributo descripcion del nuevo registro
        @param fecha {Date} Atributo date del nuevo registro
        @param tipo {String} Atributo tipo del nuevo registro
        @param url {String} Atributo url del nuevo registro
        @param file {String} Atributo archivo del nuevo registro
	**/
	
	registrar(callback){
        this.callbacks.push(callback)
	}
	avisar(){
		for(let callback of this.callbacks)
		callback()
	}
	/**
	 * Devuelve los registros que haya en la base de datos y luego llama a los callbacks
	 **/
	obtenerRegistro(){
		const peticion= this.baseDatos.transaction('personajes', 'readonly').objectStore('personajes').getAll();
		
		peticion.onsuccess = () => {
			this.lista = peticion.result;
			this.avisar()
		}
		peticion.onerror = () => {
			console.error("No se ha podido conectar")
		}
	}
	/**
	 * Devuelve los registros que haya en la base de datos y luego llama a los callbacks para la busqueda por nombre
	 **/
	obtenerRegistro2(nombre){
		if (!nombre){
			this.obtenerRegistro()
		}
		else{
			const peticion= this.baseDatos.transaction('personajes', 'readonly').objectStore('personajes').index('nombreIndex').getAll(nombre);
		
			peticion.onsuccess = () => {
				console.log('personajes', peticion.result)
				this.lista = peticion.result;
				this.avisar()
			}
			peticion.onerror = () => {
				console.error("No se ha podido conectar")
			}
		}
	
	}
	/** 
	 * Inserta un registro en la base de datos
	*/
	insertar(nombre, descripcion, fecha, tipo, url, file){

		if (file)
		{
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () =>
			{
				let obj={
					nombre: nombre,
					descripcion: descripcion,
					fecha: fecha,
					tipo: tipo,
					url: url, 
					file : reader.result
				}
				const almacenar=this.baseDatos.transaction('personajes','readwrite').objectStore('personajes').add(obj);
	
				almacenar.onsuccess=()=>{
					this.obtenerRegistro()
				}
					
			}
		}
		else
		{
			let obj={
				nombre: nombre,
				descripcion: descripcion,
				fecha: fecha,
				tipo: tipo,
				url: url, 
				file : null
			}
			const almacenar=this.baseDatos.transaction('personajes','readwrite').objectStore('personajes').add(obj);

			almacenar.onsuccess=()=>{
				this.obtenerRegistro()
			}
			
		}
	

	}
	/**
	 * Conecta a la base de datos
	 */
	conexionBD(){

		const bd=window.indexedDB
		if(window.indexedDB){
		
			const respuesta=indexedDB.open("Personajes",1);
		
			respuesta.onsuccess=(event)=>{
				
				this.baseDatos=event.target.result
				
				
				
				this.obtenerRegistro()
			}
			respuesta.onerror=()=>{
				console.log('ERROR');
			}
			respuesta.onupgradeneeded=(evt)=>{
				
				this.baseDatos=evt.target.result
				this.baseDatos.createObjectStore('personajes',{keyPath:'id', autoIncrement:true}).createIndex('nombreIndex', 'nombre')
				
			}
		}	
		
	}
	/**
	 * Borra un registro de la base de datos buscando un id
	 */
	borrar(id){
		const request = this.baseDatos.transaction('personajes','readwrite').objectStore("personajes").delete(id)

		request.onsuccess = () =>{
			this.obtenerRegistro();
		}
	}
	/** 
	 * Edita un registro de la base de datos buscando por un id
	*/
    editar(id, nombre, descripcion, fecha, tipo, url, file){
		
		const request = this.baseDatos.transaction('personajes','readwrite').objectStore("personajes").get(id)
		
	
		request.onerror = (evento) =>{
			console.log("fallo en editar")
		}
		request.onsuccess = (evento)=>{
			const personaje = evento.target.result
				
			if (file)
			{
				let reader = new FileReader()
				reader.readAsDataURL(file)
			
				reader.onload = () =>{
				
					personaje.nombre = nombre
					personaje.descripcion = descripcion
					personaje.fecha = fecha
					personaje.tipo = tipo
					personaje.url = url
					personaje.file = reader.result

					const modificacion = this.baseDatos.transaction('personajes','readwrite').objectStore("personajes").put(personaje)

					this.obtenerRegistro()
				}
			
			}
			else{
					personaje.nombre = nombre
					personaje.descripcion = descripcion
					personaje.fecha = fecha
					personaje.tipo = tipo
					personaje.url = url
					personaje.file = null

					const modificacion = this.baseDatos.transaction('personajes','readwrite').objectStore("personajes").put(personaje)

					this.obtenerRegistro()

			}
   		 }
	}
/**
 * Retorna la lista de datos del modelo
 * @returns this.lista
 */
	getDatos(){
		return this.lista
	}
  
}
