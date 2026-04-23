// Tipo Provider (compartilhado entre componentes)
export type Provider = {
  id: string;
  type: "prestador" | "empresa";
  name: string;
  category: "tecnologia" | "restaurantes" | "farmacias" | "eletricidade" | "escolas" | "bancos" | "hoteis" | "lazer" | "outros";
  categoryLabel: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  phone: string;
  verified: boolean;
  responseTime: string;
  tags: string[];
  featured: boolean;
  priceFrom: string;
  // Dados adicionais para página de perfil
  website?: string;
  email?: string;
  images?: string[]; // máximo 5 imagens
  aboutText?: string; // descrição detalhada
  hours?: string; // horários de funcionamento
  experience?: string; // experiência/anos
  certifications?: string[]; // certificações
};

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "1",
    type: "empresa",
    name: "ByteWave Solutions",
    category: "tecnologia",
    categoryLabel: "Computadores & Assistência",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 173,
    description:
      "Venda e manutenção de computadores, redes empresariais e suporte técnico para casas e escritórios.",
    location: "Luanda, Ingombota",
    phone: "244923100101",
    verified: true,
    responseTime: "< 30 min",
    tags: ["Hardware", "Redes", "Suporte"],
    featured: true,
    priceFrom: "AOA 12.000",
    website: "https://bytewavesolutions.ao",
    email: "contato@bytewavesolutions.ao",
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "A ByteWave Solutions é uma empresa especializada em soluções tecnológicas completas. Com mais de 10 anos no mercado angolano, oferecemos serviços de qualidade para particulares e empresas. Nossa equipa é certificada e usa as melhores práticas internacionais.",
    hours: "Segunda a Sexta: 09:00-18:00 | Sábado: 10:00-14:00",
    experience: "10+ anos",
    certifications: ["CompTIA A+", "Microsoft Certified", "Cisco Associate"],
  },
  {
    id: "2",
    type: "empresa",
    name: "Sabor Capital",
    category: "restaurantes",
    categoryLabel: "Restaurante Premium",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 294,
    description:
      "Experiência gastronómica com cozinha nacional e internacional, reservas para eventos e serviço executivo.",
    location: "Luanda, Talatona",
    phone: "244923200202",
    verified: true,
    responseTime: "Reserva imediata",
    tags: ["Reservas", "Eventos", "Delivery"],
    featured: true,
    priceFrom: "AOA 9.000",
    website: "https://saborcapital.ao",
    email: "reservas@saborcapital.ao",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900967-f86470dc9385?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495195134817-aeb325ef1d4b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485521328162-1042dd6d1dba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1414235077418-3a3357bd6f32?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Na Sabor Capital, transportamos você numa jornada culinária única. Somos conhecidos pela qualidade dos ingredientes frescos, preparação autêntica e apresentação sofisticada. Contamos com chefs experientes e um wine list premiado.",
    hours: "Almoço: 11:30-15:00 | Jantar: 18:30-22:30 | Fechado aos domingos",
    experience: "8 anos",
    certifications: ["Licença de Restaurante", "Certificação HACCP"],
  },
  {
    id: "3",
    type: "empresa",
    name: "Farmácia Vida+",
    category: "farmacias",
    categoryLabel: "Farmácia & Bem-estar",
    imageUrl:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 412,
    description:
      "Medicamentos, produtos de saúde e atendimento farmacêutico com entrega rápida em vários bairros.",
    location: "Luanda, Maianga",
    phone: "244923300303",
    verified: true,
    responseTime: "< 20 min",
    tags: ["24h", "Entrega", "Receitas"],
    featured: true,
    priceFrom: "AOA 2.500",
    website: "https://farmaciavida.ao",
    email: "atendimento@farmaciavida.ao",
    images: [
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1631217651384-93b4ef9c81f6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655201-938e0054a514?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "A Farmácia Vida+ é referência em saúde e bem-estar em Luanda. Oferecemos medicamentos de origem confiável, produtos cosméticos e serviços de saúde com farmacêuticos qualificados disponíveis 24 horas.",
    hours: "24h - Funcionamos todos os dias",
    experience: "15 anos",
    certifications: ["Licença Farmacêutica", "Cadastro Nacional de Farmácias"],
  },
  {
    id: "4",
    type: "prestador",
    name: "Carlos Eletricista",
    category: "eletricidade",
    categoryLabel: "Serviços Elétricos",
    imageUrl:
      "https://images.unsplash.com/photo-1621905252472-e8f4f03f18a0?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 88,
    description:
      "Instalações, reparações e manutenção elétrica residencial com atendimento de urgência.",
    location: "Luanda, Cazenga",
    phone: "244923400404",
    verified: true,
    responseTime: "< 45 min",
    tags: ["Urgência", "Residencial", "Inspeção"],
    featured: false,
    priceFrom: "AOA 7.500",
    website: "https://carloseletricista.ao",
    email: "carlos@eletricista.ao",
    images: [
      "https://images.unsplash.com/photo-1621905252472-e8f4f03f18a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581578737162-fd7d2efm56e9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Sou electricista profissional certificado com mais de 10 anos de experiência em Luanda. Realizo trabalhos residenciais e comerciais com qualidade garantida e preços justos. Trabalho com urgência 24h para situações de emergência.",
    hours: "Segunda a Sexta: 07:00-21:00 | Sábado: 08:00-18:00 | Emergência 24h",
    experience: "12 anos",
    certifications: ["Electricista Certificado", "Inspeção Elétrica", "Segurança do Trabalho"],
  },
  {
    id: "5",
    type: "empresa",
    name: "Escola Horizonte",
    category: "escolas",
    categoryLabel: "Educação Privada",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 136,
    description:
      "Ensino de qualidade com atividades extracurriculares, laboratórios modernos e apoio pedagógico.",
    location: "Luanda, Benfica",
    phone: "244923500505",
    verified: true,
    responseTime: "Resposta no dia",
    tags: ["Matrículas", "Transporte", "Atividades"],
    featured: false,
    priceFrom: "AOA 45.000",
    website: "https://escolahorizonte.ao",
    email: "secretaria@escolahorizonte.ao",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1427504494785-cdec3c4536ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497633762265-25c007658fed?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b0e3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "A Escola Horizonte é uma instituição de referência em educação, oferecendo um currículo enriquecido com tecnologia, artes e desportos. Contamos com infraestrutura moderna, professores qualificados e programas de apoio diferenciado.",
    hours: "Segunda a Sexta: 07:30-17:00",
    experience: "20 anos",
    certifications: ["Acreditação Educativa", "Ensino Português e Inglês"],
  },
  {
    id: "6",
    type: "empresa",
    name: "Banco Litoral",
    category: "bancos",
    categoryLabel: "Serviços Bancários",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviews: 164,
    description:
      "Contas, créditos, pagamentos digitais e soluções financeiras para famílias e empresas.",
    location: "Luanda, Mutamba",
    phone: "244923600606",
    verified: true,
    responseTime: "Agendamento",
    tags: ["Crédito", "Empresas", "Digital"],
    featured: false,
    priceFrom: "Sem custo inicial",
    website: "https://bancolitoral.ao",
    email: "atendimento@bancolitoral.ao",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552821863-91d930cbf14d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527482797697-8795b1a55a45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "O Banco Litoral é parte do sistema financeiro angolano, oferecendo soluções bancárias completas. Dispomos de tecnologia segura, atendimento personalizado e produtos financeiros adaptados ao crescimento do seu negócio.",
    hours: "Segunda a Sexta: 08:00-17:00 | Sábado: 09:00-12:00",
    experience: "25 anos",
    certifications: ["Instituição Bancária Regulada", "Certificação ISO 27001"],
  },
  {
    id: "7",
    type: "empresa",
    name: "Hotel Atlântico",
    category: "hoteis",
    categoryLabel: "Hospedagem & Eventos",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 223,
    description:
      "Suites modernas, restaurante, salas para eventos e reservas para estadias curtas ou longas.",
    location: "Luanda, Ilha",
    phone: "244923700707",
    verified: true,
    responseTime: "Reserva imediata",
    tags: ["Suites", "Eventos", "Business"],
    featured: true,
    priceFrom: "AOA 38.000",
    website: "https://hotelatlântico.ao",
    email: "reservas@hotelatlântico.ao",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519191033218-9a1e64fa6a57?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683078519-62d653fbdff1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Hotel Atlântico é uma unidade hoteleira de excelência localizada na Ilha de Luanda. Oferecemos suites luxuosas, restaurante gourmet, serviço spa e infraestrutura para eventos. Ideal para estadias de lazer ou negócio.",
    hours: "24h - Recepção funcionando o tempo todo",
    experience: "18 anos",
    certifications: ["Classificação 4 Estrelas", "Certificação Turística"],
  },
  {
    id: "8",
    type: "empresa",
    name: "BluePool Center",
    category: "lazer",
    categoryLabel: "Piscinas & Lazer",
    imageUrl:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 97,
    description:
      "Centro de lazer com piscina, aulas aquáticas e programas para família durante toda a semana.",
    location: "Luanda, Talatona",
    phone: "244923800808",
    verified: false,
    responseTime: "< 2h",
    tags: ["Família", "Aulas", "Fim de semana"],
    featured: false,
    priceFrom: "AOA 6.000",
    website: "https://bluepool.ao",
    email: "info@bluepool.ao",
    images: [
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160550-112169ad1c63?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "BulePool Center é o seu destino para diversão aquática em família. Contamos com piscinas olímpicas, zona infantil, aulas de natação para todas as idades e programa de actividades de fim de semana.",
    hours: "Segunda a Sexta: 08:00-18:00 | Sábado e Domingo: 08:00-20:00",
    experience: "7 anos",
    certifications: ["Centro de Lazer Licenciado", "Instrutor Certificado de Natação"],
  },
  {
    id: "9",
    type: "prestador",
    name: "Marta TI Express",
    category: "tecnologia",
    categoryLabel: "Suporte Técnico",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviews: 121,
    description:
      "Atendimento ao domicílio para formatação, upgrades e solução de problemas em computadores e impressoras.",
    location: "Luanda, Kilamba",
    phone: "244923900909",
    verified: true,
    responseTime: "< 1h",
    tags: ["Domicílio", "Windows", "Impressoras"],
    featured: false,
    priceFrom: "AOA 5.500",
    website: "https://martatexpress.ao",
    email: "marta@tiexpress.ao",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Sou técnica informática com especialização em Windows e manutenção de computadores. Atendo ao domicílio com rapidez e qualidade. Realizei centenas de atendimentos bem-sucedidos com rating 4.9 de satisfação.",
    hours: "Segunda a Sexta: 08:00-20:00 | Sábado: 09:00-17:00",
    experience: "8 anos",
    certifications: ["CompTIA A+", "Técnica Certificada", "Windows Specialist"],
  },
  {
    id: "10",
    type: "prestador",
    name: "Chef Nando Eventos",
    category: "restaurantes",
    categoryLabel: "Catering & Eventos",
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviews: 76,
    description:
      "Serviço de catering para casamentos, aniversários e eventos corporativos com menus personalizados.",
    location: "Luanda, Viana",
    phone: "244924010010",
    verified: true,
    responseTime: "< 3h",
    tags: ["Catering", "Eventos", "Buffet"],
    featured: false,
    priceFrom: "AOA 18.000",
    website: "https://chefnandoeventos.ao",
    email: "nando@eventos.ao",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900967-f86470dc9385?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549487728-37ff7c23e03b?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Chef profissional com 12 anos de experiência em catering. Realizei mais de 200 eventos com sucesso. Ofereço menus personalizados, degustações e plateia completa para o seu evento especial.",
    hours: "Flexível - Agendamento para eventos",
    experience: "12 anos",
    certifications: ["Chef Profissional Registado", "Segurança Alimentar", "Eventos Certificados"],
  },
  {
    id: "11",
    type: "empresa",
    name: "Colégio Nova Geração",
    category: "escolas",
    categoryLabel: "Ensino Médio",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviews: 59,
    description:
      "Instituição focada em excelência académica, inovação digital e preparação para o ensino superior.",
    location: "Luanda, Rangel",
    phone: "244924110110",
    verified: false,
    responseTime: "1 dia útil",
    tags: ["Secundário", "Tecnologia", "Bolsas"],
    featured: false,
    priceFrom: "AOA 35.000",
    website: "https://coleginovagoração.ao",
    email: "informacoes@coleginovagoração.ao",
    images: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1427504494785-cdec3c4536ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b0e3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497633762265-25c007658fed?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "O Colégio Nova Geração é uma instituição de ensino dinâmica focada na excelência académica e digital. Oferecemos insentivos para alunos de excelência e programas de preparação para universidade.",
    hours: "Segunda a Sexta: 08:00-17:00",
    experience: "15 anos",
    certifications: ["Acreditação Nacional", "Programas Avançados", "Intercâmbio Internacional"],
  },
  {
    id: "12",
    type: "prestador",
    name: "Nuno Hotel Concierge",
    category: "hoteis",
    categoryLabel: "Reserva & Concierge",
    imageUrl:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviews: 44,
    description:
      "Consultoria para reservas, organização de estadias e experiências premium para viagens em família.",
    location: "Luanda, Ingombota",
    phone: "244924210210",
    verified: true,
    responseTime: "< 1h",
    tags: ["Concierge", "Reservas", "Premium"],
    featured: false,
    priceFrom: "AOA 10.000",
    website: "https://nunohconcierge.ao",
    email: "nuno@hotelconcierge.ao",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "Sou concierge hoteleiro especializado em criar experiências de viagem inesquecíveis. Com network nos melhores hotéis, arranjo reservas com tarifas especiais e organizo itinerários personalizados.",
    hours: "Segunda a Domingo: 08:00-22:00",
    experience: "9 anos",
    certifications: ["Concierge Certificado", "Especialista em Turismo Premium"],
  },
  {
    id: "13",
    type: "empresa",
    name: "MultiServ Angola",
    category: "outros",
    categoryLabel: "Serviços Diversos",
    imageUrl:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
    rating: 4.5,
    reviews: 68,
    description:
      "Serviços gerais para casa e empresa: apoio administrativo, logística leve e soluções rápidas para necessidades do dia a dia.",
    location: "Luanda, Alvalade",
    phone: "244924310310",
    verified: true,
    responseTime: "< 2h",
    tags: ["Diversos", "Empresas", "Residencial"],
    featured: false,
    priceFrom: "AOA 4.500",
    website: "https://multiservangola.ao",
    email: "contato@multiservangola.ao",
    images: [
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    ],
    aboutText:
      "MultiServ Angola oferece soluções completas de serviços gerais. Somos confiáveis, rápidos e discretos. Atendemos residências e empresas com profissionalismo e preços competitivos.",
    hours: "Segunda a Sábado: 06:00-20:00",
    experience: "12 anos",
    certifications: ["Empresa Registada", "Seguro de Responsabilidade Civil"],
  },
];
