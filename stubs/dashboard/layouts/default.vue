<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-btn class="ml-4" href="http://localhost:8081/openapi">
        <v-icon left>mdi-file-document-multiple-outline</v-icon>
        API docs
      </v-btn>
      <v-btn class="ml-4" href="http://localhost:8081/api-docs">
        <v-icon left>mdi-television-guide</v-icon>
        API UI
      </v-btn>
      <v-btn class="ml-4" href="http://localhost:8081/poll" target="_blank">
        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
        Check
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {}
  }
}
</script>
