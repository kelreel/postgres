<template>
  <div class="race-view">
    <vuetable
      ref="vuetable"
      :fields="['id', 'name', 'description']"
      :api-mode="false"
      :data="data"
    ></vuetable>
  </div>
</template>

<script>
import Vuetable from "vuetable-2";
import axios from 'axios'
export default {
  components: {
    Vuetable,
  },
  data() {
    return {
      data: []
    }
  },
  mounted() {
    axios.get(`http://localhost:8641/race`).then(res => {
      this.data.data = res;
    }).catch(err => console.log(err))
  }
};
</script>

<style>
</style>