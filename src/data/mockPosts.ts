import type { CommunityPost } from '../types/post';

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'post-001',
    author: '@BurzyRo88',
    content:
      "Reze's flower pattern on her shoes directly references Hanakotoba (Japanese flower language) — specifically the Spider Lily, which symbolizes death and reincarnation. Fujimoto confirmed this in a 2020 Shonen Jump interview.",
    entity: "Reze's Flowers",
    timestamp: '2026-02-25T14:30:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 237,
  },
  {
    id: 'post-002',
    author: '@FujimotoFanatic',
    content:
      'The Gun Devil destroyed 1.2 million people in 26 seconds across multiple countries. This is directly inspired by the Hiroshima bombing casualty figures, which Fujimoto has publicly cited as an influence.',
    entity: 'Gun Devil',
    timestamp: '2026-02-24T09:15:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 892,
  },
  {
    id: 'post-003',
    author: '@DevilHunterKR',
    content:
      "Makima's contract with the Japanese Prime Minister makes her essentially immortal — any fatal damage is transferred to a random Japanese citizen. This was revealed in Chapter 75 and later confirmed in an official databook.",
    entity: "Makima's Contract",
    timestamp: '2026-02-23T18:45:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 1100,
  },
  {
    id: 'post-004',
    author: '@ChainsawTheory',
    content:
      "Pochita is actually the original Devil that existed before all other Devils. Fujimoto stated in Volume 11's author notes that Pochita predates the concept of fear itself.",
    entity: 'Pochita',
    timestamp: '2026-02-22T11:20:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 654,
  },
  {
    id: 'post-005',
    author: '@MangaScholar',
    content:
      'The Fear Devil Arc directly parallels the Book of Revelation from the Bible — the Four Horsemen Devils (Control, War, Famine, Death) map exactly to the Four Horsemen of the Apocalypse. This is intentional biblical symbolism.',
    entity: 'Fear Devil Arc',
    timestamp: '2026-02-21T16:00:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 1700,
  },
  {
    id: 'post-006',
    author: '@PowerBestGirl',
    content:
      "Power's cat Meowy was actually a Fiend — a devil possessing a dead cat's body. This was explained in Chapter 30 when Makima revealed the truth about Fiends to Denji.",
    entity: 'Power',
    timestamp: '2026-02-20T08:30:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 445,
  },
  {
    id: 'post-007',
    author: '@AkiAngel',
    content:
      "Aki's Future Devil contract lets him see exactly 3 months into the future. He used this ability in every major battle, including the fight against the Katana Man in Chapters 23-25.",
    entity: 'Future Devil',
    timestamp: '2026-02-19T20:10:00Z',
    status: 'pending',
    factCheckResult: null,
    hypeScore: 328,
  },
  {
    id: 'post-008',
    author: '@DarknessDevil',
    content:
      'The Darkness Devil is the only Primal Devil shown in the manga. It has never experienced death because no one has ever conquered the fear of darkness. It one-shot multiple experienced devil hunters in Hell during the International Assassins Arc.',
    entity: 'Darkness Devil',
    timestamp: '2026-02-18T13:55:00Z',
    status: 'approved',
    factCheckResult: {
      verdict: 'factual',
      confidence: 88,
      reasoning:
        'The Darkness Devil is indeed shown as a Primal Devil in the International Assassins Arc. It demonstrated overwhelming power against experienced hunters in Hell. The claim about never experiencing death aligns with the manga explanation of Primal Devils.',
      checkedAt: '2026-02-18T14:30:00Z',
    },
    hypeScore: 567,
  },
  {
    id: 'post-009',
    author: '@RezeSimp',
    content:
      "Reze was actually a Soviet experiment child who was fused with the Bomb Devil at age 5. She was sent to Japan specifically to capture Denji's heart — literally, because the Chainsaw Devil's heart grants the power to erase Devils from existence.",
    entity: 'Bomb Devil',
    timestamp: '2026-02-17T10:40:00Z',
    status: 'rejected',
    factCheckResult: {
      verdict: 'misleading',
      confidence: 72,
      reasoning:
        "While Reze is indeed connected to Soviet experiments and the Bomb Devil, the specific claim about being fused at age 5 is not confirmed in the manga. The claim about the Chainsaw Devil's heart erasing Devils is partially correct — it erases the Devils it consumes from existence, not just any Devil.",
      checkedAt: '2026-02-17T11:00:00Z',
    },
    hypeScore: 389,
  },
];
