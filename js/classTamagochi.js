class Tamagotchi {
    nombre; 
    descripcion;
    imagen; 
    arrayImagenes; 
    #felicidad = 0;
    #salud = 0;
    #limpieza = 0;
    #energia = 0;
    #enVida = true;

     constructor(nombre, descripcion, imagen, arrayImagenes) {
        this.nombre = nombre;
        this.descripcion = descripcion; 
        this.arrayImagenes = arrayImagenes;
        this.imagen = IMAGENES + imagen;         
        this.iniciar();
    }

    iniciar() {
        this.#salud = Math.floor(Math.random() * 10) + 1;
        this.#felicidad = Math.floor(Math.random() * 10) + 1;
        this.#limpieza = Math.floor(Math.random() * 10) + 1;
        this.#energia = Math.floor(Math.random() * 10) + 1;         
        this.#enVida = true;
    }

    getFelicidad() { return this.#felicidad; }
    getSalud() { return this.#salud; }
    getLimpieza() { return this.#limpieza; }
    getEnergia() { return this.#energia; }
    getEnVida() { return this.#enVida; }

    cambiaValor(valorActual, incremento) {
        return Math.max(0, Math.min(10, valorActual + incremento));
    }

    cambiarAvatar(accionNombre) {
        if (!this.#enVida) return;
        const encontrada = this.arrayImagenes.find(img => img.accion === accionNombre);
        if (encontrada) {
            this.imagen = IMAGENES + encontrada.imagen; 
        }
    }

    alimentar() {
        if (!this.#enVida) return;
        this.#energia = this.cambiaValor(this.#energia, 3);
        this.#felicidad = this.cambiaValor(this.#felicidad, 2);
        this.#limpieza = this.cambiaValor(this.#limpieza, -1);
        this.cambiarAvatar('alimentar');
        this.comprobarVida();
    }

    duchar() {
        if (!this.#enVida) return;
        this.#salud = this.cambiaValor(this.#salud, 3);
        this.#limpieza = 10; 
        this.cambiarAvatar('duchar');
        this.comprobarVida();
    }

    jugar() {
        if (!this.#enVida) return;
        this.#felicidad = this.cambiaValor(this.#felicidad, 2); 
        this.#energia = this.cambiaValor(this.#energia, -2); 
        this.#limpieza = this.cambiaValor(this.#limpieza, -2); 
        this.cambiarAvatar('jugar');
        this.comprobarVida();
    }

    reprender() {
        if (!this.#enVida) return;
        this.#felicidad = this.cambiaValor(this.#felicidad, -3); 
        this.#salud = this.cambiaValor(this.#salud, -2); 
        this.cambiarAvatar('reprender');
        this.comprobarVida();
    }

    dormir() {
        if (!this.#enVida) return;
        this.#energia = this.cambiaValor(this.#energia, 5);        
        this.#salud = this.cambiaValor(this.#salud, 2); 
        this.cambiarAvatar('dormir');
        this.comprobarVida();
    }

    acariciar() {
        if (!this.#enVida) return;
        this.#felicidad = this.cambiaValor(this.#felicidad, 4); 
        this.cambiarAvatar('acariciar');
        this.comprobarVida();
    }

    comprobarVida() {
        if (this.#salud === 0 || this.#energia === 0 || this.#felicidad === 0 || this.#limpieza === 0) {
            this.#enVida = false;
            const encontradaMuerto = this.arrayImagenes.find(img => img.accion === 'muere' || img.accion === 'morir');
            if (encontradaMuerto) {
                this.imagen = IMAGENES + encontradaMuerto.imagen;
            }
        }
    }

    restarVida() {
        if (!this.#enVida) return;
        this.#salud = this.cambiaValor(this.#salud, -1);
        this.#felicidad = this.cambiaValor(this.#felicidad, -1);
        this.#limpieza = this.cambiaValor(this.#limpieza, -1);
        this.#energia = this.cambiaValor(this.#energia, -1);
        this.comprobarVida();
    }
}

class Accion {
    constructor(accion, imagen) {
        this.accion = accion;
        this.imagen = imagen;    
    }
}