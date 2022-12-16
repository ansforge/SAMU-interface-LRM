<template>
  <v-row justify="center">
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
        <v-card-title class="headline">
          Messages
          <v-badge :content="messages.length"/>
        </v-card-title>
        <v-card-text>
          <transition-group name="message">
            <div v-for="{endpoint, time, receivedTime, code, body} in messages" :key="time"
                 class="message mb-4">
              <v-badge :color="code === 200 ? 'green' : 'red'" :content="code"></v-badge>
              <pre style="white-space: pre-wrap; background-color: rgba(0, 0, 0, 0.05);"
                   class="elevation-1 pa-2 mt-n3">-> {{ endpoint }}<br>{{ time }} -> {{ receivedTime }}<br>{{
                  body
                }}</pre>
            </div>
          </transition-group>

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
      messages: [{
        endpoint: '/',
        time: this.time(),
        receivedTime: this.time(),
        code: 200,
        body: {body: 'Page loaded successfully!'}
      }]
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
          receivedTime: this.time()
        });
        this.longPolling();
      }).catch(error => {
        console.log(error)
        this.longPolling();
      })
    },
    time() {
      const d = new Date();
      return d.getHours() + ':' + d.getMinutes() + ':' + d.getMilliseconds();
    }
  }
}
</script>
<style>
.message {
  transition: all 0.5s;
}

.message-enter, .message-leave-to
  /* .message-leave-active for <2.1.8 */
{
  opacity: 0;
  transform: scale(0.7) translateY(-500px);
}

.message-enter-to {
  opacity: 1;
  transform: scale(1);
}

.message-leave-active {
  /*position: absolute;*/
}

.message-move {
  opacity: 1;
  transition: all 0.5s;
}
</style>
