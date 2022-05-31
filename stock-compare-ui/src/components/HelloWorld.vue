<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
    <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>
</head>
<template>
  <b-container fluid>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <b-form-group
            label="Filter"
            label-for="filter-input">
          </b-form-group>
        </div>
        <div class="col-md-3">
          <b-input-group>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search">
            </b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="col-md-6">
          <b-form-checkbox-group v-model="filterOn">
            <b-form-checkbox value="symbol">Symbol</b-form-checkbox>
            <b-form-checkbox value="company">Company</b-form-checkbox>
          </b-form-checkbox-group>
        </div>
      </div>
    </div>
    <div class="container">
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered">
        <template #cell(price_2007)="row">
          ${{ row.value }}
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" @click="openSidebar(row.item, row.index, $event.target)"">
            {{ row.detailsShowing ? 'Unselect' : 'Select' }}
          </b-button>
        </template>
      </b-table>
    </div>
    <b-sidebar id="my-sidebar">
      <b-card :id="infoCard.id" :title="infoCard.title">
        <pre>{{ infoCard.content }}</pre>
      </b-card>
    </b-sidebar>
  </b-container>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js"></script>
<script src="https://unpkg.com/bootstrap-vue@2.17.1/dist/bootstrap-vue.js"></script>
<script>
/* eslint-disable */
import axios from 'axios'
const baseURI = 'http://localhost:3000/'
export default {
  data: () => ({
    fields: [
      { key: 'symbol', label: 'Symbol' },
      { key: 'company', label: 'Company' },
      { key: 'description', label: 'Description' },
      { key: 'price_2007', label: 'Price', class: 'text-center' },
      { key: 'actions', label: '' }
    ],
    items: null,
    filter: null,
    filterOn: [],
    totalRows: 1,
    currentPage: 1,
    infoCard: {
          id: 'info-card',
          title: '',
          content: ''
        }
  }),
  created () {
    axios.get(baseURI + 'stocks').then((result) => {
      this.items = result.data.stocks
    })
  },
  methods: {
    onFiltered (filteredItems) {
    },
    openSidebar(item, index, button) {
      this.infoCard.title = `Symbol: ${item.symbol}`
      this.infoCard.content = `Company: ${item.company}
      Initial price: $${item.initial_price}
      Price in 2002: $${item.price_2002}`
      this.$root.$emit('bv::toggle::collapse', 'my-sidebar')
    }
  }
}
</script>
