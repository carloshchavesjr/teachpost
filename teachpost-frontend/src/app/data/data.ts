

/*
export const mockPosts: Post[] = [
  // Matemática
  {
    id: 1,
    title: 'Aplicações da Fórmula de Bhaskara no Cotidiano',
    author: 'Carlos Silva',
    subject: 'Matemática',
    description: 'A fórmula de Bhaskara, também conhecida como fórmula quadrática, é essencial para resolver equações do segundo grau da forma ax² + bx + c = 0. Além do uso acadêmico, ela tem aplicações práticas em diversas áreas como engenharia, física e economia. Por exemplo, no cálculo de trajetórias parabólicas, na otimização de áreas e no cálculo de pontos de máximo e mínimo em funções. Neste post, exploraremos casos reais onde a fórmula é aplicada, incluindo cálculos de alcance de projéteis e análise de curvas de demanda em microeconomia.',
    date: '15/05/2023',
 
  },
  {
    id: 2,
    title: 'Introdução à Teoria dos Conjuntos',
    author: 'Mariana Costa',
    subject: 'Matemática',
    description: 'A teoria dos conjuntos, desenvolvida por Georg Cantor no final do século XIX, é a base para toda a matemática moderna. Ela estuda as propriedades e relações entre coleções de objetos, chamadas conjuntos. Neste artigo, abordaremos os conceitos fundamentais como união, interseção, diferença e complemento de conjuntos, além das importantes relações de pertinência e inclusão. Veremos também como esses conceitos são aplicados em probabilidade, lógica matemática e banco de dados. Incluiremos exemplos práticos de como a teoria dos conjuntos é usada em programação e análise de algoritmos.',
    date: '20/06/2023',
   
  },

  // Português
  {
    id: 3,
    title: 'Análise Profunda do Modernismo Brasileiro',
    author: 'Ana Oliveira',
    subject: 'Português',
    description: 'O movimento modernista brasileiro, consolidado com a Semana de Arte Moderna de 1922, revolucionou nossa literatura ao romper com os padrões estéticos europeus. Este artigo examina as principais características da prosa e poesia modernista, com ênfase em autores como Mário de Andrade, Oswald de Andrade e Manuel Bandeira. Analisaremos obras fundamentais como "Macunaíma" e "Pauliceia Desvairada", explorando como o movimento incorporou elementos da cultura popular brasileira e linguagem coloquial. Também discutiremos o legado do modernismo na literatura contemporânea e sua influência em outros movimentos artísticos.',
    date: '10/05/2023',
    likes: 42,
    liked: true,
    saved: false
  },
  {
    id: 4,
    title: 'O Uso da Vírgula: Regras e Exceções',
    author: 'Pedro Henrique',
    subject: 'Português',
    description: 'A vírgula é um dos sinais de pontuação que mais causa dúvidas na língua portuguesa. Este guia completo aborda todas as regras de emprego da vírgula segundo a norma culta, incluindo: separação de elementos em enumerações, isolamento de apostos e vocativos, separação de adjuntos adverbiais e orações intercaladas. Também exploraremos as situações em que a vírgula é proibida, como entre sujeito e predicado. Incluímos diversos exemplos retirados de obras literárias e exercícios práticos para fixação do conteúdo. Por fim, discutiremos como o uso da vírgula pode alterar completamente o sentido de uma frase.',
    date: '03/07/2023',
    likes: 35,
    liked: false,
    saved: true
  },

  // História
  {
    id: 5,
    title: 'A Revolução Industrial e Seus Impactos Sociais',
    author: 'Luiz Fernando',
    subject: 'História',
    description: 'A Revolução Industrial, iniciada na Inglaterra no século XVIII, transformou radicalmente a organização da sociedade e os meios de produção. Este estudo detalha as inovações tecnológicas como a máquina a vapor e o tear mecânico, e analisa as profundas mudanças sociais que provocaram, incluindo o êxodo rural, a formação do proletariado urbano e as primeiras manifestações trabalhistas. Também examinaremos como a industrialização afetou a economia global, criando novas relações de dependência entre colônias e metrópoles. O artigo inclui uma análise comparativa entre a Primeira e Segunda Revolução Industrial e seus reflexos na sociedade contemporânea.',
    date: '12/04/2023',
    likes: 29,
    liked: false,
    saved: true
  },
  {
    id: 6,
    title: 'O Brasil Colonial: Economia e Sociedade',
    author: 'Amanda Santos',
    subject: 'História',
    description: 'Este trabalho explora a estrutura econômica e social do Brasil durante o período colonial (1500-1822). Analisamos os ciclos econômicos do pau-brasil, açúcar, ouro e algodão, destacando como cada um moldou diferentes regiões do país. A sociedade colonial é examinada em suas complexas relações entre senhores de engenho, escravizados, homens livres e a Igreja. Abordamos também a resistência indígena e africana, as rebeliões nativistas e a formação de uma identidade brasileira distinta da portuguesa. O artigo inclui mapas históricos e dados demográficos que ilustram a evolução da colônia ao longo de três séculos.',
    date: '22/08/2023',
    likes: 31,
    liked: true,
    saved: false
  },

  // Ciências
  {
    id: 7,
    title: 'Sistema Solar: Uma Jornada pelos Planetas',
    author: 'Ricardo Almeida',
    subject: 'Ciências',
    description: 'Nesta exploração detalhada do nosso sistema solar, examinaremos as características únicas de cada planeta, desde Mercúrio, o mais próximo do Sol, até Netuno, o gigante gelado. Discutiremos a formação do sistema solar há 4,6 bilhões de anos e as teorias mais recentes sobre sua evolução. Incluímos dados atualizados sobre missões espaciais, como as descobertas da sonda Juno em Júpiter e da New Horizons em Plutão. O artigo também aborda os corpos menores como asteroides, cometas e a misteriosa Nuvem de Oort, explicando seu papel no sistema solar e possíveis riscos de colisão com a Terra.',
    date: '05/03/2023',
    likes: 47,
    liked: true,
    saved: true
  },
  {
    id: 8,
    title: 'A Fotossíntese e a Vida na Terra',
    author: 'Beatriz Oliveira',
    subject: 'Ciências',
    description: 'A fotossíntese é o processo bioquímico mais importante para a manutenção da vida em nosso planeta. Este artigo explica em detalhes as duas fases do processo (fotoquímica e química), os pigmentos envolvidos (principalmente a clorofila) e os fatores que afetam sua eficiência. Exploramos como a fotossíntese transformou a atmosfera primitiva da Terra, permitindo o desenvolvimento da vida complexa. Também discutimos sua relação com o ciclo do carbono e o aquecimento global, além de curiosidades como plantas que realizam fotossíntese de forma diferente (via CAM) e pesquisas sobre fotossíntese artificial para produção de energia limpa.',
    date: '18/09/2023',
    likes: 38,
    liked: false,
    saved: false
  },

  // Física
  {
    id: 9,
    title: 'Relatividade Geral: Entendendo o Espaço-Tempo',
    author: 'Felipe Costa',
    subject: 'Física',
    description: 'A teoria da Relatividade Geral, publicada por Albert Einstein em 1915, revolucionou nossa compreensão da gravidade. Este artigo explica como Einstein concebeu a gravidade não como uma força, mas como a curvatura do espaço-tempo causada pela massa e energia. Discutiremos os conceitos de dilatação temporal gravitacional, desvio da luz por campos gravitacionais e ondas gravitacionais. Incluímos exemplos práticos como o funcionamento do GPS, que requer correções relativísticas, e explicações sobre buracos negros e a expansão do universo. O texto é acompanhado de diagramas que ilustram a curvatura do espaço-tempo de forma acessível.',
    date: '30/01/2023',
    likes: 52,
    liked: true,
    saved: true
  },
  {
    id: 10,
    title: 'Física Quântica para Iniciantes',
    author: 'Camila Ribeiro',
    subject: 'Física',
    description: 'A física quântica descreve o comportamento da matéria em escalas atômicas e subatômicas, revelando um mundo radicalmente diferente do nosso cotidiano. Este guia introdutório explica conceitos fundamentais como dualidade onda-partícula, princípio da incerteza de Heisenberg, superposição quântica e entrelaçamento. Abordaremos experimentos clássicos como o da dupla fenda e discutiremos aplicações modernas como computação quântica, criptografia quântica e imagens médicas. O artigo inclui analogias simples para facilitar a compreensão desses fenômenos contra-intuitivos que desafiam nossa noção clássica de realidade.',
    date: '14/11/2023',
    likes: 45,
    liked: false,
    saved: true
  },

  // Química
  {
    id: 11,
    title: 'Tabela Periódica: História e Organização',
    author: 'Gabriel Martins',
    subject: 'Química',
    description: 'A tabela periódica é muito mais que um arranjo de elementos - é um mapa que revela as relações profundas entre a estrutura atômica e as propriedades químicas. Este artigo traça a evolução histórica da tabela, desde as primeiras classificações de Döbereiner até a versão moderna de Mendeleev. Explicamos como os elementos são organizados em períodos e grupos, e como isso reflete sua configuração eletrônica. Detalhamos as tendências periódicas como raio atômico, eletronegatividade e energia de ionização. Incluímos também uma discussão sobre os elementos sintéticos mais recentes e as pesquisas para expandir a tabela periódica ainda mais.',
    date: '07/02/2023',
    likes: 33,
    liked: true,
    saved: false
  },
  {
    id: 12,
    title: 'Reações Químicas no Cotidiano',
    author: 'Isabela Ferreira',
    subject: 'Química',
    description: 'As reações químicas estão presentes em todos os aspectos de nossa vida diária, desde a digestão dos alimentos até o funcionamento de baterias e a fotossíntese das plantas. Este artigo explora 20 exemplos práticos de reações químicas, incluindo: a combustão que ocorre em motores, a fermentação do pão e bebidas, a oxidação que causa ferrugem, e as reações que acontecem quando cozinhamos. Para cada caso, fornecemos a equação química balanceada e explicações sobre os reagentes e produtos envolvidos. Também discutimos como o conhecimento dessas reações pode nos ajudar a resolver problemas práticos, desde remover manchas até conservar alimentos.',
    date: '25/10/2023',
    likes: 41,
    liked: false,
    saved: true
  }
];
*/