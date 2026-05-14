// Seção about
const about = document.querySelector('#about')

// Seção projects
const swiperWrapper = document.querySelector('.swiper-wrapper')

// Formulário
const formulario = document.querySelector('#formulario')

// regex para validar email
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//section about
async function getAboutGitHub() {
    try {
        const resposta = await fetch(
            'https://api.github.com/users/clarodriguess',
        );
        const perfil = await resposta.json();

        about.innerHTML = '';
        about.innerHTML = `
            <figure class="about-image">
                <img src="${perfil.avatar_url}" 
                alt="${perfil.name}">
            </figure>

            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Desenvolvedora Full Stack | JavaScript • TypeScript • Node.js • NestJS • React • Git • SQL</p>
                <p>Antes de migrar para tecnologia, atuei por cerca de 10 anos com gestão e estruturação de processos. Essa experiência hoje influencia bastante a forma como desenvolvo: penso em organização, clareza de código e soluções que realmente façam sentido no uso real..</p>
                <p>Atualmente curso Análise e Desenvolvimento de Sistemas e participo do bootcamp Full Stack JavaScript da Generation Brasil, aprofundando conhecimentos em desenvolvimento web, arquitetura de aplicações e boas práticas.</p>

                <div class="about-buttons-data">
                    <div class="buttons-container">
                    <a href="https://www.linkedin.com/in/clarissee-rodriguess/" target="_blank" class="botao">Linkedin</a>
                        <a href="${perfil.html_url}"" target="_blank" class="botao">GitHub</a>
                        <a href="https://drive.google.com/file/d/18UjOt9M97NDmEDcsV1ZSkA2JiyxkEPYu/view?usp=sharing" target="_blank" class="botao-outline">Curriculo</a>
                    </div>
                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>
                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositorios</span>
                        </div>
                    </div>
                </div>
            </article>
            `
    } catch (error) {
        console.error('Erro ao buscar dados no GitHub', error);
    }
}

//section projects 
async function getProjectsGitHub() {
    try {
        const resposta = await fetch(
            'https://api.github.com/users/clarodriguess/repos?sort=updated&per_page=6',
        )
        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

        //cores e icon das linguagens
        
        const linguagens = {
          	'JavaScript': 'javascript',
			'TypeScript': 'typescript',
			'Python': 'python',
			'Java': 'java',
			'HTML': 'html',
			'CSS': 'css',
			'PHP': 'php',
			'C#': 'csharp',
			'Go': 'go',
			'Kotlin': 'kotlin',
			'Swift': 'swift',
			'C': 'c',
			'C++': 'c_plus',
			'GitHub': 'github',
        };

       repositorios.forEach((repositorio) => {
			
      // Seleciona o nome da Linguagem padrão do repositório
      const linguagem = repositorio.language || 'GitHub'
			
      // Seleciona o ícone da Linguagem padrão do repositório
      const icone = linguagens[linguagem] ?? linguagens['GitHub']
			
      // Constrói a URL que aponta para o ícone da Linguagem padrão do repositório
      const urlIcone = `./assets/icons/languages/${icone}.svg`

			// Formata o Nome do Repositório
			const nomeFormatado = repositorio.name
				.replace(/[-_]/g, ' ') // Substitui hifens e underlines por espaços em branco
				.replace(/[^a-zA-Z0-9\s]/g, '') // Remove Caracteres especiais
        .replace(/\s+t[a-z0-9]+$/i, '') // Remove a identificação de turma
				.toUpperCase() // Converte a string em letras maiúsculas

			// Função para truncar texto
      // Se a descrição possuir mais de 100 carcateres
      // seleciona os primeiros 97 e acrescenta '...' no final
      // Senão retorna o mesmo texto
			const truncar = (texto, limite) => texto.length > limite
        ? texto.substring(0, limite) + '...'
        : texto

      // Define a descrição do Repositório
      const descricao = repositorio.description
        ? truncar(repositorio.description, 100)
        : 'Projeto desenvolvido no GitHub'

			// tags
      const tags = repositorio.topics?.length > 0
        ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
        : `<span class="tag">${linguagem}</span>`;

      // Cria o Botão Deploy
      const botaoDeploy = repositorio.homepage
        ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
        : ''

      // Botões de ação
      const botoesAcao = `
        <div class="project-buttons">
          <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
          </a>
          ${botaoDeploy}
        </div>
      `;

			// Constrói o Card
			swiperWrapper.innerHTML += `
      
          <div class="swiper-slide">

            <article class="project-card">

              
              <figure class="project-image">
                <img src="${urlIcone}"
                     alt="Ícone - ${linguagem} - Linguagem principal do projeto"
                >
              </figure>

            
              <div class="project-content">

                <h3>${nomeFormatado}</h3>
                <p>${descricao}</p>

                <div class="project-tags">
                  ${tags}
                </div>

                ${botoesAcao}

              </div>

            </article>

          </div>
      `
		})

		iniciarSwiper()
	} catch (error) {
		console.error('Erro ao buscar dados no GitHub', error)
	}
}

//SWIPPER - carrossel
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,
        
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false
            },
            769: { 
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false
            },
            1025: { 
                slidesPerView: 3,
                slidesPerGroup: 3, 
                spaceBetween: 54,
                centeredSlides: false
            }
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        
        grabCursor: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0, 
    });
}

//formulario
formulario.addEventListener('submit',function(event){
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');
     
    //comeca c true pq fica false se nao passar por alguma validacao
    let isValid = true;

    //validadr nome (min 3 caracteres) 
    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');
    if(nome.value.trim() < 3 ){
        erroNome.innerHTML = 'O nome deve ter no minimo 3 caracteres';
        if (isValid) nome.focus();
        isValid = false;
    }
    //validar email
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    if(!email.value.trim().match(emailRegex)){
        erroEmail.innerHTML = 'Email invalido';
        if (isValid) email.focus();
        isValid = false;
    }

    //validadr assunto 
    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');
    if(assunto.value.trim().length < 5 ){
        erroAssunto.innerHTML = 'O assunto deve ter no minimo 5 caracteres';
        if (isValid) assunto.focus();
        isValid = false;
    }

    //validar mensagem
    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');
    if(mensagem.value.trim().length === 0 ){
        erroMensagem.innerHTML = 'A mensagem não pode estar vazia';
        if (isValid) mensagem.focus();
        isValid = false;
    }

    //submit
    if(isValid){
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerText = 'Enviando...';

        formulario.submit();
    }

})

getAboutGitHub();
getProjectsGitHub();
