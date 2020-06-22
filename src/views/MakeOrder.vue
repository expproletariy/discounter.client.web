<template>
	<v-container
		fluid
		class="fill-height" >
		<v-row>
			<v-row>
				<v-row>
					<v-qr-decoder @decoded="getClient"></v-qr-decoder>
				</v-row>
				<v-row>
					<v-card width="90vw" v-if="clientData">
						<v-card-title>
							Информация о клиенте
						</v-card-title>
						<v-card-text>
							<p>{{clientData.name}}</p>
							<v-divider></v-divider>
							<p>{{clientData.email}}</p>
							<v-divider></v-divider>
							<p>{{clientData.phone}}</p>
							<v-divider></v-divider>
							<p>{{clientData.first_name}}</p>
							<v-divider></v-divider>
							<p>{{clientData.birth_day}}</p>
							<v-divider></v-divider>
						</v-card-text>
					</v-card>
				</v-row>
				<v-card
						class="mx-auto"
						max-width="400"
						tile
				>
					<v-row>
						<v-btn @click="createOrder">Создать заказ</v-btn>
						<v-btn @click="clear">Очистить</v-btn>
					</v-row>
					<v-divider></v-divider>
					<v-row>
						<v-autocomplete
								:items="menuSrc"
								item-text="name"
								item-value="id"
								v-model="newOrderItemID"
						>
						</v-autocomplete>
						<v-btn @click="addMenuToOrder">Добавить</v-btn>
					</v-row>
					<v-divider></v-divider>
					<template v-for="item in menu">
						<v-list-item three-line :key="item.id">
							<v-list-item-content>
								<v-list-item-title>{{ item.name }}</v-list-item-title>
								<v-list-item-subtitle>
									{{item.description}}
								</v-list-item-subtitle>
								<v-list-item-subtitle>
									{{item.price}} p
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-divider></v-divider>
					</template>
				</v-card>
			</v-row>
		</v-row>
		<v-error-snack-bar
			:message="errMessage"
			v-model="showErr"
		/>
	</v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ErrorSnackBar from '@/components/ErrorSnackBar.vue';
import QRDecoder from '@/components/QRDecoder.vue';
import * as gql from 'graphql-tag';

export default {
	name: 'make_order',
	components: {
		'v-error-snack-bar': ErrorSnackBar,
		'v-qr-decoder': QRDecoder,
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		clientData() {
			console.log(this.client);
			return this.client;
		},
	},
	data: () => ({
		isLoading: false,
		errMessage: '',
		showErr: false,
		menu: [],
		menuSrc: [],
		newOrderItemID: null,
		client: null,
	}),
	async mounted() {
		try {
			const { data } = await this.$apollo.query({
				query: gql`
					query {
						menus(filter:{status:approved}) {
							docs {
							  id
							  status
							  name
							  price
							}
						}
					}
				`,
			});
			console.log(data);
			if (data.menus) {
				this.menuSrc = data.menus.docs;
			}
 		} catch (e) {
			console.error(e);
			this.errMessage = e.message;
			this.showErr = true;
		}
	},
	methods: {
		addMenuToOrder() {
			const newOrderItemID = this.newOrderItemID;
			const menuItem = this.menuSrc.find(item => item.id === newOrderItemID);
			this.menu.push(menuItem);
		},
		clear() {
			this.client = null;
			this.menu = [];
		},
		async createOrder() {
			const { data } = await this.$apollo.mutate({
				mutation: gql`mutation($order:CreateOrderInput!) {
								create_order(order:$order) {
    									id
    									discounts
    									created_at
    									menus
  									}
						}`,
				variables: {
					order: {
						client: this.client.id,
						menus: this.menu.map(item => item.id),
					},
				},
			});
			console.log(data);
		},
		async getClient() {
			if (!!this.$store.state.QRCode) {
				if (!!this.$store.state.QRCode.id) {
					try {
						const { data } = await this.$apollo.query({
							query: gql`
								query($clientId: String!) {
									 user(id:$clientId) {
									 	id
										name
										email
										phone
										birth_day
										first_name
									}
								}
							`,
							variables: {
								clientId: this.$store.state.QRCode.id,
							},
						});
						if (data.user) {
							this.client = data.user;
							return;
						}
					} catch (e) {
						this.client = null;
					}
				}
			}
			this.client = null;
		},
	},
};

</script>
