<style >
.v-window.d-inline-flex.v-item-group.v-tabs-items .v-window__container{

     width: 100%;
}
</style>
<template>
     <v-container fluid fill-height>
          <v-row align="center" justify="center" class="grey lighten-5">
               <v-card max-width="500px" min-height="425px" max-height="425px" tile v-if="config_loaded">
                    <v-toolbar dense class="mb-2">
                         <v-toolbar-title v-if="tab == 0">
                              {{ labels["activity_title"] }}
                         </v-toolbar-title>
                         <v-toolbar-title v-if="tab == 1">
                              {{ labels["activity_list_title"] }}
                         </v-toolbar-title>
                         <v-spacer></v-spacer>
                         <v-btn icon @click="changeTab(0)">
                              <v-icon>mdi-magnify</v-icon>
                         </v-btn>
                         <v-btn icon @click="changeTab(1)">
                              <v-icon>mdi-format-list-bulleted</v-icon>
                              <v-badge
                                   v-if="activityListCount"
                                   :value="list_count_badge"
                                   :content="activityListCount"
                              >
                              </v-badge>
                         </v-btn>
                    </v-toolbar>

                    <v-tabs-items v-model="tab" class="d-inline-flex" style="width:100%;">
                         <v-tab-item style="min-height: 355px;width:100%;" class="fill-height">
                              <ActivitySearch />
                         </v-tab-item>
                         <v-tab-item style="min-height: 355px;;width:100%;" class="fill-height">
                              <ActivityList ref="activity_list" :set="count" />
                         </v-tab-item>
                    </v-tabs-items>
               </v-card>
          </v-row>
     </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import ActivitySearch from "./ActivitySearch";
import ActivityList from "./ActivityList";
import apiActivity from "../api/modules/activity";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("activity");

export default {
	name: "Activity",
	components: {
		ActivitySearch,
		ActivityList,
	},

	data: () => ({
		tab: 0,
          list_count_badge: false,
          config_loaded:false,
	}),
	mounted: function () {
		let _this = this;
		apiActivity
			.get_config()
			.then((res) => {
				console.log("Config loaded:",res);
                    _this.updateConfig(res);
                    _this.config_loaded=true;
			})
			.catch((err) => {
                   
				console.log("Config loaded:", "failed");
				console.log(err);
			});
	},
	computed: {
		...mapState({
			defaults: (state) => state.defaults,
			labels: (state) => state.labels,
		}),
		...mapGetters({
			activityListCount: "getItemsCount",
		}),

		count() {
			if (this.activityListCount) {
				this.list_count_badge = false;
				setTimeout(() => {
					this.list_count_badge = true;
				}, 200);
			}
		},
	},

	methods: {
		...mapActions({
			updateConfig: "updateConfig",
		}),
		changeTab(index) {
			this.tab = index;
			if (this.$refs["activity_list"]) {
				this.$refs["activity_list"].clear();
			}
		},
	},
};

</script>
