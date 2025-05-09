import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export var staticWord = {

  dropDoownItems: {
    home: {en:"home", ar:"الرئيسية"},
    restaurants: {en:"restaurants", ar:"المطاعم"},
    settings: {en:"settings", ar:"الاعدادات"},
    addReservation: {en:"add reservation", ar:"إضافة حجز"},
    reservation: {en:"reservations", ar:"الحجوزات"},
    logout: {en:"logout", ar:"تسجيل الخروج"},
  },

  entries: {
    buttons: {
      login:{en:"login", ar:"تسجيل الدخول"},
      register:{en:"register", ar:"إنشاء حساب"},
    },
    inputsPlacholder: {
      username:{en:"type your name", ar:"ادخل اسمك"},
      password:{en:"type your password", ar:"ادخل كلمة السر"},
      phone:{en:"type your phone number", ar:"ادخل رقم الهاتف"},
      email:{en:"type your email", ar:"ادخل الايميل"},
    },
  },
  
  settings: {
    name:{en:"langage app:", ar:"لغة التطبيق:"},
    lang: {
      english:{en:"en", ar:"انكليزي"},
      arabic:{en:"ar", ar:"عربي"},
    }
  }
}
export type lang = "en" | "ar"
var initialState:lang = "ar"
const languageApp = createSlice({
  name: 'languages app',
  initialState,
  reducers: {
    setLanguageApp<lang>(state:lang, action: PayloadAction<lang>) {
      return state = action.payload
    },
  },
})

export const {setLanguageApp} = languageApp.actions
export default languageApp.reducer