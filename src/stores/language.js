import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '../i18n'

import FlagTR from '@/components/icons/flags/Flag-TR.vue'
import FlagUS from '@/components/icons/flags/Flag-US.vue'
import FlagSU from '@/components/icons/flags/Flag-SU.vue'

export const useLanguageStore = defineStore('language', () => {
  // State
  const currentLanguage = ref('tr')
  
  // Available languages
  const availableLanguages = [
    { 
      code: 'tr', 
      name: 'Türkçe', 
      direction: 'ltr',
      flag: FlagTR,
      width: 50,
      height: 50 
    },
    { 
      code: 'en', 
      name: 'English', 
      direction: 'ltr',
      flag: FlagUS,
      width: 50,
      height: 50 
    },
    { 
      code: 'ar', 
      name: 'العربية', 
      direction: 'rtl',
      flag: FlagSU,
      width: 50,
      height: 50 
    }
  ]

  // Computed
  const currentDirection = computed(() => {
    const language = availableLanguages.find(lang => lang.code === currentLanguage.value)
    return language ? language.direction : 'ltr'
  })

  // Actions
  const setLanguage = (langCode) => {
    currentLanguage.value = langCode
 
    // i18n locale'i güncelle
    i18n.global.locale.value = langCode
    
    // HTML dir özelliğini güncelle
    document.documentElement.dir = currentDirection.value
  }


  return {
    currentLanguage,
    currentDirection,
    availableLanguages,
    setLanguage
  }
})