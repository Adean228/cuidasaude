// Função para visualizar a foto antes de enviar o formulário
function previewFoto(event) {
    const fotoInput = event.target;
    const fotoPreview = document.getElementById('foto-preview');
    
    // Limpa a visualização atual
    fotoPreview.innerHTML = '';

    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Cria uma nova imagem e define a fonte como o resultado da leitura do arquivo
            const img = document.createElement('img');
            img.src = e.target.result;
            fotoPreview.appendChild(img);
        };

        reader.readAsDataURL(fotoInput.files[0]);
    }
}

// Função para cadastrar o prestador
function cadastrar(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const especialidade = document.getElementById('especialidade').value;
    const foto = document.getElementById('foto').files[0];
    
    // Valida o formulário (exemplo básico)
    if (!nome || !email || !senha || !especialidade) {
        alert('Por favor, preencha todos os campos.');
        return false;
    }

    // Aqui você pode adicionar a lógica para enviar os dados ao servidor
    // Para fins de demonstração, salvaremos no localStorage
    localStorage.setItem('nomePrestador', nome);
    localStorage.setItem('emailPrestador', email);
    localStorage.setItem('especialidadePrestador', especialidade);

    // Salvando a foto como uma URL base64 (para fins de demonstração)
    if (foto) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('fotoPrestador', e.target.result);
            // Redireciona para a página de serviços do prestador após salvar a foto
            window.location.href = 'prestadordeserviços.html';
        };
        reader.readAsDataURL(foto);
    } else {
        // Se não houver foto, redireciona para a página de serviços do prestador diretamente
        window.location.href = 'prestadordeserviços.html';
    }
}

// Função para carregar o nome e a foto do prestador na página de serviços
function carregarPrestador() {
    const nomePrestador = localStorage.getItem('nomePrestador');
    const fotoPrestador = localStorage.getItem('fotoPrestador');

    if (nomePrestador) {
        document.getElementById('saudacao').textContent = `Olá, Dr(a). ${nomePrestador}`;
    } else {
        document.getElementById('saudacao').textContent = 'Olá, Dr(a). Nome Não Encontrado';
    }

    if (fotoPrestador) {
        document.getElementById('foto-perfil').src = fotoPrestador;
    } else {
        // Se não houver foto, use uma foto padrão
        document.getElementById('foto-perfil').src = 'perfil_prestador.jpg';
    }
}

// Chama a função para carregar o prestador assim que a página for carregada
document.addEventListener('DOMContentLoaded', carregarPrestador);

// Configurar o botão de notificações
document.getElementById('notificacoes').addEventListener('click', function() {
    alert('Você tem 3 novas notificações:\n1. Consulta marcada com Maria Silva\n2. Exame de rotina agendado\n3. Novo feedback recebido');
});

// Configurar o botão de ver avaliações
document.getElementById('ver-avaliacoes').addEventListener('click', function() {
    window.location.href = 'avaliacoes.html';
});
