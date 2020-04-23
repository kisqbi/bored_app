
<template>
     <v-row justify="center" v-if="hasError">
          <v-dialog v-model="dialog" max-width="290">
               <v-card>
                    <v-card-title class="headline">{{ error.title }}</v-card-title>

                    <v-card-text>
                         {{ error.message }}
                    </v-card-text>
                    <v-card-actions>
                         <v-spacer></v-spacer>
                         <v-btn color="red darken-1" text @click="setError(null)">
                              {{ error.agree }}
                         </v-btn>
                    </v-card-actions>
               </v-card>
          </v-dialog>
     </v-row>
</template>

<script>
import EventBus from "@/Bus";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("error");

export default {
     name: "ErrorDialog",
     components: {},

     data: () => ({
          dialog: false,
     }),
     mounted: function () {
          const _this = this;
          EventBus.$on("error-event", function (payLoad) {
               _this.setError(payLoad);
          });
     },

     watch: {
          dialog: function (newVal, oldVal) {
               if (newVal == false) {
                    this.setError(null);
               }
          },
     },

     computed: {
          ...mapState({
               ERROR_MESSAGES: (state) => state.ERROR_MESSAGES,
               error: (state) => state.error,
          }),
          hasError() {
               console.log("ERROR ", this.error);
               if (this.error != null) {
                    this.dialog = true;
                    return true;
               }
               return false;
          },
     },
     methods: {
          ...mapActions({
               setError: "setError",
          }),
          erroChange() {
               console.log("error change");
          },
     },
};

</script>
