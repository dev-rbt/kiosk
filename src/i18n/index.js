import { createI18n } from 'vue-i18n'

// JSON dosyalarını otomatik olarak import et
const locales = import.meta.glob('../locales/*.json', { eager: true })

// Dil paketlerini hazırla
const messages = {}
Object.keys(locales).forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    const locale = matched[1].replace('../locales/', '')
    messages[locale] = locales[key].default
  }
})

// i18n yapılandırması
export const i18n = createI18n({
  legacy: false,
  locale: 'tr',
  fallbackLocale: 'tr',
  messages,
  html: true,
  warnHtmlMessage: false
})