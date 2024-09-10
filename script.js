

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

function solicitarAtendimento() {

    window.location.href = "atendimento.html";
    
}


function login(event) {
    event.preventDefault();
    // Aqui você pode validar as credenciais, se necessário
    window.location.href = "home.html";
    
}

function esqueceuSenha() {
    alert("Por favor, entre em contato com o suporte para recuperar sua senha.");
}

function cadastrar(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de cadastro
    //Adicione a tela de pós cadastro aqui
    window.location.href = "finalizacao.html";

    function selectProfile(profile) {
        if (profile === 'prestador') {
            window.location.href = 'cadastro_prestador';
        } else if (profile === 'usuario') {
            window.location.href = 'cadastro_usuario.html';
        }
    }
    // Função para gerar o PDF (você pode expandir essa funcionalidade com a biblioteca jsPDF)
function gerarPDF() {
    alert('Função de gerar PDF será implementada.');
}

// Função para concluir o atendimento
function concluirAtendimento() {
    document.getElementById('solicitacaoForm').style.display = 'none';
    document.getElementById('successScreen').style.display = 'block'
    
    window.location.href = 'dados_atendimento.html'
    alert('Seu atendimento foi solicitado');
}

// Função para voltar ao início (resetar o formulário)
function voltarInicio() {
    document.getElementById('solicitacaoForm').reset();
    document.getElementById('solicitacaoForm').style.display = 'block';
    document.getElementById('successScreen').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate-pdf').addEventListener('click', function () {
        const doc = new jsPDF();

        const nome = document.getElementById('nome').textContent;
        const data = document.getElementById('data').textContent;
        const hora = document.getElementById('hora').textContent;
        const tipo = document.getElementById('tipo').textContent;
        const medico = document.getElementById('medico').textContent;

      
    });
});
}