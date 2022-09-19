import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
          light: {
            primary: '#8cc587 0% 0%',
            secondary: '#107154'
          },
        },
      },
}

export default new Vuetify(opts)