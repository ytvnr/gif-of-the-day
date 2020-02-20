<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="gifs">
            <h1 class="gifs-title">Gif of the day</h1>
          </div>
        </v-card-text>
        <v-data-table
                :headers="headers"
                :items="gifs"
                :disable-filtering="true"
                :disable-pagination="true"
                :disable-sort="true"
                :hide-default-footer="true"
        >
          <template v-slot:item.theme="props">
            <v-edit-dialog
                    :return-value.sync="props.item.theme"
                    large
                    persistent
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
            >
              <div>{{ props.item.theme }}</div>
              <template v-slot:input>
                <div class="mt-4 title">Update Theme</div>
              </template>
              <template v-slot:input>
                <v-text-field
                        v-model="props.item.theme"
                        label="Edit"
                        single-line
                        counter
                        autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.preview>
            <v-btn class="ma-2" outlined color="lime">Preview</v-btn>
          </template>
        </v-data-table>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'schedule',
  components: {
  },
  data() {
    return {
      disableFiltering: true,
      pagination: {},
      headers: [
        {
          text: 'Day of week',
          align: 'left',
          sortable: false,
          value: 'day',
        },
        { text: 'Gif Theme', value: 'theme' },
        { text: 'Preview', value: 'preview' }
      ],
      gifs: [
        {
          day: 'Monday',
          theme: 'Monday Theme',
          preview: 'Preview',
        },
        {
          day: 'Tuesday',
          theme: 'Tuesday Theme',
          preview: 'Preview',
        },
        {
          day: 'Wednesday',
          theme: 'Wednesday Theme',
          preview: 'Preview',
        },
        {
          day: 'Thursday',
          theme: 'Thursday Theme',
          preview: 'Preview',
        },
        {
          day: 'Friday',
          theme: 'Friday Theme',
          preview: 'Preview',
        },
      ]
    };
  },
  methods: {
    save() {
      console.log('Dialog saved');
    },
    cancel() {
      console.log('Dialog cancelled');
    },
    open() {
      console.log('Dialog opened');
    },
    close() {
      console.log('Dialog closed');
    }
  }
}
</script>

<style lang="scss">
  .gifs-title {
    text-align: center;
  }
</style>
