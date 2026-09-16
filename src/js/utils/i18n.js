import { configureLocalization, msg } from '@lit/localize';

const { getLocale, setLocale: loadLocale } = configureLocalization({
  sourceLocale: 'id',
  targetLocales: ['en', 'es'],
  loadLocale: (localeCode) => import(`../../generated/${localeCode}.js`),
});

const supportedLocales = new Set(['id', 'en', 'es']);
const storedLocale = localStorage.getItem('story-app-locale');
const initialLocale = supportedLocales.has(storedLocale) ? storedLocale : 'id';

export const locale = getLocale;
export const setLocale = (value) => {
  const nextLocale = supportedLocales.has(value) ? value : 'id';
  localStorage.setItem('story-app-locale', nextLocale);
  return loadLocale(nextLocale);
};
export const localeReady = setLocale(initialLocale);

const messages = {
  dashboard: () => msg('Temukan cerita hari ini', { id: 'dashboard' }),
  subtitle: () => msg('Ruang untuk berbagi momen, perjalanan, dan inspirasi.', { id: 'subtitle' }),
  explore: () => msg('Jelajahi cerita', { id: 'explore' }),
  add: () => msg('Tulis cerita', { id: 'add' }),
  profile: () => msg('Profil pengembang', { id: 'profile' }),
  search: () => msg('Cari cerita...', { id: 'search' }),
  latest: () => msg('Cerita terbaru', { id: 'latest' }),
  description: () => msg('Deskripsi cerita', { id: 'description' }),
  photo: () => msg('Foto cerita', { id: 'photo' }),
  publish: () => msg('Terbitkan cerita', { id: 'publish' }),
  choose: () => msg('Pilih foto untuk pratinjau', { id: 'choose' }),
  success: () => msg('Cerita berhasil disimpan!', { id: 'success' }),
  about: () => msg('Tentang Story App', { id: 'about' }),
  newMemory: () => msg('KENANGAN BARU', { id: 'newMemory' }),
  addIntro: () => msg('Abadikan momen terbaikmu dalam satu cerita.', { id: 'addIntro' }),
  photoRequired: () => msg('Pilih foto cerita.', { id: 'photoRequired' }),
  minDescription: () => msg('Deskripsi minimal 10 karakter.', { id: 'minDescription' }),
  detail: () => msg('Lihat detail', { id: 'detail' }),
  storyDetail: () => msg('Detail cerita', { id: 'storyDetail' }),
  close: () => msg('Tutup', { id: 'close' }),
  notes: () => msg('Catatan submission', { id: 'notes' }),
  notesText: () =>
    msg(
      'Aplikasi ini menggunakan Lit Web Components, Bootstrap, Sass modular, local JSON, validasi form, dan dukungan tiga bahasa.',
      { id: 'notesText' },
    ),
  loginTitle: () => msg('Masuk ke Story App', { id: 'loginTitle' }),
  registerTitle: () => msg('Buat akun baru', { id: 'registerTitle' }),
  login: () => msg('Masuk', { id: 'login' }),
  register: () => msg('Daftar', { id: 'register' }),
  logout: () => msg('Keluar', { id: 'logout' }),
  name: () => msg('Nama', { id: 'name' }),
  email: () => msg('Email', { id: 'email' }),
  password: () => msg('Password', { id: 'password' }),
  noAccount: () => msg('Belum punya akun?', { id: 'noAccount' }),
  hasAccount: () => msg('Sudah punya akun?', { id: 'hasAccount' }),
  createAccount: () => msg('Daftar', { id: 'createAccount' }),
  loginSuccess: () => msg('Pendaftaran berhasil. Silakan masuk.', { id: 'loginSuccess' }),
};

const authTranslations = {
  id: {
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    add: 'Tulis cerita',
    profile: 'Profil pengembang',
    loginTitle: 'Masuk ke Story App',
    registerTitle: 'Buat akun baru',
    noAccount: 'Belum punya akun?',
    hasAccount: 'Sudah punya akun?',
    createAccount: 'Daftar',
    loginSuccess: 'Pendaftaran berhasil. Silakan masuk.',
  },
  en: {
    login: 'Sign in',
    register: 'Register',
    logout: 'Log out',
    add: 'Write a story',
    profile: 'Developer profile',
    loginTitle: 'Sign in to Story App',
    registerTitle: 'Create a new account',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    createAccount: 'Register',
    loginSuccess: 'Registration successful. Please sign in.',
  },
  es: {
    login: 'Iniciar sesión',
    register: 'Registrarse',
    logout: 'Cerrar sesión',
    add: 'Escribe una historia',
    profile: 'Perfil del desarrollador',
    loginTitle: 'Inicia sesión en Story App',
    registerTitle: 'Crea una cuenta nueva',
    noAccount: '¿No tienes una cuenta?',
    hasAccount: '¿Ya tienes una cuenta?',
    createAccount: 'Registrarse',
    loginSuccess: 'Registro exitoso. Inicia sesión.',
  },
};

export const t = (key) => authTranslations[locale()]?.[key] || messages[key]?.() || key;
