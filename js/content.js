/* ============================================================
   MOON VALLEY — content.js
   Structured, editable content. Update the data below to change
   the site without touching the layout (RF-09).

   CONFIG
     discordUrl / socials / trailerUrl: replace null with real
     URLs to enable the links. While null, the UI honestly shows
     a "coming soon" state instead of dead links.
   ============================================================ */
window.MV_CONFIG = {
  /* Official community links — set to real URLs before launch. */
  discordUrl: "https://discord.gg/ACGjkDBws",
  whatsappUrl: "https://chat.whatsapp.com/LSHSJq7csQnLDRaF3xKPql",
  trailerUrl: "assets/videos/kaelith-1.mp4",
  /* Hero backdrop shown at the very top of the site. Replace the
     file (keeping the name) or set to null to use the SVG scene. */
  heroImage: "assets/hero-valley.jpg",
  /* Real App Store link of the game. While null, the badge shows
     an honest "app in development" state. */
  appStoreUrl: null,
  /* Real Google Play link of the game (same honest state). */
  playStoreUrl: null,
  /* REAL cloud login (Firebase Authentication — free tier).
     While these fields are empty, login/register works locally
     in the browser (honest local mode). To enable the REAL login
     (accounts valid on every device):
       1. Create a free project at console.firebase.google.com
       2. Build > Authentication > Get started > Email/Password > Enable
       3. Project settings > Your apps > Web (</>) > copy the config
       4. Paste the values below and push — done. */
  firebase: {
    apiKey: "AIzaSyC-CnDKO703gpBK-_kfCAGiUVI-yPlVgSc",
    authDomain: "moonvalleyonline-a0e5a.firebaseapp.com",
    projectId: "moonvalleyonline-a0e5a",
    appId: "1:927272271757:web:818658ea9d420d005847c4"
  },
  /* Sign-up verification code sent by email (emailjs.com — free plan,
     200 emails/month, no credit card). While these values are empty,
     the code field stays hidden and signup works without it.
     Setup guide: README section "Email verification code". */
  emailjs: {
    publicKey: "",
    serviceId: "",
    templateId: ""
  },
  socials: [
    /* Add real profile URLs to enable the links. While url is null,
       the button honestly shows a "coming soon" state. */
    { key: "instagram", label: "Instagram", url: null },
    { key: "facebook", label: "Facebook", url: null },
    { key: "youtube", label: "YouTube", url: null },
    { key: "tiktok", label: "TikTok", url: null }
  ]
};

/* ---------- social icons (inline SVG paths) ---------- */
window.MV_SOCIAL_ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.69-8.22 8.23-8.22 2.2 0 4.26.86 5.81 2.42a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.21-8.23 8.21z"/></svg>',
  discord: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M19.3 5.3A16.7 16.7 0 0 0 15.1 4l-.2.4a15.6 15.6 0 0 1 3.9 1.6 13.5 13.5 0 0 0-11.6 0A15.6 15.6 0 0 1 11 4.4L10.8 4a16.7 16.7 0 0 0-4.2 1.3C3.9 9.4 3.1 13.4 3.5 17.3a16.8 16.8 0 0 0 5.1 2.6l1-1.7a10.9 10.9 0 0 1-1.7-.8l.4-.3a11.9 11.9 0 0 0 10.3 0l.4.3a10.9 10.9 0 0 1-1.7.8l1 1.7a16.8 16.8 0 0 0 5.1-2.6c.5-4.5-.8-8.5-3.1-12zM9.5 14.9c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm5 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.5 3h6.4l4.4 5.8L17.5 3zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.4-4.8zM10 15.1V8.9l5.2 3.1-5.2 3.1z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.3c2.5 0 2.8 0 3.8.1 2.6.1 3.8 1.4 3.9 3.9 0 1 .1 1.3.1 3.8s0 2.8-.1 3.8c-.1 2.5-1.3 3.8-3.9 3.9-1 0-1.3.1-3.8.1s-2.8 0-3.8-.1c-2.6-.1-3.8-1.4-3.9-3.9 0-1-.1-1.3-.1-3.8s0-2.8.1-3.8C4.4 5.8 5.6 4.5 8.2 4.4c1-.1 1.3-.1 3.8-.1zM12 2C9.4 2 9.1 2 8.1 2.1 4.6 2.2 2.2 4.6 2.1 8.1 2 9.1 2 9.4 2 12s0 2.9.1 3.9c.1 3.5 2.5 5.9 6 6 1 .1 1.3.1 3.9.1s2.9 0 3.9-.1c3.5-.1 5.9-2.5 6-6 .1-1 .1-1.3.1-3.9s0-2.9-.1-3.9c-.1-3.5-2.5-5.9-6-6C14.9 2 14.6 2 12 2zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-8.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 12.1a2.2 2.2 0 0 0-3.7-1.6 10.8 10.8 0 0 0-5.4-1.7l1-4.5 3.2.7a1.7 1.7 0 1 0 .2-1.2l-3.8-.8a.6.6 0 0 0-.7.5l-1.1 5.2a10.8 10.8 0 0 0-5.5 1.7A2.2 2.2 0 1 0 4.4 14a4.3 4.3 0 0 0 0 .6c0 3.1 3.6 5.6 8 5.6s8-2.5 8-5.6a4.3 4.3 0 0 0 0-.6A2.2 2.2 0 0 0 22 12.1zm-14.3 2a1.5 1.5 0 1 1 1.5 1.5 1.5 1.5 0 0 1-1.5-1.5zm8.5 3.7a5.7 5.7 0 0 1-4.2 1.3 5.7 5.7 0 0 1-4.2-1.3.5.5 0 0 1 .7-.7 4.8 4.8 0 0 0 3.5 1 4.8 4.8 0 0 0 3.5-1 .5.5 0 1 1 .7.7zm-.3-2.2a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M16.6 2h-3.1v13.6a2.6 2.6 0 1 1-2.2-2.6v-3.2a5.8 5.8 0 1 0 5.3 5.8V9.1a7 7 0 0 0 4 1.3V7.3a4 4 0 0 1-4-4V2z"/></svg>'
};

