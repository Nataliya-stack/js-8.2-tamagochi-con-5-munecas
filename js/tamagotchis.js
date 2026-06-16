const IMAGENES = './img/';
const tamagotchis = [
    new Tamagotchi (
        "Pico",
        "Patoso es un patito al que le encanta comer y jugar, pero odia que lo obliguen a dormir.",
        "pico_play.jpg", 
        [  
            new Accion('duchar', 'pico_duchar.jpg'),
            new Accion('jugar', 'pico_jugar.jpg'),
            new Accion('alimentar', 'pico_comer.jpg'),
            new Accion('dormir', 'pico_dormir.jpg'),
            new Accion('reprender', 'pico_llorar.jpg'),
            new Accion('acariciar', 'pico_acariciar.jpg'),
            new Accion('muere', 'pico_morir.jpg')            
        ]),    

    new Tamagotchi ( 
        "Minnie", 
        "Minnie es el hermana de Pico. Le gusta dormir, ducharse y pasar el día entero en pijama.",
        "minnie_play.jpg", 
        [
            new Accion('duchar', 'minnie_duchar.jpg'),
            new Accion('jugar', 'minnie_jugar.jpg'),
            new Accion('alimentar', 'minnie_comer.jpg'),
            new Accion('dormir', 'minnie_dormir.jpg'),
            new Accion('reprender', 'minnie_llorar.jpg'),
            new Accion('acariciar', 'minnie_acariciar.jpg'),
            new Accion('muere', 'minnie_morir.jpg')  
        ]),  

    new Tamagotchi ( 
        "Barni", 
        "Barni le encanta que lo alimenten y mimen mucho, pero estas cansado muy rapido.",
        "como_play.jpg", 
        [
            new Accion('duchar', 'como_duchar.jpg'),
            new Accion('jugar', 'como_jugar.jpg'),
            new Accion('alimentar', 'como_comer.jpg'),
            new Accion('dormir', 'como_dormir.jpg'),
            new Accion('reprender', 'como_llorar.jpg'),
            new Accion('acariciar', 'como_acariciar.jpg'),
            new Accion('muere', 'como_morir.jpg')  
        ]),  
        
    new Tamagotchi ( 
        "Jumy", 
        "Jumy — un bichito muy limpio y activo. Adora ducharse y saltar sin parar todo el dia.",
        "jumy_play.jpg", 
        [
            new Accion('duchar', 'jumy_duchar.jpg'),
            new Accion('jugar', 'jumy_jugar.jpg'),
            new Accion('alimentar', 'jumy_comer.jpg'),
            new Accion('dormir', 'jumy_dormir.jpg'),
            new Accion('reprender', 'jumy_llorar.jpg'),
            new Accion('acariciar', 'jumy_acariciar.jpg'),
            new Accion('muere', 'jumy_morir.jpg')  
        ]),  

    new Tamagotchi ( 
        "Sinto",
        "Sinto es un gran dormilón y muy educado, ademas es amable",
        "sinto_play.jpg", 
        [
            new Accion('duchar', 'sinto_duchar.jpg'),
            new Accion('jugar', 'sinto_jugar.jpg'),
            new Accion('alimentar', 'sinto_comer.jpg'),
            new Accion('dormir', 'sinto_dormir.jpg'),
            new Accion('reprender', 'sinto_llorar.jpg'),
            new Accion('acariciar', 'sinto_acariciar.jpg'),
            new Accion('muere', 'sinto_morir.jpg')  
        ]),  
];
    