<template>
  <v-content>
      <Activity/>
      <ErrorDialog/>
  </v-content>
</template>

<script>
// @ is an alias to /src

import ErrorDialog from '@/components/ErrorDialog.vue'
import Activity from '@/components/Activity.vue'

export default {
  name: 'Root',
  components: {
    ErrorDialog,
    Activity,
    
  },

}
</script>
