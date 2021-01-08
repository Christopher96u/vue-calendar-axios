<template>
  <v-app>
    <v-container>
      <v-dialog v-model="loader.isLoading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{loader.title}}
            <v-progress-linear indeterminate color="white" class="mb-0">
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card color="error" dark>
            <v-card-text class="display-1 text-center">Dollar price over the time</v-card-text>
            <v-card-text class="text-center display-1 grey--text">Stack: Vue, Vuex, Axios, Vue-Axios, Vuetify</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-date-picker full-width v-model="date" @change="getData(date)"
                           locale="es"  :min="dateMin" :max="dateMax">
            </v-date-picker>
          </v-card>
          <v-card color="error" dark>
            <v-card-text class="display-1 text-center">{{date}} - s/. {{value}}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>


import axios from "axios";
import {mapState, mapMutations} from "vuex"
export default {
  name: 'App',
  components: {

  },
  mounted() {
    this.getData(this.date) // shot getData method the first time that an user visit our page
  },
  computed: {
    ...mapState(['loader'])
  },
  methods: {
    ...mapMutations(['showLoader','hideLoader']),
    async getData(date){
      //first separate each part with '-' and set it to an array, then reverse the array and finally convert the array into a string
      let formattedDate = date.split(['-']).reverse().join('-')
      try {
        this.showLoader({title: 'Accediendo a la información'})
        let data = await axios.get(`https://mindicador.cl/api/dolar/${formattedDate}`)
        if( data.data.serie.length > 0){
          const SOL = 0.0051
          this.value = await parseFloat(data.data.serie[0].valor*SOL).toFixed(3)
          console.log(parseFloat(data.data.serie[0].valor*SOL).toFixed(3))
          console.log(date)
          console.log(formattedDate)
        }
        else{
          this.value = 'Sin resultados'
          console.log(this.value)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.hideLoader()
      }
    }
  },
  data(){
    return {
      date: new Date().toISOString().substr(0,10),
      dateMin: '1984', // In VuetifyDoc says you should set date in string format
      dateMax: new Date().toISOString().substr(0,10),
      value: null
    }
  }
}
</script>


