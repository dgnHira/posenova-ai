/**
 * services/api.js
 * PoseGuide - Backend ve Pinterest API servis katmanı.
 * Tüm fetch işlemleri bu dosya üzerinden yürütülür.
 */

const BASE_URL = 'http://localhost:5000/api';

// ── Yardımcı fetch wrapper ──────────────────────────────────
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'API hatası');
    }
    return await res.json();
  } catch (e) {
    console.warn('[PoseGuide API] Backend bağlantısı yok, demo verisi kullanılıyor.');
    return null; // Demo mod - null dönerse mock data kullanılır
  }
}

// ── Poz Servisleri ─────────────────────────────────────────
export const PoseService = {

  /**
   * Filtrelere göre poz listesi getirir.
   * @param {Object} filters - { environment, personCount, intimacyLevel }
   */
  async getFilteredPoses(filters) {
    const params = new URLSearchParams(filters).toString();
    const data = await request(`/poses?${params}`);
    return data || MockData.getPoses(filters);
  },

  /** Tüm pozları getirir (galeri) */
  async getAllPoses() {
    const data = await request('/poses/all');
    return data || MockData.getAllPoses();
  },

  /** Tek bir pozun detayını getirir */
  async getPoseById(id) {
    const data = await request(`/poses/${id}`);
    return data || MockData.getPoseById(id);
  },

  /** Seçilen pozu favoriye ekler */
  async saveFavorite(poseId) {
    return await request('/poses/favorite', {
      method: 'POST',
      body: JSON.stringify({ poseId }),
    });
  },
};

// ── Pinterest Servisi ──────────────────────────────────────
export const PinterestService = {
  /** Giriş ekranı için kolaj görsellerini getirir */
  async getCollagePins() {
    const data = await request('/pinterest/collage');
    return data || MockData.getCollagePins();
  },
};

// ── Auth Servisi ───────────────────────────────────────────
export const AuthService = {
  async register(userData) {
    return await request('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
  },
  async login(credentials) {
    return await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  },
};

// ── Mock Data (Backend yokken demo modu) ───────────────────
const MockData = {
  getPoses(filters) {
    const all = this.getAllPoses();
    if (!filters) return all;
    return all.filter(p =>
      (!filters.environment   || p.environment   === filters.environment) &&
      (!filters.personCount   || p.personCount   == filters.personCount) &&
      (!filters.intimacyLevel || p.intimacyLevel === filters.intimacyLevel)
    );
  },

  getAllPoses() {
    return [
      { id:1, title:'Klasik Duruş',     environment:'outdoor', personCount:1, intimacyLevel:'friend',   silhouette:'solo_stand',   tags:['dış mekan','solo','klasik'],   imageUrl:'https://picsum.photos/seed/pose1/400/530', popularity:92 },
      { id:2, title:'Dinamik Poz',      environment:'indoor',  personCount:1, intimacyLevel:'family',   silhouette:'solo_dynamic',  tags:['iç mekan','dinamik','enerjik'], imageUrl:'https://picsum.photos/seed/pose2/400/600', popularity:87 },
      { id:3, title:'Çift Uyumu',       environment:'outdoor', personCount:2, intimacyLevel:'partner',  silhouette:'couple_stand',  tags:['çift','romantik','açık hava'], imageUrl:'https://picsum.photos/seed/pose3/400/480', popularity:95 },
      { id:4, title:'Arkadaş Grubu',    environment:'outdoor', personCount:3, intimacyLevel:'friend',   silhouette:'solo_stand',    tags:['grup','arkadaş','eğlenceli'],  imageUrl:'https://picsum.photos/seed/pose4/400/550', popularity:88 },
      { id:5, title:'Profesyonel',      environment:'office',  personCount:1, intimacyLevel:'colleague',silhouette:'solo_stand',   tags:['iş','profesyonel','ofis'],     imageUrl:'https://picsum.photos/seed/pose5/400/510', popularity:79 },
      { id:6, title:'Aile Anısı',       environment:'indoor',  personCount:4, intimacyLevel:'family',   silhouette:'couple_stand',  tags:['aile','hatıra','birlik'],      imageUrl:'https://picsum.photos/seed/pose6/400/570', popularity:91 },
      { id:7, title:'Sahil Özgürlüğü',  environment:'outdoor', personCount:1, intimacyLevel:'friend',   silhouette:'solo_dynamic',  tags:['sahil','özgür','yaz'],         imageUrl:'https://picsum.photos/seed/pose7/400/620', popularity:85 },
      { id:8, title:'Romantik An',      environment:'outdoor', personCount:2, intimacyLevel:'partner',  silhouette:'couple_stand',  tags:['romantik','çift','gün batımı'],imageUrl:'https://picsum.photos/seed/pose8/400/500', popularity:97 },
    ];
  },

  getPoseById(id) {
    return this.getAllPoses().find(p => p.id == id) || null;
  },

  getCollagePins() {
    const themes = ['animals','nature','camera','people','art','fashion','travel','food','architecture','sport'];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      imageUrl: `https://picsum.photos/seed/${themes[i % themes.length]}${i}/300/${280 + (i % 4) * 60}`,
      tag: themes[i % themes.length],
    }));
  },
};
