<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">Formulaire</v-card-title>
        <v-card-text>
          <v-alert type="info" dense class="mb-0">
            Ce formulaire permet d'envoyer des requêtes vers le bandeau
          </v-alert>
          <v-card-title>Infos cœur</v-card-title>
          <v-form>
            <v-row>
              <v-col>
                <v-combobox
                  v-model="form.core.urlSiSamu"
                  :items="items.core.urlSiSamu"
                  label="URL SI-SAMU"
                  hide-details="auto"
                  required
                ></v-combobox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model="form.core.idCrra"
                  :items="items.core.idCrra"
                  label="idCrra"
                  required
                ></v-combobox>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model="form.core.idNatPs"
                  :items="items.core.idNatPs"
                  label="idNatPs"
                  required
                ></v-combobox>
              </v-col>
            </v-row>
          </v-form>
          <v-divider/>
          <v-card-title>Click-to-Call</v-card-title>
          <v-form>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model="form.clickToCall.numTel"
                  :items="items.clickToCall.numTel"
                  label="N° de téléphone"
                  required
                ></v-combobox>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <v-combobox
                  v-model="form.clickToCall.idDossier"
                  :items="items.clickToCall.idDossier"
                  label="idDossier"
                  required
                ></v-combobox>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" @click="submitClickToCall">
                Envoyer
              </v-btn>
            </v-card-actions>
          </v-form>
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
            <div v-for="{direction, endpoint, time, receivedTime, code, body} in messages" :key="time"
                 class="message mb-4">
              <v-badge :color="code === 200 ? 'green' : 'red'" :content="code"></v-badge>
              <pre style="white-space: pre-wrap; background-color: rgba(0, 0, 0, 0.05);"
                   class="elevation-1 pa-2 mt-n3">{{ direction }}{{ endpoint }}<br>{{ time }} -> {{ receivedTime }}<br>{{
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
        direction: '→ ',
        endpoint: '/',
        time: this.time(),
        receivedTime: this.time(),
        code: 200,
        body: {body: 'Page loaded successfully!'}
      }],
      items: {
        core: {
          urlSiSamu: ['http://localhost:8080', 'https://portail.vft.si-samu.fr'],
          idCrra: ['FR090', 'FR42A'],
          idNatPs: ['899700367800']
        },
        clickToCall: {
          numTel: ['0604174184'],
          idDossier: ['22298003']
        }
      },
      form: {
        core: {
          urlSiSamu: 'http://localhost:8080',
          idCrra: 'FR090',
          idNatPs: '899700367800'
        },
        clickToCall: {
          numTel: '0606060606',
          idDossier: '22298003'
        }
      }
    }
  },
  mounted() {
    this.longPolling();
  },
  methods: {
    async longPolling() {
      this.$axios.$get('/poll', {timeout: 10000}).then((response) => {
        try {
          response.body = JSON.parse(response.body);
        } catch (e) {
        }
        this.messages.unshift({
          ...response,
          direction: '→ ',
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
    },
    submitClickToCall() {
      const endpoint = '/si-samu-back-synchro-lrm-web/api/v1/cti/' + this.form.core.idCrra + '/agents/' + this.form.core.idNatPs + '/calls';
      const time = this.time();
      // Could be using Swagger generated client, but it would validate fields!
      this.$axios.$post(
        '/forward',
        {
          endpoint: this.form.core.urlSiSamu + endpoint,
          data: this.form.clickToCall
        }
      ).then((response) => {
        console.log(response);
        this.messages.unshift({
          direction: '← ',
          endpoint,
          time,
          receivedTime: this.time(),
          code: 200,
          body: response
        });
      }).catch(error => {
        this.messages.unshift({
          direction: '← ',
          endpoint,
          time,
          receivedTime: this.time(),
          code: error.response.status,
          body: error.response.data
        });
      })
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