window.MV_CONTENT = {

  /* ==========================================================
     NEWS — featured is the first item
     ========================================================== */
  news: [
    {
      id: "first-light",
      category: "update",           // update | event | lore
      date: "2026-10-12",
      image: "assets/region-moon.svg",
      en: {
        tag: "Update",
        title: "The Gates of the Moongate Ruins Open",
        excerpt: "A first look at the shattered ring beyond the vale: floating stones, lunar tides and a boss that hunts by starlight.",
        body: [
          "For the first time, the expedition crossed the Silver Bridge and set foot among the Moongate Ruins — the broken ring of stone that once connected Moon Valley to whatever lies beyond the moon.",
          "The region operates on lunar tides: at the silver hour, gravity loosens and whole islands of rock drift between the shards of the gate. Explorers will need to time their crossings with the phases of the moon.",
          "Guarding the inner sanctum stands Vharûn, the Star-Eater — a creature that blinds every torch and lantern within the arena. Only sound and starlight remain. This chronicle will be expanded as the expedition reports return."
        ]
      },
      pt: {
        tag: "Atualização",
        title: "Os Portões das Ruínas Lunares Se Abrem",
        excerpt: "Uma primeira olhada no anel destruído além do vale: pedras flutuantes, marés lunares e um chefe que caça pela luz das estrelas.",
        body: [
          "Pela primeira vez, a expedição atravessou a Ponte de Prata e pisou entre as Ruínas Lunares — o anel de pedra destruído que uma vez conectou Moon Valley ao que existe além da lua.",
          "A região funciona com marés lunares: na hora prata, a gravidade afrouxa e ilhotas inteiras de rocha derivam entre os cacos do portão. Os exploradores precisarão sincronizar suas travessias com as fases da lua.",
          "Guardando o santuário interior está Vharûn, o Devorador de Estrelas — uma criatura que cega toda tocha e lanternada dentro da arena. Restam apenas som e luz estelar. Esta crônica será expandida quando os relatos da expedição retornarem."
        ]
      }
    },
    {
      id: "ashenmaw-teaser",
      category: "update",
      date: "2026-09-28",
      image: "assets/region-ash.svg",
      en: {
        tag: "Update",
        title: "Ashenmaw: Heat, Ash and Old Debts",
        excerpt: "The volcanic south is documented: obsidian spines, rivers of ember and the forges that once armed the vale.",
        body: [
          "The southern charts are complete. Ashenmaw is a land where the mountains breathe: rivers of ember run beneath obsidian spines, and the old forges still burn under the supervision of the Cinder Wardens.",
          "Heat will be a gameplay system, not a decoration. Armor, route and time of day will decide how deep into the caldera a company can go — and what it can carry back."
        ]
      },
      pt: {
        tag: "Atualização",
        title: "Ashenmaw: Calor, Cinzas e Dívidas Antigas",
        excerpt: "O sul vulcânico foi documentado: espinhos de obsidiana, rios de brasa e as forjas que un armaram o vale.",
        body: [
          "Os mapas do sul estão completos. Ashenmaw é uma terra onde as montanhas respiram: rios de brasa correm sob espinhos de obsidiana e as forjas antigas ainda queimam sob a supervisão dos Guardiões das Cinzas.",
          "O calor será um sistema de gameplay, não um enfeite. Armadura, rota e hora do dia decidem quão fundo na caldeira uma companhia pode ir — e o que consegue trazer de volta."
        ]
      }
    },
    {
      id: "eldergrove-bestiary",
      category: "lore",
      date: "2026-09-10",
      image: "assets/region-grove.svg",
      en: {
        tag: "Lore",
        title: "Bestiary Entry: The Antlered Watchers",
        excerpt: "They do not hunt travelers. They follow them — silently, for days, until the forest decides.",
        body: [
          "The first rangers to enter the Eldergrove reported being followed for six days by figures half-hidden among the roots. They never attacked. They only watched.",
          "The Watchers are not beasts in the usual sense. They appear to judge intent: parties carrying axes were turned back at the root-bridge, while those who walked empty-handed were allowed to pass and were later found guided to water and shelter.",
          "Whether they serve the forest or are the forest remains an open question among the lorekeepers of Moon Valley."
        ]
      },
      pt: {
        tag: "Lore",
        title: "Entrada do Bestiário: Os Vigias de Chifres",
        excerpt: "Eles não caçam viajantes. Eles os seguem — em silêncio, por dias, até que a floresta decida.",
        body: [
          "Os primeiros rangeres a entrarem na Floresta Ancestral relataram ser seguidos por seis dias por figuras meio escondidas entre as raízes. Nunca atacaram. Apenas observaram.",
          "Os Vigias não são bestas no sentido comum. Parecem julgar intenção: grupos carregando machados foram devolvidos na ponte-de-raiz, enquanto aqueles que caminharam desarmados foram autorizados a passar e depois foram encontrados guiados até água e abrigo.",
          "Se eles servem à floresta ou são a floresta permanece uma questão aberta entre os guardiões de lore de Moon Valley."
        ]
      }
    },
    {
      id: "frostvale-aurora",
      category: "lore",
      date: "2026-08-22",
      image: "assets/region-frost.svg",
      en: {
        tag: "Lore",
        title: "Why the Aurora Never Sleeps in Frostvale",
        excerpt: "The eternal light above the frozen kingdom is not a phenomenon. It is a signal.",
        body: [
          "Scholars long believed the aurora of Frostvale was a quirk of the atmosphere. The frozen archives suggest otherwise: the light answers the bells of the submerged cathedral, ringing beneath the ice once every moon.",
          "Whatever sleeps below the frozen lake is not dead. It is waiting — and the aurora is its heartbeat, visible for a hundred leagues."
        ]
      },
      pt: {
        tag: "Lore",
        title: "Por Que a Aurora Nunca Dorme no Vale Glacial",
        excerpt: "A luz eterna acima do reino congelado não é um fenômeno. É um sinal.",
        body: [
          "Estudiosos acreditaram por muito tempo que a aurora do Vale Glacial era uma peculiaridade da atmosfera. Os arquivos congelados sugerem o contrário: a luz responde aos sinos da catedral submersa, que soam sob o gelo a cada lua.",
          "O que quer que dorma sob o lago congelado não está morto. Está esperando — e a aurora é seu batimento cardíaco, visível por cem léguas."
        ]
      }
    },
    {
      id: "first-expedition",
      category: "event",
      date: "2026-08-05",
      image: "assets/scene-mountains.svg",
      en: {
        tag: "Event",
        title: "The First Expedition Sets Out from Starfall Harbor",
        excerpt: "A community event: walk the old road with the first companies and name what you find.",
        body: [
          "The first expedition departed from Starfall Harbor at dusk, following the old road toward the valley's heart. Companies were formed, banners were raised, and a journal was given to each captain.",
          "What the expedition finds will be recorded in the public chronicles — and the names players choose for unnamed places may enter the official maps of Moon Valley."
        ]
      },
      pt: {
        tag: "Evento",
        title: "A Primeira Expedição Parte do Porto da Queda Estelar",
        excerpt: "Um evento da comunidade: percorra a estrada antiga com as primeiras companhias e nomeie o que encontrar.",
        body: [
          "A primeira expedição partiu do Porto da Queda Estelar ao anoitecer, seguindo a estrada antiga rumo ao coração do vale. Companhias foram formadas, estandartes hasteados e um diário foi entregue a cada capitão.",
          "O que a expedição encontrar será registrado nas crônicas públicas — e os nomes que os jogadores escolherem para lugares sem nome podem entrar nos mapas oficiais de Moon Valley."
        ]
      }
    },
    {
      id: "closed-chronicle",
      category: "update",
      date: "2026-07-15",
      image: "assets/scene-why.svg",
      en: {
        tag: "Update",
        title: "Combat Stances: The First Closed Chronicle",
        excerpt: "A deep dive into the timing-based stance system, tested with the first invited companies.",
        body: [
          "The first closed tests of the stance system are complete. Combat in Moon Valley rewards reading the enemy: every stance answers another, and raw strength rarely overcomes preparation.",
          "Full results will be shared with the community once the balance sheets are finalized. Thank you to every company that walked into the arena."
        ]
      },
      pt: {
        tag: "Atualização",
        title: "Posturas de Combate: A Primeira Crônica Fechada",
        excerpt: "Uma análise profunda do sistema de posturas baseado em timing, testado com as primeiras companhias convidadas.",
        body: [
          "Os primeiros testes fechados do sistema de posturas estão completos. O combate em Moon Valley recompensa ler o inimigo: cada postura responde a outra, e a força raramente supera a preparação.",
          "Os resultados completos serão compartilhados com a comunidade quando os balancetes de equilíbrio forem finalizados. Obrigado a toda companhia que entrou na arena."
        ]
      }
    }
  ],

  /* ==========================================================
     REGIONS — world section
     ========================================================== */
  regions: [
    {
      id: "frostvale",
      scene: "assets/regions/frostvale.jpg",
      tone: "ice",
      map: { x: 47, y: 12 },
      en: {
        biome: "Frozen Kingdom",
        name: "Frostvale",
        desc: "A kingdom under eternal aurora, where a submerged cathedral still rings its bells beneath the ice and glaciers remember the names of kings.",
        detail: [
          "**Biome:** Glacial tundra, ice caverns, submerged ruins.",
          "**Inhabitants:** The Aurora Wardens, frost-born herds, and something that sleeps under the frozen lake.",
          "**Exploration:** Light is scarce and warmth is a resource. Expeditions must plan routes around the aurora cycles — the ice is safest when the sky burns."
        ]
      },
      pt: {
        biome: "Reino Congelado",
        name: "Vale Glacial",
        desc: "Um reino sob aurora eterna, onde uma catedral submersa ainda faz seus sinos soar sob o gelo e as geleiras lembram os nomes dos reis.",
        detail: [
          "**Bioma:** Tundra glacial, cavernas de gelo, ruínas submersas.",
          "**Habitantes:** Os Guardiões da Aurora, rebanhos nascidos do gelo e algo que dorme sob o lago congelado.",
          "**Exploração:** Luz é escassa e calor é um recurso. As expedições precisam planejar rotas pelos ciclos da aurora — o gelo é mais seguro quando o céu queima."
        ]
      }
    },
    {
      id: "eldergrove",
      scene: "assets/region-grove.svg",
      tone: "forest",
      map: { x: 82, y: 30 },
      en: {
        biome: "Ancient Forest",
        name: "The Eldergrove",
        desc: "Roots older than kingdoms hold up a canopy that never sees noon. The forest remembers every oath sworn beneath its trees.",
        detail: [
          "**Biome:** Primeval forest, root bridges, moss-covered ruins.",
          "**Inhabitants:** The Antlered Watchers, moss herds, and the last speakers of the root-tongue.",
          "**Exploration:** There are no straight roads in the Eldergrove. Travelers navigate by oaths, songs and the direction the Watchers face."
        ]
      },
      pt: {
        biome: "Floresta Ancestral",
        name: "A Floresta Ancestral",
        desc: "Raízes mais antigas que reinos sustentam uma copa que nunca vê o meio-dia. A floresta lembra de todo juramento feito sob suas árvores.",
        detail: [
          "**Bioma:** Floresta primordial, pontes-de-raiz, ruínas cobertas de musgo.",
          "**Habitantes:** Os Vigias de Chifres, rebanhos de musgo e os últimos falantes da língua-raiz.",
          "**Exploração:** Não há estradas retas na Floresta Ancestral. Os viajantes navegam por juramentos, canções e a direção para onde os Vigias olham."
        ]
      }
    },
    {
      id: "ashenmaw",
      scene: "assets/regions/ashenmaw.jpg",
      tone: "fire",
      map: { x: 25, y: 33 },
      en: {
        biome: "Volcanic Lands",
        name: "Ashenmaw",
        desc: "The mountains breathe here. Ember rivers run beneath obsidian spines, and the old forges still burn for anyone able to pay the heat.",
        detail: [
          "**Biome:** Calderas, obsidian badlands, subterranean forges.",
          "**Inhabitants:** The Cinder Wardens, ember-drakes, and the smith-clans who never left.",
          "**Exploration:** Heat is a system: armor, route and hour decide how deep a company can go — and what it can carry back to the vale."
        ]
      },
      pt: {
        biome: "Terras Vulcânicas",
        name: "Ashenmaw",
        desc: "As montanhas respiram aqui. Rios de brasa correm sob espinhos de obsidiana e as forjas antigas ainda queimam para quem consegue pagar o calor.",
        detail: [
          "**Bioma:** Calderas, terras de obsidiana, forjas subterrâneas.",
          "**Habitantes:** Os Guardiões das Cinzas, dracas de brasa e os clãs de ferreiros que nunca partiram.",
          "**Exploração:** O calor é um sistema: armadura, rota e hora decidem quão fundo uma companhia pode ir — e o que consegue trazer de volta ao vale."
        ]
      }
    },
    {
      id: "moongate",
      scene: "assets/regions/moongate.jpg",
      tone: "moon",
      map: { x: 56, y: 49 },
      en: {
        biome: "Lunar Ruins",
        name: "The Moongate Ruins",
        desc: "A shattered ring of stone that once bridged Moon Valley to whatever waits beyond the moon. Gravity loosens when the silver hour comes.",
        detail: [
          "**Biome:** Floating debris fields, silver deserts, broken colonnades.",
          "**Inhabitants:** Star-priests of a vanished court, tide-wraiths, and Vharûn the Star-Eater.",
          "**Exploration:** Crossings must be timed with the lunar phases. At the silver hour, whole islands drift between the shards of the gate."
        ]
      },
      pt: {
        biome: "Ruínas Lunares",
        name: "As Ruínas Lunares",
        desc: "Um anel de pedra destruído que uma vez ligava Moon Valley ao que espera além da lua. A gravidade afrouxa quando chega a hora prata.",
        detail: [
          "**Bioma:** Campos de escombros flutuantes, desertos prateados, colunatas quebradas.",
          "**Habitantes:** Sacerdotes-estrela de uma corte desaparecida, espectros de maré e Vharûn, o Devorador de Estrelas.",
          "**Exploração:** As travessias precisam ser sincronizadas com as fases da lua. Na hora prata, ilhas inteiras derivam entre os cacos do portão."
        ]
      }
    }
  ],

  /* ==========================================================
     FEATURES — gameplay systems
     ========================================================== */
  features: [
    {
      icon: "sword",
      en: {
        title: "Classes & Abilities",
        text: "Paths of war, wildcraft and spellcraft — each class carries a legend, and legends can be remade as you grow."
      },
      pt: {
        title: "Classes e Habilidades",
        text: "Caminhos de guerra, arte selvagem e feitiçaria — cada classe carrega uma lenda, e lendas podem ser refeitas conforme você cresce."
      }
    },
    {
      icon: "shield",
      en: {
        title: "Combat & Equipment",
        text: "A timing-based stance system where reading the enemy matters more than raw strength, and every relic has a history."
      },
      pt: {
        title: "Combate e Equipamentos",
        text: "Um sistema de posturas baseado em timing, onde ler o inimigo importa mais que força bruta, e cada relíquia tem uma história."
      }
    },
    {
      icon: "compass",
      en: {
        title: "Exploration & Quests",
        text: "No straight roads: routes shift with weather, tides and seasons. Quests are chronicles you help write."
      },
      pt: {
        title: "Exploração e Missões",
        text: "Sem estradas retas: as rotas mudam com clima, marés e estações. Missões são crônicas que você ajuda a escrever."
      }
    },
    {
      icon: "beast",
      en: {
        title: "Creatures & Bosses",
        text: "From the Antlered Watchers to Vharûn the Star-Eater — creatures that hunt, judge and remember those who disturb them."
      },
      pt: {
        title: "Criaturas e Chefes",
        text: "Dos Vigias de Chifres a Vharûn, o Devorador de Estrelas — criaturas que caçam, julgam e lembram daqueles que as perturbam."
      }
    },
    {
      icon: "star",
      en: {
        title: "Progression & Customization",
        text: "Grow in the directions you choose. Banners, titles, stances and relics mark the road you walked."
      },
      pt: {
        title: "Progressão e Personalização",
        text: "Cresça nos caminhos que escolher. Estandartes, títulos, posturas e relíquias marcam a estrada que você percorreu."
      }
    },
    {
      icon: "banner",
      en: {
        title: "Group Events",
        text: "Expeditions, sieges and lunar events that ask for companies of players — legends are rarely written alone."
      },
      pt: {
        title: "Eventos em Grupo",
        text: "Expedições, cercos e eventos lunares que pedem companhias de jogadores — lendas raramente são escritas em solidão."
      }
    }
  ],

  /* ==========================================================
     CLASSES — tabs (first tab = Kaelith)
     images: drop files in assets/classes/ (e.g. kaelith-1.jpg)
             and list them here to extend the gallery.
     videos: { src, poster } entries open in the video modal.
     ========================================================== */
  classes: [
    {
      id: "kaelith",
      tone: "blood",
      sigil: "blade",
      images: [
        "assets/classes/kaelith-1.jpg",
        "assets/classes/kaelith-2.jpg",
        "assets/classes/kaelith-3.jpg",
        "assets/classes/kaelith-4.jpg"
      ],
      videos: [
        { src: "assets/videos/kaelith-1.mp4", poster: "assets/videos/kaelith-1-poster.jpg" },
        { src: "assets/videos/kaelith-2.mp4", poster: "assets/videos/kaelith-2-poster.jpg" },
        { src: "assets/videos/kaelith-3.mp4", poster: "assets/videos/kaelith-3-poster.jpg" }
      ],
      en: {
        name: "Kaelith",
        role: "Blood-Gem Duelist",
        text: "Silver-haired and sharp-eyed, Kaelith fights with chains, blades and blood-gems. She turns every wound into leverage — a dueliste who ends the fight the moment her opponent hesitates.",
        stats: [
          { label: "Damage", value: 85 },
          { label: "Survivability", value: 55 },
          { label: "Mobility", value: 90 },
          { label: "Range", value: 30 }
        ],
        traits: [
          { label: "Style", value: "Agile duelist & counters" },
          { label: "Arsenal", value: "Blood-gem chains, twin blades" },
          { label: "Oath", value: "No second chances" }
        ]
      },
      pt: {
        name: "Kaelith",
        role: "Duelista Rubra",
        text: "De cabelos prateados e olhos vermelhos, Kaelith luta com correntes, lâminas e gemas de sangue. Transforma cada ferida em vantagem — uma duelista que encerra a luta no instante em que o oponente hesita.",
        stats: [
          { label: "Dano", value: 85 },
          { label: "Sobrevivência", value: 55 },
          { label: "Mobilidade", value: 90 },
          { label: "Alcance", value: 30 }
        ],
        traits: [
          { label: "Estilo", value: "Duelista ágil e contragolpes" },
          { label: "Arsenal", value: "Correntes de gema e lâminas gêmeas" },
          { label: "Juramento", value: "Sem segundas chances" }
        ]
      }
    },
    {
      id: "theryon",
      tone: "iron",
      sigil: "gun",
      images: [],
      videos: [],
      en: {
        name: "Theryon",
        role: "Oath-Gun Sharpshooter",
        text: "Theryon never misses twice. Bound to an oath-forged rifle, he measures the vale in breaths and trigger pulls — his shot always arrives before the warning.",
        stats: [
          { label: "Damage", value: 90 },
          { label: "Survivability", value: 50 },
          { label: "Mobility", value: 60 },
          { label: "Range", value: 95 }
        ],
        traits: [
          { label: "Style", value: "Ranged precision & burst" },
          { label: "Arsenal", value: "Oath-forged rifle" },
          { label: "Oath", value: "One breath, one bullet" }
        ]
      },
      pt: {
        name: "Theryon",
        role: "Atirador Jurado",
        text: "Theryon nunca erra duas vezes. Ligado a um rifle forjado por juramento, mede o vale em suspiros e disparos — seu tiro sempre chega antes do aviso.",
        stats: [
          { label: "Dano", value: 90 },
          { label: "Sobrevivência", value: 50 },
          { label: "Mobilidade", value: 60 },
          { label: "Alcance", value: 95 }
        ],
        traits: [
          { label: "Estilo", value: "Precisão à distância e rajadas" },
          { label: "Arsenal", value: "Rifle forjado por juramento" },
          { label: "Juramento", value: "Um suspiro, uma bala" }
        ]
      }
    },
    {
      id: "nyfheris",
      tone: "arcane",
      sigil: "arcane",
      images: [],
      videos: [
        { src: "assets/videos/nyfheris-1.mp4", poster: "assets/videos/nyfheris-1-poster.jpg" }
      ],
      en: {
        name: "Nyfheris",
        role: "Arcane Seer",
        text: "Nyfheris reads the runes the moon left behind. Where they point, the air remembers older laws — and obeys.",
        stats: [
          { label: "Damage", value: 80 },
          { label: "Survivability", value: 45 },
          { label: "Mobility", value: 50 },
          { label: "Range", value: 75 }
        ],
        traits: [
          { label: "Style", value: "Spellcraft & control" },
          { label: "Arsenal", value: "Rune staff, starfire" },
          { label: "Oath", value: "Knowledge before mercy" }
        ]
      },
      pt: {
        name: "Nyfheris",
        role: "Vidente Arcano",
        text: "Nyfheris lê as runas que a lua deixou para trás. Onde aponta, o ar lembra leis mais antigas — e obedece.",
        stats: [
          { label: "Dano", value: 80 },
          { label: "Sobrevivência", value: 45 },
          { label: "Mobilidade", value: 50 },
          { label: "Alcance", value: 75 }
        ],
        traits: [
          { label: "Estilo", value: "Feitiçaria e controle" },
          { label: "Arsenal", value: "Cajado rúnico e fogo estelar" },
          { label: "Juramento", value: "Conhecimento antes da misericórdia" }
        ]
      }
    },
    {
      id: "vaelthor",
      tone: "moon",
      sigil: "bow",
      images: [],
      videos: [],
      en: {
        name: "Vaelthor",
        role: "Moonlit Ranger",
        text: "Vaelthor walks the roads no map keeps. Arrow first, question later — the night owes him nothing, and he collects anyway.",
        stats: [
          { label: "Damage", value: 75 },
          { label: "Survivability", value: 60 },
          { label: "Mobility", value: 80 },
          { label: "Range", value: 85 }
        ],
        traits: [
          { label: "Style", value: "Precision at range" },
          { label: "Arsenal", value: "Longbow & moonsteel" },
          { label: "Oath", value: "One shot, one debt" }
        ]
      },
      pt: {
        name: "Vaelthor",
        role: "Patrulheiro da Lua",
        text: "Vaelthor percorre estradas que nenhum mapa guarda. Primeiro o flecha, depois a pergunta — a noite nada lhe deve, e ele cobra assim mesmo.",
        stats: [
          { label: "Dano", value: 75 },
          { label: "Sobrevivência", value: 60 },
          { label: "Mobilidade", value: 80 },
          { label: "Alcance", value: 85 }
        ],
        traits: [
          { label: "Estilo", value: "Precisão à distância" },
          { label: "Arsenal", value: "Arco longo e aço lunar" },
          { label: "Juramento", value: "Um tiro, uma dívida" }
        ]
      }
    }
  ],

  /* ==========================================================
     BOOKS — lore volumes shown in the Books section.
     icon: star | beast | moon | flame | compass | banner
     tone: ice | forest | fire | moon (cover colors)
     ========================================================== */
  books: [
    {
      id: "curiosidades",
      tone: "ink",
      cover: "assets/books/curiosidades-cover.jpg",
      en: {
        title: "Moon Valley — Curiosities & Information",
        kind: "Compendium",
        status: "Coming soon",
        text: "Curiosities and information about the Moon Valley universe, gathered by Wendel Francisco Ferreira and Wesley Francisco Ferreira. The first official volume collects behind-the-scenes, mysteries and details of the vale — from Frostvale to the Moongate — for those who want to know every stone of the story before crossing the gate."
      },
      pt: {
        title: "Moon Valley — Curiosidades e Informações",
        kind: "Compêndio",
        status: "Em breve",
        text: "Curiosidades e informações sobre o universo de Moon Valley, reunidas por Wendel Francisco Ferreira e Wesley Francisco Ferreira. O primeiro volume oficial reúne bastidores, mistérios e detalhes do vale — do Frostvale ao Moongate — para quem quer conhecer cada pedra da história antes de cruzar o portão."
      }
    },
    {
      id: "aurora-codex",
      tone: "ice",
      icon: "star",
      en: {
        title: "The Aurora Codex",
        kind: "Lore Codex",
        status: "In development",
        text: "The first volume of the Vale's library gathers everything the frost-scribes could confirm about the eternal light above Frostvale: bell-tones beneath the ice, the drowned cathedral, and the signal that answers once every moon. What sleeps below the frozen lake is not dead — the codex is being copied chapter by chapter as the archives are decrypted."
      },
      pt: {
        title: "O Códice da Aurora",
        kind: "Códice de Lore",
        status: "Em desenvolvimento",
        text: "O primeiro volume da biblioteca do Vale reúne tudo o que os escribas do gelo puderam confirmar sobre a luz eterna acima do Frostvale: toques de sino sob o gelo, a catedral submersa e o sinal que responde uma vez a cada lua. O que dorme sob o lago congelado não está morto — o códice está sendo copiado capítulo a capítulo conforme os arquivos são decifrados."
      }
    },
    {
      id: "bestiary-vale",
      tone: "forest",
      icon: "beast",
      en: {
        title: "Bestiary of the Vale",
        kind: "Field Journal",
        status: "In development",
        text: "Pages of sketches, pawprints and half-true warnings gathered by the rangers of Eldergrove. It opens with the Antlered Watchers — figures that follow travelers in silence for days, judging intent before the forest decides — and continues with the beasts of ash, root and starlight. New entries are added whenever an expedition returns with more than it left with."
      },
      pt: {
        title: "Bestiário do Vale",
        kind: "Diário de Campo",
        status: "Em desenvolvimento",
        text: "Páginas de espegas, pegadas e avisos meio verdadeiros reunidos pelos rangeres da Eldergrove. Abre com os Vigias de Chifres — figuras que seguem viajantes em silêncio por dias, julgando a intenção antes de a floresta decidir — e segue com as bestas de cinza, raiz e luz estelar. Novas entradas surgem quando uma expedição volta com mais do que levou."
      }
    },
    {
      id: "debts-of-the-moon",
      tone: "moon",
      icon: "moon",
      en: {
        title: "Debts of the Moon",
        kind: "Forbidden Folio",
        status: "In development",
        text: "A slim, chain-bound folio on the Moongate and whatever stands on the other side of it. It counts the debts the moon keeps: names written in starlight, crossings made at the silver hour, and the price Vharûn, the Star-Eater, collects for every torch that burns inside his arena. Readers are advised to finish it before the next full moon."
      },
      pt: {
        title: "Dívidas da Lua",
        kind: "Fólio Proibido",
        status: "Em desenvolvimento",
        text: "Um fino fólio preso por correntes sobre o Moongate e o que quer que exista do outro lado. Conta as dívidas que a lua guarda: nomes escritos em luz estelar, travessias feitas na hora prata e o preço que Vharûn, o Devorador de Estrelas, cobra de toda tocha que queima dentro de sua arena. Recomenda-se terminá-lo antes da próxima lua cheia."
      }
    },
    {
      id: "ash-and-oaths",
      tone: "fire",
      icon: "flame",
      en: {
        title: "Ash & Oaths",
        kind: "Forge Chronicle",
        status: "In development",
        text: "The story of the forges that once armed the whole vale, told by the Cinder Wardens who still keep them burning. Heat, ash and old debts: which blades were sworn, which were broken, and why the obsidian spines of Ashenmaw remember every promise hammered into them. The final chapter is waiting for a name to be returned to the fire."
      },
      pt: {
        title: "Cinzas e Juramentos",
        kind: "Crônica da Forja",
        status: "Em desenvolvimento",
        text: "A história das forjas que uniram o vale inteiro, contada pelos Guardiões das Cinzas que ainda as mantêm acesas. Calor, cinzas e dívidas antigas: quais lâminas foram juradas, quais foram quebradas e por que os espinhos de obsidiana da Ashenmaw lembram todo promessa martelada nelas. O capítulo final espera um nome de volta ao fogo."
      }
    }
  ],

  /* ==========================================================
     ARMORY — weapons, armor and relics of the Vale.
     kind: weapon | armor | item
     rarity: common | rare | epic | legendary
     icon: sword | gun | bow | staff | shield | helm | ring
           | potion | star | flame | beast | banner
     ========================================================== */
  armory: [
    {
      id: "bloodgem-chains",
      kind: "weapon",
      rarity: "epic",
      icon: "sword",
      en: {
        name: "Blood-Gem Chains",
        type: "Twin blades & chain",
        text: "Kaelith's own weapons: blades strung on chain links set with blood-gems that drink every wound. The gem warms when the duel nears its end — for her opponent, that warmth is the last thing felt.",
        stats: [ { label: "Damage", value: 88 }, { label: "Speed", value: 84 }, { label: "Reach", value: 65 } ]
      },
      pt: {
        name: "Correntes de Gema Rubra",
        type: "Lâminas gêmeas e corrente",
        text: "As próprias armas de Kaelith: lâminas presas a elos com gemas de sangue que bebem cada ferida. A gema esquenta quando o duelo se aproxima do fim — para o oponente, esse calor é a última coisa sentido.",
        stats: [ { label: "Dano", value: 88 }, { label: "Velocidade", value: 84 }, { label: "Alcance", value: 65 } ]
      }
    },
    {
      id: "oath-rifle",
      kind: "weapon",
      rarity: "legendary",
      icon: "gun",
      en: {
        name: "Oath-Forged Rifle",
        type: "Marksman rifle",
        text: "Forged in the Cinder Wardens' pits and sworn on the day Theryon took his oath. Its barrel records every shot fired in its owner's name — and each name must eventually be collected.",
        stats: [ { label: "Damage", value: 95 }, { label: "Speed", value: 55 }, { label: "Reach", value: 98 } ]
      },
      pt: {
        name: "Rifle Forjada por Juramento",
        type: "Rifle de atirador",
        text: "Forjada nas forjas dos Guardiões das Cinzas e jurada no dia em que Theryon fez seu pacto. Seu cano registra cada disparo feito em nome do dono — e todo nome deve ser cobrado um dia.",
        stats: [ { label: "Dano", value: 95 }, { label: "Velocidade", value: 55 }, { label: "Alcance", value: 98 } ]
      }
    },
    {
      id: "moonsteel-longbow",
      kind: "weapon",
      rarity: "rare",
      icon: "bow",
      en: {
        name: "Moonsteel Longbow",
        type: "Longbow",
        text: "Drawn from moonsteel that only answers at night. Vaelthor's bow makes no sound when the string is released — the arrow simply arrives, as if it were always there.",
        stats: [ { label: "Damage", value: 78 }, { label: "Speed", value: 74 }, { label: "Reach", value: 90 } ]
      },
      pt: {
        name: "Arco Longo de Aço Lunar",
        type: "Arco longo",
        text: "Feito de aço lunar que só responde à noite. O arco de Vaelthor não faz som quando a corda se solta — a flecha simplesmente chega, como se sempre estivesse lá.",
        stats: [ { label: "Dano", value: 78 }, { label: "Velocidade", value: 74 }, { label: "Alcance", value: 90 } ]
      }
    },
    {
      id: "runestone-staff",
      kind: "weapon",
      rarity: "epic",
      icon: "staff",
      en: {
        name: "Runestone Staff",
        type: "Arcane focus",
        text: "A focus carved from a fallen Moongate shard. The runes on Nyfheris's staff rewrite themselves between castings — no two spells ever leave it the same way twice.",
        stats: [ { label: "Power", value: 90 }, { label: "Control", value: 88 }, { label: "Reach", value: 70 } ]
      },
      pt: {
        name: "Cajado de Pedra Rúnica",
        type: "Foco arcano",
        text: "Um foco talhado de um caco caído do Moongate. As runas do cajado de Nyfheris se reescrevem entre conjurações — nenhum feitiço sai dele igual ao anterior.",
        stats: [ { label: "Poder", value: 90 }, { label: "Controle", value: 88 }, { label: "Alcance", value: 70 } ]
      }
    },
    {
      id: "aurora-plate",
      kind: "armor",
      rarity: "legendary",
      icon: "shield",
      en: {
        name: "Aurora Plate",
        type: "Heavy plate",
        text: "Forged under Frostvale's eternal aurora so the light itself is sealed between its layers. The plate has never been breached — it has, however, been returned to the forge three times.",
        stats: [ { label: "Defense", value: 94 }, { label: "Weight", value: 80 }, { label: "Warmth", value: 95 } ]
      },
      pt: {
        name: "Placa da Aurora",
        type: "Armadura pesada",
        text: "Forjada sob a aurora eterna do Frostvale para selar a própria luz entre suas camadas. A armadura nunca foi atravessada — mas já voltou à forja três vezes.",
        stats: [ { label: "Defesa", value: 94 }, { label: "Peso", value: 80 }, { label: "Calor", value: 95 } ]
      }
    },
    {
      id: "warden-helm",
      kind: "armor",
      rarity: "rare",
      icon: "helm",
      en: {
        name: "Antlered Warden Helm",
        type: "Light helm",
        text: "Crowned with the antlers of a Watcher that chose not to attack. Wearers report hearing the Eldergrove's silence through it — a silence that sometimes answers questions.",
        stats: [ { label: "Defense", value: 68 }, { label: "Weight", value: 35 }, { label: "Awareness", value: 85 } ]
      },
      pt: {
        name: "Elmo do Guardião de Chifres",
        type: "Elmo leve",
        text: "Coroado com os chifres de um Vigia que escolheu não atacar. Quem usa relata ouvir o silêncio da Eldergrove através dele — um silêncio que às vezes responde perguntas.",
        stats: [ { label: "Defesa", value: 68 }, { label: "Peso", value: 35 }, { label: "Percepção", value: 85 } ]
      }
    },
    {
      id: "cinder-cloak",
      kind: "armor",
      rarity: "epic",
      icon: "flame",
      en: {
        name: "Cinder Warden Cloak",
        type: "Warden cloak",
        text: "A cloak woven from ember-thread that never goes out. It drinks the heat of any flame it touches — Ashenmaw's forges burn a little colder when one of these passes through.",
        stats: [ { label: "Defense", value: 58 }, { label: "Weight", value: 30 }, { label: "Fireward", value: 92 } ]
      },
      pt: {
        name: "Manto do Guardião de Cinzas",
        type: "Manto de guardião",
        text: "Um manto tecido com fio-brasa que jamais se apaga. Bebe o calor de qualquer chama que toca — as forjas da Ashenmaw queimam um pouco mais frias quando um desses passa por lá.",
        stats: [ { label: "Defesa", value: 58 }, { label: "Peso", value: 30 }, { label: "Antichama", value: 92 } ]
      }
    },
    {
      id: "lunar-signet",
      kind: "item",
      rarity: "epic",
      icon: "ring",
      en: {
        name: "Lunar Signet",
        type: "Trinket ring",
        text: "A silver ring worn by Moongate's gatekeepers. Under a full moon its inner face shows the name of whoever last crossed the gate — and it is never the same name twice.",
        stats: [ { label: "Luck", value: 76 }, { label: "Insight", value: 80 }, { label: "Silence", value: 70 } ]
      },
      pt: {
        name: "Selo Lunar",
        type: "Anel talismã",
        text: "Um anel de prata usado pelos guardiões do Moongate. Sob a lua cheia, sua face interna mostra o nome de quem atravessou o portão por último — e nunca é o mesmo nome duas vezes.",
        stats: [ { label: "Sorte", value: 76 }, { label: "Visão", value: 80 }, { label: "Silêncio", value: 70 } ]
      }
    },
    {
      id: "vale-elixir",
      kind: "item",
      rarity: "common",
      icon: "potion",
      en: {
        name: "Vale Elixir",
        type: "Consumable",
        text: "Brewed from Eldergrove roots and frostwater. Tastes like pine and regret, mends what steel and stubbornness cannot — the first item every expedition packs, and the last one they ever run out of.",
        stats: [ { label: "Restoration", value: 70 }, { label: "Duration", value: 45 }, { label: "Weight", value: 10 } ]
      },
      pt: {
        name: "Elixir do Vale",
        type: "Consumível",
        text: "Bebido de raízes da Eldergrove e água de degelo. Tem gosto de pinheiro e arrependimento, conserta o que o aço e a teimosia não consertam — o primeiro item de toda expedição e o último de que acabam.",
        stats: [ { label: "Restauração", value: 70 }, { label: "Duração", value: 45 }, { label: "Peso", value: 10 } ]
      }
    },
    {
      id: "star-eater-shard",
      kind: "item",
      rarity: "legendary",
      icon: "star",
      en: {
        name: "Star-Eater's Shard",
        type: "Forbidden relic",
        text: "A splinter of the black stone Vharûn wears above his arena. It grows warmer the closer its bearer stands to the Moongate — and cold the moment they turn their back on it.",
        stats: [ { label: "Power", value: 96 }, { label: "Risk", value: 90 }, { label: "Hunger", value: 85 } ]
      },
      pt: {
        name: "Caco do Devorador de Estrelas",
        type: "Relíquia proibida",
        text: "Um caco da pedra negra que Vharûn usa acima de sua arena. Esquenta quanto mais perto o portador fica do Moongate — e esfria no momento em que as costas se voltam para ele.",
        stats: [ { label: "Poder", value: 96 }, { label: "Risco", value: 90 }, { label: "Fome", value: 85 } ]
      }
    }
  ],

  /* ==========================================================
     SHOP — skins, frames, bundles and special items (preview catalog).
     kind: skin | frame | bundle | item
     shop tabs: skins (kind "skin"), frames (kind "frame"),
     specific (everything else)
     sigil: blade | gun | arcane | bow | star | shield | banner
     tone: blood | iron | arcane | moon | gold | ice
     price: number in Moon Shards (whole numbers), or set
            currency: "BRL" to price the item in Reais
            (price: 249.9 + currency: "BRL" -> R$ 249,90)
     tier: collector | legendary | epic | elite (shop grouping)
     ========================================================== */
  shop: [
    {
      id: "skin-dawnlord",
      kind: "skin",
      tier: "legendary",
      tone: "gold",
      sigil: "shield",
      art: "assets/shop/skin-dawnlord.jpg",
      price: 299.9,
      currency: "BRL",
      en: {
        name: "Vaelthor — Dawnlord",
        text: "Sunforged plate crowned with golden horns. He strides across the runes and the light itself steps aside to let him pass."
      },
      pt: {
        name: "Vaelthor — Senhor da Aurora",
        text: "Placas forjadas no sol coroadas por chifres dourados. Ele caminha sobre as runas e a própria luz se afasta para deixá-lo passar."
      }
    },
    {
      id: "skin-voidqueen",
      kind: "skin",
      tier: "legendary",
      tone: "blood",
      sigil: "blade",
      art: "assets/shop/skin-voidqueen.jpg",
      price: 299.9,
      currency: "BRL",
      en: {
        name: "Kaelith — Void Queen",
        text: "Sable hexplate lit from within by a hundred red diamonds. Every step lands inside a storm that has already chosen its queen."
      },
      pt: {
        name: "Kaelith — Rainha do Vazio",
        text: "Armadura obscura iluminada por dentro por cem diamantes vermelhos. Cada passo aterrissa numa tempestade que já escolheu sua rainha."
      }
    },
    {
      id: "skin-runewitch",
      kind: "skin",
      tier: "legendary",
      tone: "arcane",
      sigil: "arcane",
      art: "assets/shop/skin-runewitch.jpg",
      price: 299.9,
      currency: "BRL",
      en: {
        name: "Nyfheris — Runic Witch",
        text: "A hat stitched with charge-sigils and cards that shuffle themselves. The circle beneath her answers before the spell is finished."
      },
      pt: {
        name: "Nyfheris — Bruxa Rúnica",
        text: "Chapéu costurado com sigilos de carga e cartas que se embaralham sozinhas. O círculo sob seus pés responde antes do feitiço terminar."
      }
    },
    {
      id: "skin-theryon-drakefire",      /* art is Theryon's — name fixed (was swapped with Vaelthor) */
      kind: "skin",
      tier: "legendary",
      tone: "gold",
      sigil: "blade",
      art: "assets/shop/skin-drakefire.jpg",
      price: 299.9,
      currency: "BRL",
      en: {
        name: "Theryon — Drakefire",
        text: "Golden scaleplate over an emerald cape, wings still too warm to sit still. Raised by the fire, not by anyone else."
      },
      pt: {
        name: "Theryon — Fogo do Dragão",
        text: "Placas de escamas douradas sobre uma capa esmeralda, asas ainda quentes demais para assentar. Criado pelo fogo, não por mais ninguém."
      }
    },
    {
      id: "skin-rosewitch",
      kind: "skin",
      tier: "epic",
      tone: "blood",
      sigil: "arcane",
      art: "assets/shop/skin-rosewitch.jpg",
      price: 129.9,
      currency: "BRL",
      en: {
        name: "Nyfheris — Rose Witch",
        text: "A hat crowned with roses and moon-gold, petals that never quite fall. Every rose in her garden casts its own spell."
      },
      pt: {
        name: "Nyfheris — Bruxa das Rosas",
        text: "Chapéu coroado por rosas e ouro-lunar, pétalas que nunca caem de todo. Cada rosa do jardim dela conjura o próprio feitiço."
      }
    },
    {
      id: "skin-galactic",
      kind: "skin",
      tier: "epic",
      tone: "ice",
      sigil: "arcane",
      art: "assets/shop/skin-galactic.jpg",
      price: 129.9,
      currency: "BRL",
      en: {
        name: "Nyfheris — Galactic Empress",
        text: "Crystal regalia cut from a spiral of stars, moons drifting along the hem. She raises a hand and the galaxy settles back into place."
      },
      pt: {
        name: "Nyfheris — Imperatriz Galáctica",
        text: "Traje de cristais lapidados numa espiral de estrelas, luas derivando na barra. Ela ergue a mão e a galáxia se acomoda de volta ao lugar."
      }
    },
    {
      id: "frame-noble",
      kind: "frame",
      tier: "elite",
      tone: "gold",
      sigil: "star",
      art: "assets/frames/frame-noble.png",
      price: 29.9,
      currency: "BRL",
      en: {
        name: "Noble Frame",
        text: "Wings of obsidian gold around a cut royal diamond. Worn by those whose names are re-read at every arena opening."
      },
      pt: {
        name: "Moldura Nobre",
        text: "Asas de ouro obsidiana em volta de um diamante régio lapidado. Usada por quem tem o nome relido a cada abertura de arena."
      }
    },
    {
      id: "frame-crane",
      kind: "frame",
      tier: "elite",
      tone: "moon",
      sigil: "star",
      art: "assets/frames/frame-crane.png",
      price: 29.9,
      currency: "BRL",
      en: {
        name: "Celestial Crane Frame",
        text: "A crane gliding between ivory clouds, ringed in old gold. Said to carry one wish per moon — never more."
      },
      pt: {
        name: "Moldura do Grou Celeste",
        text: "Um grou planando entre nuvens de marfim, cercado por ouro antigo. Dizem que carrega um desejo por lua — nunca mais."
      }
    },
    {
      id: "frame-amethyst",
      kind: "frame",
      tier: "elite",
      tone: "arcane",
      sigil: "star",
      art: "assets/frames/frame-amethyst.png",
      price: 29.9,
      currency: "BRL",
      en: {
        name: "Amethyst Frame",
        text: "Silver wings over violet armor, forged in the first quiet after a storm. Keeps the bearer calm — mostly."
      },
      pt: {
        name: "Moldura de Ametista",
        text: "Asas prateadas sobre armadura violeta, forjadas no primeiro silêncio depois de uma tempestade. Mantém a calma de quem usa — quase sempre."
      }
    },
    {
      id: "frame-azure",
      kind: "frame",
      tier: "elite",
      tone: "ice",
      sigil: "star",
      art: "assets/frames/frame-azure.png",
      price: 29.9,
      currency: "BRL",
      en: {
        name: "Starlit Azure Frame",
        text: "Turquoise skies and a golden crescent as its keel — stars settle inside it and refuse to leave."
      },
      pt: {
        name: "Moldura Estelar de Azul",
        text: "Céu turquesa e uma lua crescente dourada de proa — as estrelas se acomodam dentro dela e se recusam a sair."
      }
    },
    {
      id: "frame-lilac",
      kind: "frame",
      tier: "elite",
      tone: "moon",
      sigil: "star",
      art: "assets/frames/frame-lilac.png",
      price: 29.9,
      currency: "BRL",
      en: {
        name: "Lilac Constellation Frame",
        text: "Soft lilac and twin crescents set with amethyst. For profiles that prefer to shine quietly."
      },
      pt: {
        name: "Moldura Constelação Lilás",
        text: "Lilás suave e duas luas crescentes cravejadas de ametista. Para perfis que preferem brilhar em silêncio."
      }
    },
    {
      id: "frame-sakura",
      kind: "frame",
      rewardFrom: "skin-dawnlord",
      tier: "elite",
      tone: "gold",
      sigil: "star",
      art: "assets/frames/frame-sakura.png",
      en: {
        name: "Sakura Frame",
        text: "Rewarded with the Lord of the Dawn. Cherry branches and rose-gold feathers for those who walk in first light."
      },
      pt: {
        name: "Moldura cerejeira",
        text: "Recompensa do Senhor da Aurora. Galhos de cerejeira e penas de rosa-ouro para quem caminha na primeira luz."
      }
    },
    {
      id: "frame-crimson",
      kind: "frame",
      rewardFrom: "skin-voidqueen",
      tier: "elite",
      tone: "blood",
      sigil: "star",
      art: "assets/frames/frame-crimson.png",
      en: {
        name: "Crimson Frame",
        text: "Rewarded with the Void Queen. Black plumage, silver filigree and rubies that shine for the Queen."
      },
      pt: {
        name: "Moldura Carmesim",
        text: "Recompensa da Rainha do Vazio. Plumagem negra, filigrana prateada e rubis que brilham para a rainha."
      }
    },
    {
      id: "frame-phoenix",
      kind: "frame",
      rewardFrom: "skin-theryon-drakefire",
      tier: "elite",
      tone: "gold",
      sigil: "star",
      art: "assets/frames/frame-phoenix.png",
      en: {
        name: "Phoenix Frame",
        text: "Rewarded with Drakefire. A blaze of rose-gold wings that never burns down — it simply returns."
      },
      pt: {
        name: "Moldura Fênix",
        text: "Recompensa do Fogo do Dragão. Uma fogueira de asas rosa-ouro que nunca se apaga — apenas retorna."
      }
    },
    {
      id: "frame-butterfly",
      kind: "frame",
      rewardFrom: "skin-runewitch",
      tier: "elite",
      tone: "arcane",
      sigil: "star",
      art: "assets/frames/frame-butterfly.png",
      en: {
        name: "Amethyst Butterfly Frame",
        text: "Rewarded with the Runic Witch. Amethyst butterflies drift wherever her cards land."
      },
      pt: {
        name: "Moldura Borboleta de Ametista",
        text: "Recompensa da Bruxa Rúnica. Borboletas de ametista pousam onde suas cartas caem."
      }
    },
    {
      id: "frame-crystal",
      kind: "frame",
      rewardFrom: "bundle-founders",
      tier: "elite",
      tone: "ice",
      sigil: "star",
      art: "assets/frames/frame-crystal.png",
      en: {
        name: "Starlit Crystal Frame",
        text: "Rewarded with the Founder's Cache. Starlight ribbons and shattered sky, cut for the first oath-sworn."
      },
      pt: {
        name: "Moldura Cristal Estelar",
        text: "Recompensa do Cofre do Fundador. Fitas de luz estelar e um céu estilhaçado, lapidados para os primeiros jurados."
      }
    },
    {
      id: "bundle-founders",
      kind: "bundle",
      tier: "collector",
      tone: "gold",
      sigil: "star",
      price: 2900,
      en: {
        name: "Founder's Cache",
        text: "A bundle for the first oath-sworn: one skin of choice, the Vale Elixir pack, a profile emblem, and your name carved into the first Moongate ledger."
      },
      pt: {
        name: "Cofre do Fundador",
        text: "Um pacote para os primeiros jurados: uma skin à escolha, o pack Elixir do Vale, um emblema de perfil e seu nome gravado no primeiro livro do Moongate."
      }
    },
    {
      id: "mount-frostvale",
      kind: "item",
      tier: "elite",
      tone: "ice",
      sigil: "banner",
      price: 1500,
      en: {
        name: "Frostvale Charger",
        text: "A glacier-maned warhorse raised beneath the aurora. Leaves no hoofprints in the snow — Frostvale's riders have never explained why."
      },
      pt: {
        name: "Corcel do Frostvale",
        text: "Um cavalo de guerra de crina glaciar criado sob a aurora. Não deixa pegadas na neve — os cavaleiros do Frostvale nunca explicaram por quê."
      }
    }
  ],

  /* ---------- DROPLIST (preview of loot tables) ----------
     One entry per guardian/dungeon. `drops[].rarity` uses
     legendary | epic | elite | rare | common; `chance` is a
     display string ("0.4%") — rendered with a comma in PT. */
  droplist: [
    /* Sources: kind "boss" (guardians) and "mob" (regular enemies).
       Drops are the real armory gear + consumables — farm the Vale. */
    {
      id: "drop-ashenmaw",
      kind: "boss",
      tone: "blood",
      en: {
        region: "Ashenmaw",
        name: "The Ashen Maw",
        text: "A furnace-beast that devoured the first caravan. The heat of its hoard never faded — neither did the grudge."
      },
      pt: {
        region: "Ashenmaw",
        name: "A Boca de Cinzas",
        text: "Um monstro-fornalha que devorou a primeira caravana. O calor do seu tesouro nunca esfriou — nem o rancor."
      },
      drops: [
        { rarity: "legendary", chance: "0.4%", en: { name: "Oath-Forged Rifle" }, pt: { name: "Rifle Forjada por Juramento" } },
        { rarity: "epic", chance: "2.5%", en: { name: "Blood-Gem Chains" }, pt: { name: "Correntes de Gema Rubra" } },
        { rarity: "epic", chance: "5%", en: { name: "Cinder Warden Cloak" }, pt: { name: "Manto do Guardião de Cinzas" } },
        { rarity: "common", chance: "40%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "100%", en: { name: "Moon Shards ×50" }, pt: { name: "Fragmentos de Lua ×50" } }
      ]
    },
    {
      id: "drop-frostvale",
      kind: "boss",
      tone: "ice",
      en: {
        region: "Frostvale",
        name: "The Frostvale Warden",
        text: "Blizzard paths circle the glacier heart. The riders who return speak little — and never about the cold."
      },
      pt: {
        region: "Frostvale",
        name: "Guardião do Frostvale",
        text: "Trilhas de nevasca cercam o coração da glaciar. Os cavaleiros que voltam falam pouco — e nunca sobre o frio."
      },
      drops: [
        { rarity: "legendary", chance: "0.5%", en: { name: "Aurora Plate" }, pt: { name: "Placa da Aurora" } },
        { rarity: "elite", chance: "3%", en: { name: "Frostvale Charger" }, pt: { name: "Corcel do Frostvale" } },
        { rarity: "rare", chance: "15%", en: { name: "Moonsteel Longbow" }, pt: { name: "Arco Longo de Aço Lunar" } },
        { rarity: "common", chance: "40%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "100%", en: { name: "Moon Shards ×50" }, pt: { name: "Fragmentos de Lua ×50" } }
      ]
    },
    {
      id: "drop-moongate",
      kind: "boss",
      tone: "moon",
      en: {
        region: "Moongate",
        name: "The Moongate Revenant",
        text: "The gate opens only when both moons align. Whatever the Revenant guards, it guarded a long time ago."
      },
      pt: {
        region: "Moongate",
        name: "Revenante do Moongate",
        text: "O portão só se abre quando as duas luas se alinham. O que o Revenante guarda, ele guarda há muito tempo."
      },
      drops: [
        { rarity: "legendary", chance: "0.8%", en: { name: "Star-Eater's Shard" }, pt: { name: "Caco do Devorador de Estrelas" } },
        { rarity: "epic", chance: "4%", en: { name: "Lunar Signet" }, pt: { name: "Selo Lunar" } },
        { rarity: "rare", chance: "14%", en: { name: "Moonsteel Longbow" }, pt: { name: "Arco Longo de Aço Lunar" } },
        { rarity: "common", chance: "38%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "100%", en: { name: "Moon Shards ×50" }, pt: { name: "Fragmentos de Lua ×50" } }
      ]
    },
    {
      id: "drop-eldergrove",
      kind: "boss",
      tone: "arcane",
      en: {
        region: "Eldergrove",
        name: "The Eldergrove Ancient",
        text: "The oldest trees remember the first night. Their roots guard gear from every oath ever broken beneath them."
      },
      pt: {
        region: "Eldergrove",
        name: "Ancião do Eldergrove",
        text: "As árvores mais velhas lembram da primeira noite. Suas raízes guardam equipamentos de todo juramento quebrado sob elas."
      },
      drops: [
        { rarity: "epic", chance: "1.5%", en: { name: "Runestone Staff" }, pt: { name: "Cajado de Pedra Rúnica" } },
        { rarity: "epic", chance: "5%", en: { name: "Blood-Gem Chains" }, pt: { name: "Correntes de Gema Rubra" } },
        { rarity: "rare", chance: "13%", en: { name: "Antlered Warden Helm" }, pt: { name: "Elmo do Guardião de Chifres" } },
        { rarity: "common", chance: "42%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "100%", en: { name: "Moon Shards ×50" }, pt: { name: "Fragmentos de Lua ×50" } }
      ]
    },
    /* --- regular mobs --- */
    {
      id: "mob-cinder-imps",
      kind: "mob",
      tone: "blood",
      en: {
        region: "Ashenmaw",
        name: "Cinder Imps",
        text: "Small furnace-imps that strip caravans bare in packs. Their hoard is tiny — but a Warden's cloak has ended up in it more than once."
      },
      pt: {
        region: "Ashenmaw",
        name: "Diabinhos de Cinzas",
        text: "Pequenos diabos-fornalha que descarregam caravanas em bando. Seu saque é miúdo — mas o manto de um Guardião já parou nele mais de uma vez."
      },
      drops: [
        { rarity: "epic", chance: "0.7%", en: { name: "Cinder Warden Cloak" }, pt: { name: "Manto do Guardião de Cinzas" } },
        { rarity: "common", chance: "30%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "70%", en: { name: "Moon Shards ×20" }, pt: { name: "Fragmentos de Lua ×20" } }
      ]
    },
    {
      id: "mob-frost-wraiths",
      kind: "mob",
      tone: "ice",
      en: {
        region: "Frostvale",
        name: "Frost Wraiths",
        text: "Cold hollows that drain the warmth from riders' bones. The riders leave offerings of cloth and elixir — the wraiths take both."
      },
      pt: {
        region: "Frostvale",
        name: "Espectros de Gelo",
        text: "Vazios frios que drenam o calor dos ossos dos cavaleiros. Os cavaleiros deixam oferendas de tecido e elixir — os espectros levam as duas."
      },
      drops: [
        { rarity: "rare", chance: "1.5%", en: { name: "Antlered Warden Helm" }, pt: { name: "Elmo do Guardião de Chifres" } },
        { rarity: "common", chance: "28%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "65%", en: { name: "Moon Shards ×20" }, pt: { name: "Fragmentos de Lua ×20" } }
      ]
    },
    {
      id: "mob-moongate-sentinels",
      kind: "mob",
      tone: "moon",
      en: {
        region: "Moongate",
        name: "Moongate Sentinels",
        text: "Gatekeepers who never left their post. They judge travelers by what they carry — the worthy pass, the rest drop their gear."
      },
      pt: {
        region: "Moongate",
        name: "Sentinelas do Moongate",
        text: "Guardiões que nunca deixaram o posto. Julgam os viajantes pelo que carregam — os dignos passam, o resto solta o equipamento."
      },
      drops: [
        { rarity: "epic", chance: "0.9%", en: { name: "Lunar Signet" }, pt: { name: "Selo Lunar" } },
        { rarity: "common", chance: "32%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "72%", en: { name: "Moon Shards ×20" }, pt: { name: "Fragmentos de Lua ×20" } }
      ]
    },
    {
      id: "mob-groveroot-spriggans",
      kind: "mob",
      tone: "arcane",
      en: {
        region: "Eldergrove",
        name: "Groveroot Spriggans",
        text: "Root-walkers older than the grove's own name. Their circles drain the magic from steel and return it to the earth."
      },
      pt: {
        region: "Eldergrove",
        name: "Spriggans Raizverde",
        text: "Caminhantes-raiz mais velhos que a floresta com o próprio nome. Seus círculos drenam a magia do aço e a devolvem à terra."
      },
      drops: [
        { rarity: "epic", chance: "0.5%", en: { name: "Runestone Staff" }, pt: { name: "Cajado de Pedra Rúnica" } },
        { rarity: "common", chance: "30%", en: { name: "Vale Elixir ×3" }, pt: { name: "Elixir do Vale ×3" } },
        { rarity: "common", chance: "68%", en: { name: "Moon Shards ×20" }, pt: { name: "Fragmentos de Lua ×20" } }
      ]
    }
  ],

  /* ---------- EQUIPMENT DROP LIST ----------
     210 exclusive weapon names (Japanese only — lore names, no translation).
     supreme: the 7 featured weapons with art + flavor; chance <= 0.1%. */
  equipment: {
    categories: [
      {
        key: "katana", kanji: "刀", en: "Katanas", pt: "Katanas",
        names: ["KUROTSUME", "AKATSURYU", "YAMIKAZE", "TSUKIKIBA", "RAIKOKU", "SHIROKAGE", "ONITEN", "KAGEGIRI", "GESSEN", "KURONAMI", "HOSHIKIRI", "RYUGEKI", "MUGENKIBA", "AKUMAKIRI", "RAISHINKEN", "YORUTSUKI", "KOKUENRYU", "TENSHIKAGE", "SHURAIBA", "ZANKOKU", "RYUMEIGETSU", "KURONOTSURUGI", "ENGETSUKI", "KAMIKIBA", "MUGENKIRI", "RAITENRYU", "YAMITSURUGI", "SHINRAKAGE", "OUKARYU", "TENKURONAGI"]
      },
      {
        key: "sword", kanji: "剣", en: "Swords", pt: "Espadas",
        names: ["KENKIBA", "HOMURAGIRI", "RAIKOKUTEN", "SHINKENRA", "GURENRYU", "KAGEHOMURA", "TENRAIKEN", "ONIMON", "KOKURYUGEN", "HAKURYUKEN", "ENMAKIBA", "SORAKIRI", "JIGOKUREN", "KAMINARIHA", "KURAGETSU", "SEIRYUKEN", "RYUMEIKEN", "SHURAOTSU", "TENMUSOU", "GOKURYUKEN", "KISHINKIBA", "AKURYUGA", "HOSHITEN", "KUROHOMURA", "SENGEKIRIN", "RAIMEIKOKU", "AMENOKIBA", "MUKUROKEN", "SHINENRYU", "KAMIYORIKEN"]
      },
      {
        key: "shield", kanji: "盾", en: "Shields", pt: "Escudos",
        names: ["KUROGANE", "ONIMAMORI", "TENGOKUHA", "RAIKABE", "KAGEGAKI", "SHIROGANE", "RYUTATE", "KAMINOKABE", "YAMIMAMORI", "TSUKITATE", "KOKURYUTATE", "TENKOMORI", "ONIKABE", "RAISHIELD", "KURONOKI", "HOSHITATE", "SHINKABE", "AKAMAMORI", "MUGENTATE", "SEITENKABE", "RYUGOKU", "KAMIKAGAMI", "YORUTATE", "TENRYUGUARD", "GOKUHEKI", "KUROSHINKAI", "AMATSUTATE", "SHURAHEKI", "BANSEIKABE", "FUTENNOOKI"]
      },
      {
        key: "hammer", kanji: "大槌", en: "Hammers", pt: "Martelos",
        names: ["KUROTSUCHI", "ONIKAZAN", "RAISHOGUN", "GOKUHA", "TENGENZAN", "KAMITSUCHI", "RYUGORAI", "AKUMATSUI", "KOKUHEKI", "HOMURATSUI", "JIGOKUZAN", "TENKAIHA", "RAIMEITSUI", "ONIKOKU", "GURENTSUCHI", "RYUSEKAI", "SHINRAKU", "KURONOTSUI", "HAKAIKOKU", "KISHINZAN", "GOKUTENRA", "TENMAKOKU", "RYUJISHIN", "BAKURETSU", "MUGENDAI", "KAMINARIJIN", "SHURAHAKAI", "AMENOKAMUI", "DAITENGOKU", "KONSHINHAKAI"]
      },
      {
        key: "axe", kanji: "斧", en: "Axes", pt: "Machados",
        names: ["KUROONO", "ONIKIBA", "RAISEN", "YAMITSUME", "RYUKOKU", "AKATSUKIBA", "KAGEONO", "HOMURAKIBA", "TENMAONO", "KOKURYUHA", "JIGOKUKIBA", "RAIONI", "SHURAONO", "KURONAGI", "GURENTSUME", "RYUKAMEN", "KAMITSUME", "YORUONO", "HAKURYUKIBA", "MUGENONO", "ONIKAMUI", "RAIGOKU", "TENKIBAHA", "KOKUENONO", "SHINRAKIBA", "AMATSUONO", "KISHINRAI", "HAKAIKIBA", "GOKURYUONO", "BANSEIKOKU"]
      },
      {
        key: "dagger", kanji: "短刀", en: "Daggers", pt: "Adagas",
        names: ["KUROTSUKI", "ONIKIRIHA", "YAMIKIBA", "RAISHIME", "KAGEKIBA", "AKUMATSUME", "TSUKIKIRI", "SHINOBIKAGE", "KOKUROHA", "YORUTSUME", "ONIMUSUME", "KURONOKIBA", "RAIKASUMI", "MUGENKAGE", "SHURATSUME", "HOSHIKIBA", "JIGOKUGIRI", "AKAKAGE", "KAMINOKIRI", "KUROHOTARU", "MURASAKIKIBA", "RYUKAGE", "ENMAKIRI", "SHINKUROTSUME", "TENSHIKIRI", "KOKUENKIBA", "YAMIMUSHA", "ONIKASUMI", "MUGENSHIN", "KURONAGARE"]
      },
      {
        key: "kunai", kanji: "苦無", en: "Kunais", pt: "Kunais",
        names: ["KUROHARI", "ONITOBI", "RAISENKO", "YAMIHARI", "KAZEKIBA", "TSUKITOBI", "KAGEBARI", "RYUTSUBA", "KOKUENBI", "SHINOBIKIBA", "AKATSUKIHARI", "ONIKASAI", "RAIGENKO", "YORUTOBI", "KURONAMIHA", "HOSHIBARI", "KAMIKAZARI", "MUGENHARI", "SHURAKIBA", "TENKASEN", "KOKURYUTOBI", "JIGOKUHARI", "KAGEHOTARU", "RAIMEIKIBA", "AMENOHARI", "ONIMIKAZE", "SHINKAGEBI", "KURONOTSUBASA", "MUGENRAI", "YOMIKURAI"]
      },
      {
        key: "ring", kanji: "環", en: "Rings", pt: "Anéis",
        /* each ring is a distinct drop with its own art */
        items: [
          { name: "SEIRYUNOBU",    art: "assets/rings/ring-01.png" },
          { name: "OUKANHOJU",     art: "assets/rings/ring-02.png" },
          { name: "MURASAKITANE",  art: "assets/rings/ring-03.png" },
          { name: "AKUMAKOKUE",    art: "assets/rings/ring-04.png" },
          { name: "TSURUGINOWA",   art: "assets/rings/ring-05.png" },
          { name: "KODAMANZU",     art: "assets/rings/ring-06.png" },
          { name: "HOSHIYAMITSU",  art: "assets/rings/ring-07.png" },
          { name: "AOKAIGANE",     art: "assets/rings/ring-08.png" },
          { name: "ENMASHINTAI",   art: "assets/rings/ring-09.png" },
          { name: "NIKKOURIN",     art: "assets/rings/ring-10.png" },
          { name: "HYOUTSEKKI",    art: "assets/rings/ring-11.png" },
          { name: "RYUKOTSUYU",    art: "assets/rings/ring-12.png" },
          { name: "KINSHINJU",     art: "assets/rings/ring-13.png" },
          { name: "SUISHOKAIWA",   art: "assets/rings/ring-14.png" },
          { name: "KOKURYUGANE",   art: "assets/rings/ring-15.png" },
          { name: "SEIKAORU",      art: "assets/rings/ring-16.png" },
          { name: "KOUZETSUKI",    art: "assets/rings/ring-17.png" },
          { name: "OKAMINOKOE",    art: "assets/rings/ring-18.png" },
          { name: "RENGESHINJU",   art: "assets/rings/ring-19.png" },
          { name: "KODAMAKURIN",   art: "assets/rings/ring-20.png" },
          { name: "SEKISHOKUI",    art: "assets/rings/ring-21.png" },
          { name: "TENKUTSUBASA",  art: "assets/rings/ring-22.png" },
          { name: "GOSURINSUI",    art: "assets/rings/ring-23.png" },
          { name: "OUKAHOSHI",     art: "assets/rings/ring-24.png" },
          { name: "JUKAINOWA",     art: "assets/rings/ring-25.png" },
          { name: "HAKUSEKKI",     art: "assets/rings/ring-26.png" },
          { name: "YAMIKANOME",    art: "assets/rings/ring-27.png" },
          { name: "RINJIKANE",     art: "assets/rings/ring-28.png" },
          { name: "TSUKIMEKAKU",   art: "assets/rings/ring-29.png" },
          { name: "HIRUNOTSUBASA", art: "assets/rings/ring-30.png" },
          { name: "SEKITOGETSU",   art: "assets/rings/ring-31.png" },
          { name: "OUKAKINRI",     art: "assets/rings/ring-32.png" },
          { name: "HAGOROSUI",     art: "assets/rings/ring-33.png" },
          { name: "SEIKAMEHOSHI",  art: "assets/rings/ring-34.png" },
          { name: "JUUJIKUSU",     art: "assets/rings/ring-35.png" },
          { name: "TSUMEKURATSU",  art: "assets/rings/ring-36.png" },
          { name: "WAKUSEIKIN",    art: "assets/rings/ring-37.png" },
          { name: "KAZANORU",      art: "assets/rings/ring-38.png" },
          { name: "SHIRAHOBARI",   art: "assets/rings/ring-39.png" },
          { name: "TSUYUKINOKI",   art: "assets/rings/ring-40.png" }
        ]
      },
      {
        key: "necklace", kanji: "頸飾",
        en: "Necklaces", pt: "Colares",
        /* each amulet is a distinct drop with its own art */
        items: [
          { name: "SEIUNBOSHI",      art: "assets/necklaces/necklace-01.png" },
          { name: "YORUNOKUSARI",    art: "assets/necklaces/necklace-02.png" },
          { name: "AKUKETSUTAMA",    art: "assets/necklaces/necklace-03.png" },
          { name: "HIGANOTAMA",      art: "assets/necklaces/necklace-04.png" },
          { name: "HYOURYUTAMA",     art: "assets/necklaces/necklace-05.png" },
          { name: "OROCHIKUSABI",    art: "assets/necklaces/necklace-06.png" },
          { name: "KINKETSUHANA",    art: "assets/necklaces/necklace-07.png" },
          { name: "MORINOSHINJU",    art: "assets/necklaces/necklace-08.png" },
          { name: "SEIHOUOUTAMA",    art: "assets/necklaces/necklace-09.png" },
          { name: "KAZANKUSARI",     art: "assets/necklaces/necklace-10.png" },
          { name: "ENSEIBOSHI",      art: "assets/necklaces/necklace-11.png" },
          { name: "KUROBARAKETSU",   art: "assets/necklaces/necklace-12.png" },
          { name: "ROUHAKUTAMA",     art: "assets/necklaces/necklace-13.png" },
          { name: "SHUUENTAMA",      art: "assets/necklaces/necklace-14.png" },
          { name: "YUKIONKUSARI",    art: "assets/necklaces/necklace-15.png" },
          { name: "KINTSUBAKUSARI",  art: "assets/necklaces/necklace-16.png" },
          { name: "MEIGETSUKUSARI",  art: "assets/necklaces/necklace-17.png" },
          { name: "SHINRIKUSABI",    art: "assets/necklaces/necklace-18.png" },
          { name: "UZUNOYAMI",       art: "assets/necklaces/necklace-19.png" },
          { name: "RIMENHAKUSUI",    art: "assets/necklaces/necklace-20.png" },
          { name: "RYUUGANOKUSARI",  art: "assets/necklaces/necklace-21.png" },
          { name: "HOSHIYOJIN",      art: "assets/necklaces/necklace-22.png" },
          { name: "SHIKKOKUTAMA",    art: "assets/necklaces/necklace-23.png" },
          { name: "HAKUNOHANE",      art: "assets/necklaces/necklace-24.png" },
          { name: "BENIHANETSURU",   art: "assets/necklaces/necklace-25.png" },
          { name: "MIDORISEISUI",    art: "assets/necklaces/necklace-26.png" },
          { name: "GESSHOKUSARI",    art: "assets/necklaces/necklace-27.png" },
          { name: "YATAKUSARI",      art: "assets/necklaces/necklace-28.png" },
          { name: "HYOKAKUSARI",     art: "assets/necklaces/necklace-29.png" },
          { name: "GINGAKUSUI",      art: "assets/necklaces/necklace-30.png" },
          { name: "KUROKOUMORI",     art: "assets/necklaces/necklace-31.png" },
          { name: "SUINAGARETAMA",   art: "assets/necklaces/necklace-32.png" },
          { name: "AOITSUBASA",      art: "assets/necklaces/necklace-33.png" },
          { name: "KOKUKETSUBOSHI",  art: "assets/necklaces/necklace-34.png" }
        ]
      }
    ],
    supreme: [
      { name: "TENKURONAGI", cat: "katana", art: "", chance: "0.1%",
        en: { title: "Legendary Katana", text: "A blade that seems to absorb the sound around it." },
        pt: { title: "Katana Lendária", text: "Uma lâmina que parece absorver o som ao redor." } },
      { name: "KAMIYORIKEN", cat: "sword", art: "assets/droplist/weapon-kamiyoriken.jpg", chance: "0.05%",
        en: { title: "Supreme Sword", text: "A relic forged to challenge divine entities." },
        pt: { title: "Espada Suprema", text: "Uma relíquia criada para desafiar entidades divinas." } },
      { name: "FUTENNOOKI", cat: "shield", art: "assets/droplist/weapon-futenooki.jpg", chance: "0.1%",
        en: { title: "Legendary Shield", text: "An ancient defense able to withstand devastating attacks." },
        pt: { title: "Escudo Lendário", text: "Uma defesa ancestral capaz de resistir a ataques devastadores." } },
      { name: "KONSHINHAKAI", cat: "hammer", art: "assets/droplist/weapon-konshinhakai.jpg", chance: "0.05%",
        en: { title: "Supreme Hammer", text: "A hammer whose force threatens both flesh and spirit." },
        pt: { title: "Martelo Supremo", text: "Um martelo cuja força ameaça tanto a carne quanto o espírito." } },
      { name: "BANSEIKOKU", cat: "axe", art: "assets/droplist/weapon-banseikoku.jpg", chance: "0.1%",
        en: { title: "Legendary Axe", text: "A weapon tied to the fall of entire civilizations." },
        pt: { title: "Machado Lendário", text: "Uma arma associada à queda de civilizações inteiras." } },
      { name: "KURONAGARE", cat: "dagger", art: "assets/droplist/weapon-kuronagare.jpg", chance: "0.1%",
        en: { title: "Legendary Dagger", text: "A silent weapon that leaves a trail of shadows." },
        pt: { title: "Adaga Lendária", text: "Uma arma silenciosa que deixa um rastro de sombras." } },
      { name: "YOMIKURAI", cat: "kunai", art: "assets/droplist/weapon-yomikurai.jpg", chance: "0.05%",
        en: { title: "Supreme Kunai", text: "A legendary projectile linked to the depths of the world." },
        pt: { title: "Kunai Suprema", text: "Um projétil lendário ligado às profundezas do mundo." } }
    ]
  },

  /* ---------- ROADMAP (dev plans, preview) ----------
     Statuses: idea | planned | development | launch
     Categories: gameplay | world | classes | systems | community */
  roadmap: [
    {
      id: "plan-guilds",
      status: "planned",
      category: "community",
      en: {
        title: "Guilds & Guild Wars",
        text: "Create guilds, raise your banner and fight for territory in weekly guild wars. Guild halls will be a shared home base for your members."
      },
      pt: {
        title: "Guildas e Guerras de Guildas",
        text: "Crie guildas, hasteie seu estandarte e lute por território em guerras semanais. Salões de guilda serão uma casa compartilhada para os membros."
      }
    },
    {
      id: "plan-fifth-hero",
      status: "idea",
      category: "classes",
      en: {
        title: "The Fifth Hero",
        text: "A fifth class is under thought — every hero proposal that fits the lore of Moon Valley is welcome at the dev desk."
      },
      pt: {
        title: "O Quinto Herói",
        text: "Uma quinta classe está em análise — toda proposta de herói que encaixe no lore de Moon Valley é bem-vinda na mesa dos devs."
      }
    },
    {
      id: "plan-mounts",
      status: "planned",
      category: "gameplay",
      en: {
        title: "Mount System",
        text: "Tame the creatures of the Vale — from frost elks to the Frostvale Charger itself — and ride across the regions."
      },
      pt: {
        title: "Sistema de Montarias",
        text: "Domestique as criaturas do Vale — dos alces de gelo ao próprio Corcel do Frostvale — e atravesse as regiões montado."
      }
    },
    {
      id: "plan-raids",
      status: "planned",
      category: "gameplay",
      en: {
        title: "Co-op Raids",
        text: "Five-player raids against world bosses far bigger than the Ashen Maw — with loot tables of their own."
      },
      pt: {
        title: "Raids Cooperativas",
        text: "Raids de cinco jogadores contra chefes mundiais muito maiores que a Boca de Cinzas — com tabelas de loot próprias."
      }
    },
    {
      id: "plan-housing",
      status: "idea",
      category: "systems",
      en: {
        title: "Player Housing",
        text: "A corner of Moon Valley to call home — decorated with the trophies of every drop you've farmed."
      },
      pt: {
        title: "Casas dos Jogadores",
        text: "Um canto de Moon Valley para chamar de seu — decorado com as troféus de cada drop que você farmou."
      }
    },
    {
      id: "plan-sunkencoast",
      status: "idea",
      category: "world",
      en: {
        title: "The Sunken Coast",
        text: "A fourth region is being drawn: a drowned coast where the tide keeps something that should stay asleep."
      },
      pt: {
        title: "A Costa Afogada",
        text: "Uma quarta região está sendo desenhada: uma costa afogada onde a maré guarda algo que deveria continuar dormindo."
      }
    },
    {
      id: "plan-seasons",
      status: "idea",
      category: "systems",
      en: {
        title: "Season System",
        text: "Seasons with modifiers, ranked resets and exclusive rewards — the ladder never sleeps."
      },
      pt: {
        title: "Sistema de Temporadas",
        text: "Temporadas com modificadores, reset de ranking e recompensas exclusivas — a escada nunca dorme."
      }
    },
    {
      id: "plan-customization",
      status: "development",
      category: "systems",
      en: {
        title: "Character Customization",
        text: "Scars, tattoos, hair and faces — tools for the barbershop of Moon Valley are being carved right now."
      },
      pt: {
        title: "Customização de Personagem",
        text: "Cicatrizes, tatuagens, cabelos e rostos — as ferramentas da barbearia de Moon Valley estão sendo esculpidas agora."
      }
    },
    {
      id: "plan-launch-client",
      status: "development",
      category: "gameplay",
      en: {
        title: "The Launch Client",
        text: "The client itself — combat, worlds, classes and loot — is the biggest build on the desk today."
      },
      pt: {
        title: "O Cliente de Lançamento",
        text: "O próprio cliente — combate, mundos, classes e loot — é o maior build na mesa hoje."
      }
    },
    {
      id: "plan-beta",
      status: "launch",
      category: "systems",
      en: {
        title: "Open Beta",
        text: "A public beta before launch, to break things the right way. The date will be announced here and on our socials first."
      },
      pt: {
        title: "Beta Aberta",
        text: "Uma beta pública antes do lançamento, para quebrar tudo do jeito certo. A data será anunciada aqui e nas nossas redes primeiro."
      }
    },
    {
      id: "plan-cloud",
      status: "launch",
      category: "systems",
      en: {
        title: "Cloud Saves",
        text: "Cross-device saves with the account system at launch — your hero follows you."
      },
      pt: {
        title: "Saves na Nuvem",
        text: "Saves entre dispositivos com o sistema de contas no lançamento — seu herói vai com você."
      }
    },
    {
      id: "plan-companion",
      status: "planned",
      category: "systems",
      en: {
        title: "Companion App",
        text: "Check your profile, collection and the market from your phone. The game itself stays PC-first."
      },
      pt: {
        title: "App Companheiro",
        text: "Veja seu perfil, coleção e mercado pelo celular. O jogo em si continua PC-first."
      }
    }
  ],

  /* ---------- RANKING (sample ladders, preview) ----------
     Three boards: player kills, mob kills and ranked arena.
     Entries: { name (gamertag), classId, value } — arena also
     carries wins/losses shown as the record. */
  ranking: {
    kills: [
      { name: "NyxRavenna", classId: "kaelith", value: 1842 },
      { name: "Moonbitten", classId: "nyfheris", value: 1731 },
      { name: "Kaeldros", classId: "theryon", value: 1688 },
      { name: "VesperHex", classId: "vaelthor", value: 1502 },
      { name: "GrimHollow", classId: "kaelith", value: 1449 },
      { name: "Solvane", classId: "nyfheris", value: 1310 },
      { name: "Ashcroft", classId: "theryon", value: 1204 },
      { name: "Thornwake", classId: "vaelthor", value: 1157 },
      { name: "Rivenmoor", classId: "kaelith", value: 1088 },
      { name: "Eclipsia", classId: "nyfheris", value: 995 }
    ],
    mobs: [
      { name: "GrimHollow", classId: "kaelith", value: 52103 },
      { name: "Kaeldros", classId: "theryon", value: 49887 },
      { name: "Solvane", classId: "nyfheris", value: 46320 },
      { name: "NyxRavenna", classId: "kaelith", value: 44158 },
      { name: "Thornwake", classId: "vaelthor", value: 41002 },
      { name: "Moonbitten", classId: "nyfheris", value: 38774 },
      { name: "Ashcroft", classId: "theryon", value: 36551 },
      { name: "VesperHex", classId: "vaelthor", value: 33209 },
      { name: "Eclipsia", classId: "nyfheris", value: 30884 },
      { name: "Rivenmoor", classId: "kaelith", value: 28773 }
    ],
    arena: [
      { name: "NyxRavenna", classId: "kaelith", value: 2410, wins: 128, losses: 41 },
      { name: "Moonbitten", classId: "nyfheris", value: 2355, wins: 119, losses: 44 },
      { name: "VesperHex", classId: "vaelthor", value: 2290, wins: 110, losses: 48 },
      { name: "Kaeldros", classId: "theryon", value: 2244, wins: 104, losses: 49 },
      { name: "GrimHollow", classId: "kaelith", value: 2187, wins: 99, losses: 52 },
      { name: "Solvane", classId: "nyfheris", value: 2131, wins: 92, losses: 55 },
      { name: "Thornwake", classId: "vaelthor", value: 2098, wins: 88, losses: 57 },
      { name: "Ashcroft", classId: "theryon", value: 2040, wins: 81, losses: 60 },
      { name: "Rivenmoor", classId: "kaelith", value: 1995, wins: 76, losses: 62 },
      { name: "Eclipsia", classId: "nyfheris", value: 1933, wins: 70, losses: 66 }
    ],
    /* Ranked ladder (pre-season preview): tiers ordered from the
       lowest to the highest. `rank` is the displayed rank number,
       `min`/`max` are moon (luas) thresholds, `max: null` means the
       tier is open-ended. Rewards are localized. */
    ranked: {
      season: {
        en: { name: "Season I — The Moon Ladder", window: "1 Nov 2026 — 1 Feb 2027" },
        pt: { name: "Temporada I — A Escada das Luas", window: "1 nov 2026 — 1 fev 2027" }
      },
      placementMatches: 5,
      tiers: [
        {
          key: "proscrito", rank: 1, min: 0, max: 100, art: "assets/ranks/proscrito.png",
          en: { reward: "Outlaw banner and the exile's sigil." },
          pt: { reward: "Estandarte de Proscrito e o sigilo do exilado." }
        },
        {
          key: "ascendente", rank: 2, min: 100, max: 200, art: "assets/ranks/ascendente.png",
          en: { reward: "Ascendant banner and a profile frame." },
          pt: { reward: "Estandarte de Ascendente e uma moldura de perfil." }
        },
        {
          key: "conquistador", rank: 3, min: 200, max: 300, art: "assets/ranks/conquistador.png",
          en: { reward: "Conqueror banner and an arena emote." },
          pt: { reward: "Estandarte de Conquistador e um gesto de arena." }
        },
        {
          key: "soberano", rank: 4, min: 300, max: 400, art: "assets/ranks/soberano.png",
          en: { reward: "Sovereign banner and a weapon glow." },
          pt: { reward: "Estandarte de Soberano e um brilho de arma." }
        },
        {
          key: "invicto", rank: 5, min: 400, max: 500, art: "assets/ranks/invicto.png",
          en: { reward: "Undefeated banner and an exclusive skin shard." },
          pt: { reward: "Estandarte de Invicto e um fragmento de skin exclusivo." }
        },
        {
          key: "onipotente", rank: 6, min: 500, max: null, art: "assets/ranks/onipotente.png",
          en: { reward: "Omnipotent banner and a title carved in the Moongate." },
          pt: { reward: "Estandarte de Onipotente e um título gravado no Moongate." }
        }
      ]
    }
  },

  /* ==========================================================
     YOUTUBE — videos of the official channel.
     url: full YouTube link (watch, youtu.be or shorts).
     When url is null the card shows an honest "coming soon"
     state; thumbnails are local files or auto-derived from the
     YouTube link once set.
     ========================================================== */
  youtube: [
    {
      id: "trailer",
      url: null,
      thumb: "assets/hero-valley.jpg",
      en: { title: "Moon Valley — Official Trailer" },
      pt: { title: "Moon Valley — Trailer Oficial" }
    },
    {
      id: "kaelith-motion",
      url: null,
      thumb: "assets/classes/kaelith-1.jpg",
      en: { title: "Kaelith — Blood-Gem Duelist in Motion" },
      pt: { title: "Kaelith — A Duelista Rubra em Movimento" }
    },
    {
      id: "frostvale-chronicle",
      url: null,
      thumb: "assets/regions/frostvale.jpg",
      en: { title: "Frostvale — Chronicle of the Eternal Aurora" },
      pt: { title: "Frostvale — Crônica da Aurora Eterna" }
    },
    {
      id: "moongate-chronicle",
      url: null,
      thumb: "assets/regions/moongate.jpg",
      en: { title: "The Moongate — Where the Stars Are Eaten" },
      pt: { title: "O Moongate — Onde as Estrelas São Devoradas" }
    }
  ],

  /* ==========================================================
     MEDIA — trailer/video items need a real URL in `url`
     to play; without one they show an honest "coming soon" state.
     ========================================================== */
  media: [
    {
      id: "kaelith-showcase",
      kind: "trailer",
      thumb: "assets/videos/kaelith-1-poster.jpg",
      url: "assets/videos/kaelith-1.mp4",
      en: { title: "Kaelith — First Look", sub: "Trailer" },
      pt: { title: "Kaelith — Primeira Olhada", sub: "Trailer" }
    },
    {
      id: "kaelith-motion",
      kind: "video",
      thumb: "assets/videos/kaelith-2-poster.jpg",
      url: "assets/videos/kaelith-2.mp4",
      en: { title: "Kaelith in Motion", sub: "Gameplay" },
      pt: { title: "Kaelith em Movimento", sub: "Gameplay" }
    },
    {
      id: "kaelith-chronicle",
      kind: "video",
      thumb: "assets/videos/kaelith-3-poster.jpg",
      url: "assets/videos/kaelith-3.mp4",
      en: { title: "Combat Chronicle — Kaelith", sub: "Gameplay" },
      pt: { title: "Crônica de Combate — Kaelith", sub: "Gameplay" }
    },
    {
      id: "shot-castle",
      kind: "screenshot",
      thumb: "assets/scene-mountains.svg",
      en: { title: "The Keep at Golden Hour", sub: "Screenshot" },
      pt: { title: "O Castelo na Hora Dourada", sub: "Captura" }
    },
    {
      id: "shot-grove",
      kind: "screenshot",
      thumb: "assets/region-grove.svg",
      en: { title: "Root-Bridge in the Eldergrove", sub: "Screenshot" },
      pt: { title: "Ponte-de-Raiz na Floresta Ancestral", sub: "Captura" }
    },
    {
      id: "art-aurora",
      kind: "art",
      thumb: "assets/scene-why.svg",
      en: { title: "Concept — The Aurora Watcher", sub: "Concept Art" },
      pt: { title: "Conceito — O Vigia da Aurora", sub: "Arte Conceitual" }
    },
    {
      id: "art-moongate",
      kind: "art",
      thumb: "assets/region-moon.svg",
      en: { title: "Concept — The Shattered Ring", sub: "Concept Art" },
      pt: { title: "Conceito — O Anel Destroçado", sub: "Arte Conceitual" }
    },
    {
      id: "art-community",
      kind: "art",
      thumb: "assets/scene-community.svg",
      en: { title: "Concept — Company at Dusk", sub: "Concept Art" },
      pt: { title: "Conceito — Companhia ao Anoitecer", sub: "Arte Conceitual" }
    }
  ]
};
