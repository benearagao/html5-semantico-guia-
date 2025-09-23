# HTML5 Semântico — Guia Rápido

Guia pesquisável e responsivo das tags semânticas do HTML5: exemplos mínimos, A–Z, boas práticas, acessibilidade (a11y), checklist, tema dark/light automático e botão "Copiar" em trechos de código. Ideal para consulta rápida em aulas e projetos Front-end.

## 🏗️ Arquitetura

Este projeto segue uma arquitetura limpa e organizada, com separação clara de responsabilidades:

```
📦 projeto/
├── 📄 index.html                 # Estrutura semântica principal
├── 📁 css/
│   └── 🎨 styles.css             # Folha de estilos externa
├── 📁 js/
│   └── ⚡ main.js               # Funcionalidades JavaScript
└── 📖 README.md                  # Documentação
```

## ✨ Características

### 🎯 Estrutura Semântica
- Elementos HTML5 semânticos apropriados
- Hierarquia de títulos lógica (H1 → H2 → H3...)
- Landmarks para navegação assistiva
- Separação limpa entre conteúdo, apresentação e comportamento

### ♿ Acessibilidade (WCAG 2.1)
- Skip links para navegação por teclado
- Textos alternativos descritivos
- Rótulos associados corretamente
- Estados focais visíveis
- Suporte a leitores de tela
- Contraste adequado de cores
- Navegação por teclado funcional

### 📱 Responsividade
- Design mobile-first
- Viewport meta tag configurado
- Grid layout flexível
- Tipografia responsiva com clamp()

### 🔧 Funcionalidades JavaScript
- Busca em tempo real com debouncing
- Cópia de código para clipboard
- Navegação suave entre seções
- Feedback visual acessível
- Progressive enhancement

## 🛡️ Conformidade com Padrões

### W3C HTML5
- DOCTYPE HTML5 válido
- Estrutura semântica adequada
- Atributos obrigatórios presentes
- Elementos aninhados corretamente

### CSS3
- Propriedades modernas com fallbacks
- Custom properties (CSS Variables)
- Media queries para responsividade
- Seletores eficientes

### JavaScript ES6+
- Código modular e organizamado
- Event listeners otimizados
- Tratamento de erros adequado
- APIs modernas com fallbacks

## 🚀 Como Usar

1. **Navegação**: Use os chips na header para pular entre seções
2. **Busca**: Digite no campo de busca para filtrar elementos
3. **Cópia**: Clique em "Copiar" nos exemplos de código
4. **Acessibilidade**: Navegue com Tab, use leitores de tela

## 🎨 Design System

### Cores
- **Tema escuro por padrão** com suporte a `prefers-color-scheme`
- **Paleta semântica**: accent, success, warning, danger
- **Contraste WCAG AA** em todas as combinações

### Tipografia
- **Font stack system** para melhor performance
- **Escalas responsivas** com clamp()
- **Hierarquia clara** de títulos

### Componentes
- **Cards modulares** para conteúdo
- **Chips navegacionais** com feedback visual
- **Botões acessíveis** com estados claros

## 📝 Licença

Este projeto é open source e está disponível sob licença MIT.

---

Desenvolvido com ❤️ para a comunidade por [@benearagao](https://github.com/benearagao)
