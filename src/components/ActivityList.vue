<style scoped>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.v-list::-webkit-scrollbar {
	     display: none;
	     width: 0px;
	     background: transparent; /* make scrollbar transparent */
	}
	.v-list {
	     overflow-y: auto !important;
	}
	.v-list-item {
	     margin: 5px;
	     border-radius: 4px;
	     background:#F5F5F5;
	}
	.v-list-item:hover {
	     background: #EEEEEE;
	}
	.v-list-item:active {
	     background: #EEEEEE;
	}
	.activity-clear{
	     width: 100%;
	     margin-bottom:22px!important; 
	}  
</style>
<template>
	<v-sheet  class="fill-height">
 		<v-row  align="stretch" no-gutters class=" mx-5 fill-height">
			<v-col cols="12" align-self-start>
				<v-btn
					dark
					fab
					absolute
					top
					right
					small
					color="white"
					class="mt-5"
					@mouseover="sort_open = true"
					@mouseleave="fadeShortOpen()"
					@click="sortTypeToggle()"
					:set="(mode = sort_modes[sort_mode])"
				>
					<v-badge avatar :color="mode.bg_color">
						<span slot="badge"
							><v-icon :color="mode.color" small  class="mt-n1">
								{{mode.icon}}
							</v-icon>
						</span>
						<v-icon color="grey">{{ sort_types[sort_type].icon }}</v-icon>
					</v-badge>
				</v-btn>
				<v-speed-dial
					v-model="sort_open"
					absolute
					top
					right
					direction="left"
					transition="slide-y-reverse-transition"
					class="mr-6 mt-1"
				>
					<v-btn
						fab
						dark
						x-small
						color="blue"
						@click="sortChange(SORT_MODES.PARTICIPANTS)"
					>
						<v-icon>{{ sort_modes[SORT_MODES.PARTICIPANTS].icon }}</v-icon>
					</v-btn>
					<v-btn fab dark x-small color="green" @click="sortChange(SORT_MODES.PRICE)">
						<v-icon>{{ sort_modes[SORT_MODES.PRICE].icon }}</v-icon>
					</v-btn>
					<v-btn
						fab
						dark
						x-small
						color="white"
						@click="sort_by = sortChange(SORT_MODES.NUMERIC)"
					>
						<v-icon color="grey">{{ sort_modes[SORT_MODES.NUMERIC].icon }}</v-icon>
					</v-btn>
				</v-speed-dial>

				<v-list v-if="!items_filter.length" three-line class="overflow-y-auto" height="300px" light min-width="100%">
					<v-list-item >
							
							<v-list-item-content >
								<v-list-item-title
								style="white-space:normal;"
								>
									{{labels.empty_list}}
								</v-list-item-title>
								<v-list-item-subtitle class="pt-3">
									
								</v-list-item-subtitle>
							</v-list-item-content>
							
						</v-list-item>
				</v-list>
				<v-list  v-else  three-line class="overflow-y-auto" height="300px" light min-width="100%">
					<template>
						<v-list-item  v-for="(item) in items_filter" :key="item.key"

							
							:set="type = getTypeByValue(item.type)"	
						>
							<v-list-item-avatar>
								<v-avatar :color="type.display.bg_color" size="36">
									<span :style="{ color: type.display.color }">{{
										type.s_name
									}}</span>
								</v-avatar>
							</v-list-item-avatar>
							<v-list-item-content :set="price_name = getPriceRangeName(item.price)">
								<v-list-item-title 
									style="white-space:normal;"
									v-html="item.activity"
								>
								
								</v-list-item-title>
								<v-list-item-subtitle class="pt-3">
									<v-badge :content="item.participants">
										<v-icon class="mt-n3 mr-0" left
											>mdi-account-group</v-icon
										>
									</v-badge>
									<v-chip
										small
										class="ma-2 ml-8 mt-n2"
										color="pink"
										label
										text-color="white"
									>
										<v-icon class="mt-n1" left>mdi-cash-multiple</v-icon>
										{{ labels[price_name] }}
									</v-chip>
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-list-item-action :set="(fab = false)">
								<v-speed-dial
									v-model="fab"
									top
									right
									direction="left"
									transition="slide-y-reverse-transition"
									color="red"
								>
									<template v-slot:activator>
										<v-btn color="red" dark fab x-small>
											<v-icon v-if="fab" @click="fab = !fab"
												>mdi-close</v-icon
											>
											<v-icon v-else>mdi-delete</v-icon>
										</v-btn>
									</template>
									<v-btn
										fab
										dark
										x-small
										color="red"
										@click="removeItemByKey(item.key)"
									>
										<v-icon>mdi-check-bold</v-icon>
									</v-btn>
									<v-btn
										fab
										dark
										x-small
										color="blue"
										@click="fab = false"
									>
										<v-icon>mdi-cancel</v-icon>
									</v-btn>
								</v-speed-dial>
							</v-list-item-action>
						</v-list-item>
					</template>
				</v-list>
			</v-col>
			<v-col  align-self-end  cols="12" class="pt-0 ">
				<v-btn
					ref="activity_list_clear"
					class="activity-clear mb-0"
					tile
					color="red"
					dark
					
					@click="clear_confirm=true"
					>{{ labels.clear_list }}</v-btn
				>
			</v-col>
		</v-row>
		<v-overlay
         absolute
          :value="clear_confirm"
        >
          <v-btn
            color="blue"
            @click="clear_confirm = false"
		   class="ma-5"
          >
           No
          </v-btn>
		 <v-btn
            color="red"
            @click="clearItems(),clear_confirm = false"
		  class="ma-5"
          >
           Yes
          </v-btn>
        </v-overlay>
	</v-sheet>
