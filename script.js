// EU ODEIO JAVASCRIPT, SO NÃO MAIS QUE PHP! (henzon)
// Função para alternar tema claro/escuro
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    if (body.classList.contains("light-theme")) {
        body.classList.replace("light-theme", "dark-theme");
        themeToggle.textContent = "☀️ Mudar Tema";
    } else {
        body.classList.replace("dark-theme", "light-theme");
        themeToggle.textContent = "🌙 Mudar Tema";
    }
}

// Função para redirecionar para a página de atendimento
function solicitarAtendimento() {
    window.location.href = "atendimento.html";
}

// Função de login
function login(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    localStorage.setItem('nomeUsuario', nome);
    window.location.href = "home.html";
}

// Função para lidar com esquecimento de senha
function esqueceuSenha() {
    alert("Por favor, entre em contato com o suporte para recuperar sua senha.");
}

// Função para cadastro
function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const fotoInput = document.getElementById('fotoInput'); // Supondo que a foto seja um input do tipo file
    const reader = new FileReader();

    reader.onload = function (e) {
        const fotoBase64 = e.target.result;
        localStorage.setItem('fotoPerfil', fotoBase64);
        localStorage.setItem('nomeUsuario', nome);

        window.location.href = "finalizacao.html";
    };

    if (fotoInput.files.length > 0) {
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        localStorage.setItem('nomeUsuario', nome);
        window.location.href = "finalizacao.html";
    }
}

// Função para gerar PDF
function gerarPDF() {
    alert('Função de gerar PDF será implementada.');
}

// Função para concluir o atendimento
function concluirAtendimento() {
    document.getElementById('solicitacaoForm').style.display = 'none';
    document.getElementById('successScreen').style.display = 'block';
    window.location.href = 'confirmacao.html';
    alert('Seu atendimento foi solicitado');
}

// Função para resetar o formulário de atendimento
function voltarInicio() {
    document.getElementById('solicitacaoForm').reset();
    document.getElementById('solicitacaoForm').style.display = 'block';
    document.getElementById('successScreen').style.display = 'none';
}

