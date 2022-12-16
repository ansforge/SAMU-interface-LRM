<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">Formulaire</v-card-title>
        <v-card-text>
          <v-alert type="info">
            This is the dashboard page. You can find it in <code>resources/js/stubs/dashboard/pages/index.vue</code>
          </v-alert>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">Dashboard</v-card-title>
        <v-card-text>
          <div v-for="({endpoint, time, code, body}, index) in messages" :key="index" class="mb-4">
            <v-badge :content="code"></v-badge>
            <pre style="white-space: pre-wrap; background-color: rgba(0, 0, 0, 0.05);"
                 class="elevation-1 pa-2 mt-n3">-> {{ endpoint }}<br>{{ time }}<br>{{ body }}</pre>
          </div>

        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      messages: [{endpoint: '/', time: this.time(), code: 200, body: {body: 'Page loaded successfully!'}}]
    }
  },
  mounted() {
    this.longPolling();
  },
  methods: {
    async longPolling() {
      this.$axios.$get('http://localhost:8081/poll', {timeout: 10000}).then((response) => {
        try {
          response.body = JSON.parse(response.body);
        } catch (e) {
        }
        this.messages.unshift({
          ...response,
          time: this.time()
        });
        this.longPolling();
      }).catch(error => {
        console.log(error)
        this.longPolling();
      })
    },
    time() {
      return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getMilliseconds();
    }
  }
}
</script>
