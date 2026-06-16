const avatarImg = document.getElementById('pet-avatar');
const nameEl = document.getElementById('pet-name');
const descEl = document.getElementById('pet-description');
const container = document.getElementById('stats-container');
const btnChangePet = document.getElementById('btn-change-pet');

const mainSelectOperacion = document.getElementById('main-select-operation');
const btnGo = document.getElementById('btn-go');

const selectionContainer = document.getElementById('selection-container');
const actionsPanel = document.getElementById('actions-panel');

const btnDuchar = document.getElementById('btn-duchar');
const btnAlimentar = document.getElementById('btn-alimentar');
const btnJugar = document.getElementById('btn-jugar');
const btnDormir = document.getElementById('btn-dormir');
const btnReprender = document.getElementById('btn-reprender');
const btnAcariciar = document.getElementById('btn-acariciar');

const handleDuchar = () => { game.ejecutarAccion('duchar'); };
const handleAlimentar = () => { game.ejecutarAccion('alimentar'); };
const handleJugar = () => { game.ejecutarAccion('jugar'); };
const handleDormir = () => { game.ejecutarAccion('dormir'); };
const handleReprender = () => { game.ejecutarAccion('reprender'); };
const handleAcariciar = () => { game.ejecutarAccion('acariciar'); };

let cicloVidaInterval = null;
const NEUTRAL_AVATAR = "./img/start.jpg"; 

const stats = [
    { label: 'SALUD', getter: 'getSalud' },
    { label: 'FELICIDAD', getter: 'getFelicidad' },
    { label: 'LIMPIEZA', getter: 'getLimpieza' },
    { label: 'ENERGIA', getter: 'getEnergia' }
];         

