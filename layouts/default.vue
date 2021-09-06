<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer class="d-inline text-center" fixed app>
      <p>Powered by ArtemSalikhov</p>
      <p>telegram @Artem_Krv</p>
      <span>{{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'leaflet maps',
    }
  },
}
</script>

<style scoped>
p {
  margin-bottom: 0%;
}
</style>
