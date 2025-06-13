
// --- Lógica da Tela de Splash ---
const splashScreen = document.getElementById('splash-screen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const certaintyMessage = document.getElementById('certaintyMessage');
const mainContent = document.getElementById('main-content');
const backgroundMusic = document.getElementById('background-music');

// Inicialmente mostra a tela "Quer namorar comigo?" e oculta o cartão principal
splashScreen.style.display = 'flex';
mainContent.style.display = 'none';

// Lógica para o botão "Não"
noBtn.addEventListener('click', () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const padding = 40; // Aumento do padding para garantir que o botão não saia da tela

    // Calcula novas posições aleatórias para o botão
    const randomTop = Math.random() * (viewportHeight - buttonHeight - (padding * 2)) + padding;
    const randomLeft = Math.random() * (viewportWidth - buttonWidth - (padding * 2)) + padding;

    noBtn.style.position = 'absolute';
    noBtn.style.top = `${randomTop}px`;
    noBtn.style.left = `${randomLeft}px`;
    noBtn.style.right = 'auto';
    noBtn.style.bottom = 'auto';

    // Mostra a mensagem "Tem certeza...?" e alterna o texto
    certaintyMessage.classList.remove('hidden');
    const messages = ["Certeza? 😕", "Tem certeza, mesmo? 🥺", "Não faz isso, princesa 😕", "Pensa com carinho... 💖", "Você não vai fugir de mim 😼", "Por favorzinho... 🥺"];
    certaintyMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
});

// Lógica para o botão "Sim"
yesBtn.addEventListener('click', () => {
    splashScreen.style.display = 'none'; // Oculta a tela de splash
    mainContent.style.display = 'flex';  // Mostra o cartão principal
    createStaticHearts(50); // Cria 50 corações estáticos ao entrar no cartão principal

    // Toca a música de fundo assim que o cartão é revelado
    if (backgroundMusic.paused && backgroundMusic.src) {
        backgroundMusic.play().catch(e => console.log("Erro ao tocar música:", e));
    }
});

// --- Lógica do Cartão Principal ---

// Carrossel de Fotos
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
const totalItems = carouselItems.length;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}
updateCarousel(); // Atualiza o carrossel na inicialização

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

// Funcionalidade de deslize para o carrossel (para celular)
let touchStartX = 0;
let touchEndX = 0;

carouselTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});

function handleGesture() {
    if (touchEndX < touchStartX - 50) { // Deslizou para a esquerda
        currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    }
    if (touchEndX > touchStartX + 50) { // Deslizou para a direita
        currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    }
    updateCarousel();
}

// Corações Estáticos "Infestando" o Conteúdo do Cartão (agora emojis)
function createStaticHearts(numHearts) {
    const contentWrapper = document.querySelector('.content-wrapper');
    // Remove corações existentes antes de criar novos
    contentWrapper.querySelectorAll('.static-heart-emoji').forEach(h => h.remove());

    const sizes = ['size-small', 'size-medium', 'size-large'];
    // Rotações aleatórias para os emojis
    const rotations = ['rotate-1', 'rotate-2', 'rotate-3', 'rotate-4', 'rotate-5', 'rotate-6', 'rotate-7', 'rotate-8', 'rotate-9', 'rotate-10', 'rotate-11', 'rotate-12'];

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('span'); // Agora um span para o emoji
        heart.classList.add('static-heart-emoji');
        heart.textContent = '🩷'; // O emoji de coração rosa

        // Posição percentual dentro do content-wrapper
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.left = `${Math.random() * 100}%`;

        // Adiciona classes aleatórias para tamanho e rotação
        heart.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
        heart.classList.add(rotations[Math.floor(Math.random() * rotations.length)]);

        heart.style.opacity = `${Math.random() * 0.4 + 0.3}`; // Opacidade semi-transparente
        contentWrapper.appendChild(heart); // Adiciona ao content-wrapper
    }
}
// Bolhas de amor flutuantes continuam como antes
const loveMessages = ["Te amo", "Fofa", "💖", "Amo você", "Minha gatinha!", "Você é linda!"];

function createLoveBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('love-bubble');
    const size = Math.random() * 50 + 40;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 90}vw`;
    bubble.style.animationDuration = `${Math.random() * 6 + 8}s`;
    bubble.style.animationDelay = `${Math.random() * 4}s`;
    bubble.style.bottom = `-80px`;

    const messageSpan = document.createElement('span');
    messageSpan.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    bubble.appendChild(messageSpan);

    document.body.appendChild(bubble);

    bubble.addEventListener('click', () => {
        bubble.remove();

        const popMessage = document.createElement('div');
        popMessage.classList.add('pop-message');
        popMessage.textContent = messageSpan.textContent;
        popMessage.style.left = `${bubble.offsetLeft + bubble.offsetWidth / 2}px`;
        popMessage.style.top = `${bubble.offsetTop - 30}px`;
        document.body.appendChild(popMessage);

        popMessage.addEventListener('animationend', () => {
            popMessage.remove();
        });
    });

    bubble.addEventListener('animationend', () => {
        bubble.remove();
    });
}
setInterval(createLoveBubble, 1000); // Gera uma bolha a cada 1 segundo

// --- Lógica do Contador em tempo real ---
const daysSinceCounter = document.getElementById('daysSinceCounter');
const startDate = new Date('2024-07-29T00:00:00'); // Data da nossa primeira conversa

function updateCounter() {
    const currentDate = new Date();
    const diff = currentDate.getTime() - startDate.getTime(); // Diferença em milissegundos

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Formata os números para terem zeros à esquerda
    const s = String(seconds).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const h = String(hours).padStart(2, '0');

    daysSinceCounter.innerHTML = `
                <span class="counter-phrase">Desde nossa primeira conversa:</span><br>
                <span class="counter-time">${days} dias, ${h} horas, ${m} minutos e ${s} segundos</span>
            `;
}

// Atualiza o contador imediatamente e depois a cada segundo
updateCounter();
setInterval(updateCounter, 1000);

// --- Lógica do Medidor do Amor (Atualizado para Preenchimento do Coração e Decaimento) ---
const loveMeterContainer = document.getElementById('loveMeterContainer');
const loveHeartSVG = document.getElementById('loveHeartSVG');
const heartMaskRect = document.getElementById('heartMaskRect'); // O retângulo dentro da máscara SVG
const lovePercentageText = document.getElementById('lovePercentageText'); // Elemento para texto de porcentagem
const loveMeterMessage = document.getElementById('loveMeterMessage');
const loveMeterFullModal = document.getElementById('loveMeterFullModal');
const closeLoveMeterFullModalBtn = document.getElementById('closeLoveMeterFullModalBtn');

let loveLevel = 0;
function clickIncrement() {
    min = Math.ceil(1);
    max = Math.floor(5);
    return Math.floor(Math.random() * (max - min + 1) + min);
} // Quanto o medidor de amor aumenta por clique (diminuído)
const svgViewBoxHeight = 24; // Corresponde à altura do viewBox do SVG

let fallTimer; // Timer para iniciar o decaimento após inatividade
let fallIntervalId; // Intervalo para o decaimento contínuo
const fallDelay = 180; // Tempo em ms para iniciar o decaimento após o último clique (3 segundos)
const fallSpeed = 130; // Intervalo em ms para cada decremento de 1% (cai a cada 200ms)

/**
 * Exibe uma mensagem temporária acima do medidor de amor.
 * @param {string} message - A mensagem a ser exibida.
 */
function showLoveMessage(message) {
    loveMeterMessage.textContent = message;
    loveMeterMessage.classList.add('show');
    clearTimeout(loveMeterMessage.timeout);
    loveMeterMessage.timeout = setTimeout(() => {
        loveMeterMessage.classList.remove('show');
    }, 1500); // A mensagem desaparece após 1.5 segundos
}

/**
 * Atualiza o estado visual do medidor de amor (coração).
 */
function updateLoveMeter() {
    // Garante que loveLevel esteja entre 0 e 100
    loveLevel = Math.max(0, Math.min(100, loveLevel));

    // Calcula a altura do retângulo da máscara com base no loveLevel
    // A máscara preenche de baixo para cima, então 'y' diminui conforme 'height' aumenta.
    const newRectHeight = (loveLevel / 100) * svgViewBoxHeight;
    const newRectY = svgViewBoxHeight - newRectHeight;

    heartMaskRect.setAttribute('height', newRectHeight);
    heartMaskRect.setAttribute('y', newRectY);

    lovePercentageText.textContent = `${loveLevel}%`; // Atualiza o texto da porcentagem

    // O estilo do texto da porcentagem já está definido no CSS para ficar acima do coração
    // e ter contraste com o fundo do loveMeterContainer.

    if (loveLevel >= 100) {
        lovePercentageText.textContent = `100%`; // Garante que exiba 100%
        showLoveMeterFullReward();
        // Desabilita interação adicional
        loveMeterContainer.style.pointerEvents = 'none';
        clearInterval(fallIntervalId); // Para o decaimento se estiver cheio
    } else if (loveLevel <= 0) {
        lovePercentageText.textContent = `0%`; // Garante que exiba 0%
        clearInterval(fallIntervalId); // Para o decaimento se chegar a zero
    }
}

/**
 * Aumenta o nível do medidor de amor no clique.
 */
function increaseLoveMeterOnClick() {
    // Limpa qualquer timer ou intervalo de decaimento ao clicar
    clearTimeout(fallTimer);
    clearInterval(fallIntervalId);

    if (loveLevel < 100) {
        loveLevel += clickIncrement();
        // Garante que o nível de amor não exceda 100
        if (loveLevel > 100) {
            loveLevel = 100;
        }
        updateLoveMeter();
        // Opcional: exibe uma pequena mensagem positiva ao clicar
        if (loveLevel < 100) {
        }
    }

    // Reinicia o timer de decaimento após o clique
    fallTimer = setTimeout(startFalling, fallDelay);
}

/**
 * Diminui o nível do medidor de amor.
 */
function decreaseLoveMeter() {
    if (loveLevel > 0) {
        loveLevel -= 1; // Cai 1% por vez
        updateLoveMeter();
    } else {
        clearInterval(fallIntervalId); // Para o decaimento se chegar a zero
    }
}

/**
 * Inicia o processo de decaimento do medidor.
 */
function startFalling() {
    if (loveLevel > 0) { // Só começa a cair se não estiver zerado
        fallIntervalId = setInterval(decreaseLoveMeter, fallSpeed);
    }
}

/**
 * Mostra o modal quando o medidor de amor está cheio.
 */
function showLoveMeterFullReward() {
    loveMeterFullModal.classList.add('show');
    createConfetti(); // Cria confetes
    if (!backgroundMusic.paused) {
        backgroundMusic.pause(); // Pausa a música para o modal
    }
}

/**
 * Cria e anima partículas de confete.
 */
function createConfetti() {
    const colors = ['#ff69b4', '#ffc0cb', '#f8f8f8', '#ffd1dc']; // Rosa, rosa claro, branco, rosa mais claro
    for (let i = 0; i < 50; i++) { // Gera 50 partículas de confete
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * -50}px`; // Começa acima da tela
        confetti.style.width = `${Math.random() * 8 + 4}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = '50%'; // Torna-os redondos
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`; // 2-4 segundos
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        document.body.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// Event listener para cliques no contêiner do medidor de amor
loveMeterContainer.addEventListener('click', increaseLoveMeterOnClick);

// Event listener para fechar o modal do medidor de amor cheio
closeLoveMeterFullModalBtn.addEventListener('click', () => {
    loveMeterFullModal.classList.remove('show');
    if (backgroundMusic.paused && backgroundMusic.currentTime > 0) {
        backgroundMusic.play(); // Retoma a música
    }
    // Reinicia o medidor de amor após fechar o modal para que possa ser jogado novamente
    loveLevel = 0;
    updateLoveMeter();
    loveMeterContainer.style.pointerEvents = 'auto'; // Reabilita a interação
    // Garante que o decaimento comece novamente após o reset
    fallTimer = setTimeout(startFalling, fallDelay);
});

// Chamada inicial para definir o estado do medidor e iniciar o decaimento
updateLoveMeter();
fallTimer = setTimeout(startFalling, fallDelay); // Inicia o decaimento automaticamente após o carregamento
