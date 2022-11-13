/**
	@file Contiene la vista consulta de la aplicacion
	@author Sergio Rivera
	@license GPL-3.0-or-later
**/
import {Vista} from './vista.js'
export class VistaConsulta extends Vista{
    constructor(div,controlador){
		super(div)
        this.controlador = controlador
        this.modelo = this.controlador.getModelo()
        
    }
    /** 
     *  Pinta la vista con los datos
    */
    pintar(dato){
       
        this.borrarIngresos()

                let titulo = document.createElement('h2')
                this.div.appendChild(titulo)
                titulo.textContent = dato.nombre

                let imagen = document.createElement('div')
                this.div.appendChild(imagen)

                let img = document.createElement('img')
                imagen.appendChild(img)
             
                img.setAttribute('width', '200px')
                img.setAttribute('height', '200px')
                if (dato.file){
                    img.setAttribute('src', dato.file)
                }
                else{
                    let sinfoto="img/sinfoto.jpg"
                    img.setAttribute('src', sinfoto)
                }
                let parrafo = document.createElement('p')
                this.div.appendChild(parrafo)
                parrafo.textContent = "Descripcion: "+dato.descripcion

                let fecha = document.createElement('p')
                this.div.appendChild(fecha)
                fecha.textContent = "Aparicion: " + dato.fecha

                let url = document.createElement('p')
                this.div.appendChild(url)
                url.textContent = "Link: "
                let enlace = document.createElement('a')
                url.appendChild(enlace)
                enlace.setAttribute('href', dato.url)
                enlace.setAttribute('target', "_blanck")
                enlace.textContent = "Más información"

                let botonVolver = document.createElement('button')
                this.div.appendChild(botonVolver)
                botonVolver.textContent= "Volver"
                botonVolver.onclick = this.volver.bind(this)

    }
    /**
     * Borra los elementos generados en la vista consulta
     */
    borrarIngresos(){
		while (this.div.firstElementChild)
		this.div.firstElementChild.remove()
	}
    /**
     * Vuelve a la vista inicio
     */
    volver(){
        this.controlador.pulsarVolver();
    }
}