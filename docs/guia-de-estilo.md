# Guia de estilo do projeto

Este guia padroniza identidade visual, componentes, acessibilidade e convenções de código para manter o portfólio consistente, legível e fácil de evoluir.

---

## Identidade visual

### Cores

- **Variáveis principais:**
  - `--bg-color: #1f242d` — plano de fundo principal
  - `--second-bg-color: #323946` — áreas de destaque/seções alternadas
  - `--text-color: #ffffff` — texto padrão
  - `--main-color: #00efff` — cor de ação/realce

- **Uso recomendado:**
  - **Fundo:** `--bg-color`
  - **Seções alternadas:** `--second-bg-color`
  - **Texto:** `--text-color` com contraste mínimo 4.5:1
  - **Interações e links ativos:** `--main-color`

### Tipografia

- **Fonte:** Poppins (Google Fonts)
- **Pesos usados:** 300, 400, 500, 600, 700, 800, 900
- **Escala base:** html = 62.5% (1rem = 10px)
- **Tamanhos sugeridos:**
  - **H1:** 5.6rem
  - **H2:** 4.5rem
  - **H3:** 2.6–3.2rem
  - **Parágrafo:** 1.6rem
- **Line-height:** 1.4–1.6 para textos longos

### Ícones e imagens

- **Ícones:** Boxicons (CDN) + SVGs internos para feedback (sucesso/erro)
- **Acessibilidade:** sempre com `aria-label` em links de ícones
- **Imagens:**
  - **Formato:** PNG/JPG otimizados; considere WebP para performance
  - **Carregamento:** `loading="lazy"`
  - **Nomeação:** descritiva e em kebab-case (ex.: `projeto-pdv-dashboard.jpg`)

---

## Layout e espaçamento

### Grid e alinhamento

- **Home/Sobre:** flex para alinhamento central e alternância de colunas
- **Portfólio:** grid 3 colunas (desktop), reduzindo responsivo (2/1 col)
- **Cards:** bordas arredondadas (2rem) e sombra suave

### Escala de espaçamento

- **Seções:** `padding: 10rem 9% 2rem`
- **Gaps principais:** 2rem, 2.5rem, 3rem, 4rem
- **Botões:** `1rem 2.8rem`, raio `4rem`

### Breakpoints

- **≤1200px:** html 55%
- **≤991px:** `padding` lateral 3%, seções com `padding` reduzido
- **≤768px:** menu mobile, grid 2 colunas no portfólio
- **≤617px:** grid 1 coluna
- **≤450px:** html 50%, inputs 100%, imagens 90vw

Exemplo de media query:

```css
@media (max-width: 768px) {
  .navbar { /* menu mobile */ }
  .portfolio-container { grid-template-columns: repeat(2, 1fr); }
}

### Componentes
Botões
- Classe: .btn
- Estado hover: sem sombra
- Consistência: usar sempre .btn para CTAs

Exemplo:
<a class="btn" href="{{ url_for('static', filename='files/curriculo_alexmenezes.pdf') }}">Download CV</a>

### Navbar
- Desktop: links com :hover/.active usando --main-color
- Mobile: #menu-icon alterna bx-x e .navbar.active

Exemplo JS:
menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

### Cards de portfólio
- Hover na imagem: transform: scale(1.1)
- Overlay: gradiente com translateY e reveal no hover do card

Estrutura:
<div class="portfolio-box">
  <img src="{{ url_for('static', filename='images/portfolio-1.jpg') }}" alt="Projeto 1">
  <div class="portfolio-layer">
    <h4>Em breve</h4>
    <p>Projeto em ajustes para publicação.</p>
    <a href="#"><i class='bx bx-link-external'></i></a>
  </div>
</div>

### Formulários
- Inputs: type="email", type="tel", placeholders claros
- Validação: front (requerido) + back (Flask) com mensagens unificadas
- Feedback: #responseMsg com ícone SVG (sucesso/erro), classes .show, .success, .error

Exemplo HTML:
<p id="responseMsg">
  <span class="icon"></span>
  <span class="text"></span>
</p>

### Acessibilidade e SEO
- Idioma: <html lang="pt-br">
- Imagens: alt descritivo
- Links de ícones: aria-label
- Foco visível: respeitar outline (não remover em foco)
- Meta tags OG: título, descrição, imagem e tipo
- Headings: hierarquia consistente (H1 único por página)
- Contraste: manter legibilidade em fundos escuros

Exemplo de link acessível:
<a href="https://github.com/alexssmenezes" aria-label="GitHub de Alex Menezes" target="_blank" rel="noopener noreferrer">
  <i class='bx bxl-github'></i>
</a>

### Padrões de código
### HTML
- Templates Flask: url_for('static', filename='...') para assets
- Comentários de seção: <!-- ===== SEÇÃO: NOME ===== -->
- Atributos: ordem lógica (id, class, href/src, alt, aria-*)

Exemplo:
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">

### CSS
- Variáveis: em :root
- Unidades: rem e % (evitar px para tamanhos)
- Comentários: /* ===== SEÇÃO: NOME ===== */
- Nomes de classe: kebab-case; sem aninhamentos profundos desnecessários

Exemplo:
/* ===== SEÇÃO: PORTFÓLIO ===== */
.portfolio-container { display: grid; gap: 2.5rem; }

### JavaScript
- ES6+: const/let, arrow functions
- Eventos: registrados no final do body (ou DOM pronto)
- Comentários: /* ===== SEÇÃO: NOME ===== */
- Estado do menu mobile: fechar ao clicar em link
- Respostas da API: { status, message }

Exemplo:
/* ===== SEÇÃO: ENVIAR EMAIL ===== */
const msg = document.getElementById("responseMsg");
// ... fetch, set classes .success/.error, msg.textContent = data.message

### Python (Flask)
- .env: EMAIL_ADDRESS, EMAIL_PASSWORD usando python-dotenv
- CORS: apenas em dev
- Respostas: JSON unificado {status, message}
- Erros: logar traceback, mensagens amigáveis ao usuário
- Segurança: nunca logar senhas; debug=False em produção

Exemplo:
return jsonify({"status": "success", "message": "✅ Email enviado com sucesso!"}), 200

### Versionamento e convenções
### Estrutura do repositório
- Pastas-chave: server/, static/, templates/, docs/
- Ignorados: .env, __pycache__/, .vscode/, node_modules/

### Commits (Conventional Commits)
- Formato: tipo(escopo): descrição
- Tipos comuns: feat, fix, docs, style, refactor, chore

Exemplos:
- feat(contact): integra envio de e-mail via Flask
- fix(navbar): corrige destaque do link ativo ao rolar
- docs: adiciona guia de estilo em docs/

### Branches
- Principal: main
- Feature: feat/nome-curto
- Correção: fix/bug-descricao