const game = {
    active: null,

    llenarSelector: () => {
        if (!mainSelectOperacion) return;
        mainSelectOperacion.innerHTML = '<option value="" class="bg-slate-900 text-slate-400 font-semibold">--- Elige personaje ---</option>';
        tamagotchis.forEach((t, index) => {
            mainSelectOperacion.innerHTML += `
                <option value="${index}" class="bg-slate-900 text-slate-100 font-black">
                    ${t.nombre}
                </option>`;
        });
    },

    iniciarCiclo: () => {
        clearInterval(cicloVidaInterval); 
        
        cicloVidaInterval = setInterval(() => {
            if (game.active && game.active.getEnVida()) {
                game.active.restarVida();
                game.render();
                if (!game.active.getEnVida()) {
                    game.detenerJuego();
                }
            }
        }, 5000);
    },

    seleccionarMascota: () => {
        if (!mainSelectOperacion || mainSelectOperacion.value === "") return;

        const idx = parseInt(mainSelectOperacion.value, 10);
        
        if (tamagotchis[idx]) {
            game.active = tamagotchis[idx];
            game.active.iniciar(); 
            game.agregarEscuchadores(); 
            game.iniciarCiclo();
            game.render();
        }
    },

    regresarAlMenu: () => {
        clearInterval(cicloVidaInterval); //таймер останавливает
        game.removerEscuchadores(); //отвязывает функции от игровых кнопок (кормить, играть), чтобы они перестали реагировать на клики.
        
        if (mainSelectOperacion) { //сбрасывает выпадающий список выбора персонажей на дефолтную строчку «--- Elige personaje ---». (Здесь проверка if уже написана правильно!)
            mainSelectOperacion.value = ""; 
        }

        game.active = null; //игра «забывает» текущего питомца, очищая ячейку памяти. 
        
        //ПРЯЧЕМ ДОЖДЬ ТУТ (До вызова render!):
        const contenedorLluvia = document.getElementById('rain-effect');
        if (contenedorLluvia) {
            contenedorLluvia.classList.add('hidden');
        }
        game.render(); 
    },

    ejecutarAccion: (nombreMetodo) => {
        if (!game.active || !game.active.getEnVida()) return; //предохранитель. Если питомец не выбран или уже мёртв, клик просто игнорируется.
        game.active[nombreMetodo](); //динамический вызов. Вместо nombreMetodo подставляется строка действия (например, 'alimentar'), и у тамагочи запускается соответствующий метод из класса.
        game.render(); // экран сразу перерисовывается, чтобы игрок мгновенно увидел новые солнышки-характеристики и новую аватарку питомца.

        if (!game.active.getEnVida()) { //проверка на внезапную смерть. Если после этого действия (например, после активной игры) какой-то показатель упал до 0, питомец умирает, и игра останавливается через метод detenerJuego().
            game.detenerJuego();
        }
    },

    render: () => {    
        // СЦЕНАРИЙ 1: Главный экран (Питомец НЕ выбран)
        if (game.active === null) {
            if (avatarImg) avatarImg.src = NEUTRAL_AVATAR; 
            if (nameEl) nameEl.innerText = "¡Quieres jugar!";             
            
            if (descEl) {
              descEl.classList.add('hidden'); // Прячет текстовое описание
              descEl.classList.remove('block');
              descEl.innerText = ""; //это «чистка памяти». Автор полностью стирает текст внутри тега, чтобы старое описание (например, Пико) случайно не мелькнуло на долю секунды, когда вы в следующий раз выберете Минни.
            }

            if (container) {
            container.classList.add('hidden'); // Прячет блок со шкалами (солнышками)
            container.classList.remove('block', 'py-0.5');
            }
            
            if (btnChangePet) btnChangePet.classList.add('hidden'); // Прячет кнопку "Сменить питомца"
            if (actionsPanel) actionsPanel.classList.add('hidden'); // Прячет панель с кнопками действий
            
            if (selectionContainer) selectionContainer.classList.remove('hidden'); // Показывает выпадающий список выбора
            return; 
        }

        // СЦЕНАРИЙ 2: Игровой процесс (Питомец выбран)
        if (selectionContainer) selectionContainer.classList.add('hidden'); // Прячет меню выбора
        
        if (container) {
           container.classList.remove('hidden'); // Показывает блок характеристик
           container.classList.add('block', 'py-0.5'); // Перечисляем через запятую внутри одного add()
        }

        if (btnChangePet) btnChangePet.classList.remove('hidden'); // Показывает кнопку смены питомца
        if (actionsPanel) actionsPanel.classList.remove('hidden'); // Показывает кнопки (Кормить, Играть и т.д.)

        if (descEl) {
          descEl.classList.remove('hidden');// Показывает блок описания
          descEl.classList.add('block');
               
        const fullDescText = game.active.descripcion;
        const descFirstLetter = fullDescText.charAt(0);
        const descRestOfText = fullDescText.slice(1);
        
        // Оборачивает первую букву в span со специальным шрифтом и эффектом свечения
        descEl.innerHTML = `
            <span style="font-family: 'Fontdiner Swanky', serif;" class="text-4xl font-normal text-cyan-400 inline-block w-7 text-center leading-none align-middle mr-1.5 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                ${descFirstLetter} </span>
            <span class="align-middle">${descRestOfText}</span>
        `;
        }

        if (avatarImg) avatarImg.src = game.active.imagen; // Берет текущую картинку утенка (например, если он ест — будет картинка еды)           
        if (nameEl) nameEl.innerText = game.active.nombre; // Выводит имя питомца (Pico или Minnie)

        if (container) {
        container.innerHTML = stats.map(s => `
            <div class="flex justify-between items-center text-sm sm:text-base font-bold uppercase tracking-wider my-1.5 sm:my-0.5 text-slate-200 w-full">
                <span class="text-sky-400">${s.label}:</span>
                <span class="text-amber-400 text-bsm sm:text-xl tracking-normal md:tracking-widest whitespace-nowrap">
                    ${"☀️".repeat(game.active[s.getter]())}
                </span>
            </div>
        `).join('');  
        }  

        // УПРАВЛЕНИЕ ДОЖДЕМ
        const contenedorLluvia = document.getElementById('rain-effect');
        if (contenedorLluvia) {
            // Дождь включается СТРОГО если питомец выбран И он мертв
            if (game.active && !game.active.getEnVida()) {
                contenedorLluvia.classList.remove('hidden');
            } else {
                // Во всех остальных случаях (питомец жив ИЛИ мы вернулись в меню) — дождь выключается!
                contenedorLluvia.classList.add('hidden');
            }
        }
    },
    
    detenerJuego: () => {
        clearInterval(cicloVidaInterval); //остановить таймер
        game.removerEscuchadores(); //отключить слушателей
        game.render(); //перерисовать экран на умершего тамагочи
        if (actionsPanel) actionsPanel.classList.add('hidden'); // спрятать панель с кнопками
        
        if (descEl) {
        descEl.innerText = `¡${game.active.nombre} ha muerto!`;
        }
    },

    agregarEscuchadores: () => {
        if(btnDuchar) btnDuchar.addEventListener('click', handleDuchar);
        if(btnAlimentar) btnAlimentar.addEventListener('click', handleAlimentar);
        if(btnJugar) btnJugar.addEventListener('click', handleJugar);
        if(btnDormir) btnDormir.addEventListener('click', handleDormir);
        if(btnReprender) btnReprender.addEventListener('click', handleReprender);
        if(btnAcariciar) btnAcariciar.addEventListener('click', handleAcariciar);
    },

    removerEscuchadores: () => {
        if(btnDuchar) btnDuchar.removeEventListener('click', handleDuchar);
        if(btnAlimentar) btnAlimentar.removeEventListener('click', handleAlimentar);
        if(btnJugar) btnJugar.removeEventListener('click', handleJugar);
        if(btnDormir) btnDormir.removeEventListener('click', handleDormir);
        if(btnReprender) btnReprender.removeEventListener('click', handleReprender);
        if(btnAcariciar) btnAcariciar.removeEventListener('click', handleAcariciar);
    }
};

if(btnGo) btnGo.addEventListener('click', () => game.seleccionarMascota());
if(btnChangePet) btnChangePet.addEventListener('click', () => game.regresarAlMenu());

game.llenarSelector();
game.render();