</template>



<script>
import _map from "lodash/map";
import _without from "lodash/without";
import _cloneDeep from "lodash/cloneDeep";
import _orderBy from "lodash/orderBy";
import _reverse from "lodash/reverse";
import _filter from "lodash/filter";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("activity");


export const SORT_TYPES = Object.freeze({
    ASC: "asc",
    DESC: "desc",
});
export const SORT_MODES = Object.freeze({
    PARTICIPANTS: "participants",
    PRICE: "price",
    NUMERIC:"numeric",
});

export default {
     name: "ActivityList",

     data: () => ({
		SORT_TYPES:SORT_TYPES,
		SORT_MODES:SORT_MODES,

          sort_modes: {
               participants: {
                    icon: "mdi-account-group",
                    bg_color: "blue",
                    color: "white",
               },
               price: {
                    icon: "mdi-cash-multiple",
                    bg_color: "green",
                    color: "white",
               },
               numeric: {
                    icon: "mdi-numeric",
                    bg_color: "white",
                    color: "grey",
               },
          },
          sort_types: {
               asc: {
                    icon: "mdi-sort-ascending",
               },
               desc: {
                    icon: "mdi-sort-descending",
               },
          },
          hide_sorting: false,
          sort_mode: "numeric",
          sort_type: SORT_TYPES.ASC,
          sort_open: false,
		fadeTimemout: null,
		clear_confirm:false,
     }),

    
     created: function () {},

     computed: {
		/*  get data from default and module store*/
		/*  if you need any as local instance set the variables from mapState to data section and mapGetters to computed or write custom solver*/
          ...mapState({
               defaults: (state) => state.defaults,
               settings: (state) => state.defaults.settings,
			items: (state) => state.items,
			labels: state => state.labels,
		}),
          ...mapGetters({
			listCount: "getItemsCount",	
               getTypeByValue: "getTypeByValue",
          }),

          items_filter() {
               var filtered_items = _cloneDeep(this.items);
               if (this.sort_mode == SORT_MODES.NUMERIC && this.sort_type == SORT_TYPES.ASC) {
                    return _reverse(filtered_items);
               } else {
                    return _orderBy(filtered_items, [this.sort_mode], [this.sort_type]);
               }
               return filtered_items;
          },
     },

     methods: {
          ...mapActions({
               removeItemByKey: "removeItemByKey",
               clearItems: "removeAllItems",
          }),
		clear() {
			this.clear_confirm=false;
		},
          fadeShortOpen() {
               clearTimeout(this.fadeTimemout);
               if (this.sort_open == true) {
                    this.fadeTimemout = setTimeout(() => {
                         this.sort_open = false;
                    }, 2000);
               }
		},
		getPriceRangeName(price){
			/* Lookup in price ranges ordering first the more expensives. */
			const result =  _map(_reverse(this.settings.price_ranges),
								function(v,key) {
									if(v[0] <= price&& v[1] >= price){
										return key
									}
								}
							);
			/* As result contain all valuation we are removing the fails as returned undefined */			
			let res = _without(result, undefined);

			if(res.length){
				return res[0]
			}else{
				return '';
			}			 
		},
		

          sortChange(mode) {
               this.sort_mode = mode;
          },
          sortTypeToggle() {
               if (this.sort_type == SORT_TYPES.ASC) {
                    this.sort_type = SORT_TYPES.DESC;
               } else {
                    this.sort_type =  SORT_TYPES.ASC;
               }

               console.log(this.sort_type);
          },
     },
};

</script>