// Submissão do formulário de atendimento
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('solicitacaoForm');
    
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const endereco = document.getElementById('endereco').value;
            const descricao = document.getElementById('descricao').value;
            const opcaoAtendimento = document.getElementById('opcao-atendimento').value;
            const data = document.getElementById('data').value;
            const horario = document.getElementById('horario').value;
            const profissional = document.getElementById('profissional').value;

            if (!nome || !endereco || !descricao || !opcaoAtendimento || !data || !horario || !profissional) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const appointmentDetails = {
                nome,
                endereco,
                descricao,
                opcaoAtendimento,
                data,
                horario,
                profissional
            };
            localStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));

            // Redireciona para a página de confirmação
            window.location.href = 'confirmacao.html';
        });

        document.getElementById('generate-pdf').addEventListener('click', gerarPDF);
    }

    // Função para carregar os dados na página de confirmação
    if (document.querySelector('.confirmation-container')) {
        const appointmentDetails = JSON.parse(localStorage.getItem('appointmentDetails'));

        if (appointmentDetails) {
            document.getElementById('doctor-name').textContent = appointmentDetails.nome;
            document.getElementById('address').textContent = appointmentDetails.endereco;
            document.getElementById('description').textContent = appointmentDetails.descricao;

            // Para obter o texto correspondente à opção de atendimento
            const opcaoAtendimentoText = {
                'opcao1': 'Consulta de Rotina',
                'opcao2': 'Emergência',
                'opcao3': 'Vacinação',
                'opcao4': 'Exames',
                'opcao5': 'Fisioterapia',
                'opcao6': 'Atendimento Domiciliar',
                'opcao7': 'Acompanhamento Nutricional',
                'opcao8': 'Saúde Mental',
                'opcao9': 'Outros'
            };
            document.getElementById('opcao-atendimento').textContent = opcaoAtendimentoText[appointmentDetails.opcaoAtendimento] || 'Não disponível';

            // Para obter o texto correspondente ao profissional
            const profissionalText = {
                'prof1': 'Dr. Ana Silva - Cardiologista',
                'prof2': 'Dr. Pedro Oliveira - Pediatra',
                'prof3': 'Dra. Maria Souza - Dermatologista',
                'prof4': 'Dr. João Santos - Ortopedista',
                'prof5': 'Dra. Clara Pereira - Nutricionista',
                'prof6': 'Dr. Luís Costa - Psicólogo',
                'prof7': 'Dra. Fernanda Lima - Ginecologista',
                'prof8': 'Dr. Marcos Mendes - Urologista',
                'prof9': 'Dra. Larissa Ferreira - Endocrinologista',
                'prof10': 'Dr. Eduardo Ramos - Neurologista',
                'prof11': 'Dra. Juliana Carvalho - Fisioterapeuta',
                'prof12': 'Dr. Ricardo Almeida - Otorrinolaringologista',
                'prof13': 'Dra. Paula Martins - Oncologista',
                'prof14': 'Dr. Felipe Gomes - Reumatologista',
                'prof15': 'Dra. Camila Fernandes - Psiquiatra'
            };
            document.getElementById('professional').textContent = profissionalText[appointmentDetails.profissional] || 'Não disponível';

            document.getElementById('appointment-date').textContent = appointmentDetails.data;
            document.getElementById('appointment-time').textContent = appointmentDetails.horario;
        } else {
            alert("Detalhes da consulta não disponíveis.");
        }
    }

    // Carregar nome de usuário e foto de perfil na página home
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const fotoPerfil = localStorage.getItem('fotoPerfil');

    if (nomeUsuario) {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Olá, ${nomeUsuario}!`;
        }
    }

    if (fotoPerfil) {
        const fotoPerfilElement = document.getElementById('fotoPerfil');
        if (fotoPerfilElement) {
            fotoPerfilElement.src = fotoPerfil;
        }
    }
});

// Função para redirecionar para a página inicial
function goHome() {
    try {
        window.location.href = 'index.html';
    } catch (e) {
        console.error('Erro ao redirecionar:', e);
    }
}

// Funções de notificação, configurações e tela de carregamento
document.addEventListener('DOMContentLoaded', function () {
    const delay = 4000;
    const loadingScreen = document.getElementById('loading-screen');
    const container = document.querySelector('.container');

    if (loadingScreen && container) {
        setTimeout(function () {
            loadingScreen.style.display = 'none';
            container.style.display = 'block';
        }, delay);
    }

    const verAvaliacoes = document.getElementById('ver-avaliacoes');
    if (verAvaliacoes) {
        verAvaliacoes.addEventListener('click', function () {
            alert("Exibindo todas as avaliações. Funcionalidade a ser implementada.");
            setTimeout(function () {
                window.location.href = "avaliacoes.html";
            }, delay);
        });
    }

    const notificacoes = document.getElementById('notificacoes');
    if (notificacoes) {
        notificacoes.addEventListener('click', function () {
            alert("Você não possui novas notificações.");
        });
    }

    const configuracoes = document.getElementById('configuracoes');
    if (configuracoes) {
        configuracoes.addEventListener('click', function () {
            alert("Abrindo tela de configurações. Funcionalidade a ser implementada.");
            setTimeout(function () {
                window.location.href = "configuracoes.html";
            }, delay);
        });
    }

    
});

// Função para carregar a foto e o nome do localStorage
document.addEventListener('DOMContentLoaded', function() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const fotoUsuario = localStorage.getItem('fotoPerfil');
    
    // Se o nome do usuário existir no localStorage, substitui o texto padrão
    if (nomeUsuario) {
        document.getElementById('user-name').textContent = `OLÁ, ${nomeUsuario.toUpperCase()}!`;
        document.getElementById('nome').value = nomeUsuario; // Preenche o campo "Nome"
    }
    
    // Se a foto do usuário existir no localStorage, altera a foto de perfil
    if (fotoUsuario) {
        document.getElementById('profile-pic').src = fotoUsuario;
    }
});
