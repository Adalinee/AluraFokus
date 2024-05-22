const html = document.querySelector('html');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const btn = document.querySelectorAll('.app__card-button');
const audio = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const btnTiempo = document.querySelector('#start-pause');
const textIniciarPau = document.querySelector('#start-pause span')
const foto = document.querySelector('.app__card-primary-button')
const TiempoPantalla = document.querySelector('#timer')

const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioFinal = new Audio('./sonidos/beep.mp3');


let tiempoo = 1500
let idIntervalo = null

musica.loop = true
audio.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoo = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
});

botonCorto.addEventListener('click', () => {
    tiempoo = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')

});

botonLargo.addEventListener('click', () => {
    tiempoo = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')

});

function cambiarContexto(contexto){
    mostrarTiempo()
    btn.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png` )

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? 
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie 
            <strong class="app__title-strong"> Haz una pausa larga.</strong>`

    }


}

const cuentaRegresiva = () => {
    if(tiempoo <= 0){
        audioFinal .play() 
        alert('Tiempo finalizado')
        reiniciar()
        return
    }
    textIniciarPau.textContent = "Pausar"
    foto.setAttribute('src', `/imagenes/pause.png`)
    tiempoo -= 1
    mostrarTiempo()
}

btnTiempo.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if(idIntervalo){
        audioPausa.play()
        reiniciar()
        return
    }
    audioPlay.play()
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    textIniciarPau.textContent = "Comenzar"
    clearInterval(idIntervalo)
    idIntervalo = null
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoo * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second: '2-digit'})
    TiempoPantalla.innerHTML = `${tiempoFormateado}`
}
mostrarTiempo()



