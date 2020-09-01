<template>
  <form @submit.prevent="submit" class="edit-race-form">
    <div class="ui input">
      <label>Существо</label>
      <select class="ui search dropdown" v-model="creatureId" type="text">
        <option v-for="option in creatures" v-bind:value="option.id" :key="option.id">{{ option.name }} ({{option.hp}} HP)</option>
      </select>
    </div>
    <div class="ui input">
      <label>Количество</label>
      <input v-model.number="count" type="number" placeholder="Count" />
    </div>
    <button type="submit" class="ui button">Submit</button>
  </form>
</template>

<script>
import http from "../../utils/http";
export default {
  name: "EditArmyForm",
  props: ["item_creatureId", "item_count"],
  data: () => {
    return {
      count: 0,
      creatureId: 0,
      creatures: [],
    };
  },
  mounted() {
    this.init();
    http.get("/creature").then((res) => (this.creatures = res.data));
  },
  watch: {
    item_creatureId() {
      this.init();
    },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        creatureId: this.creatureId,
        count: this.count
      });
    },
    init() {
      this.creatureId = this.item_creatureId,
      this.count = this.item_count
    },
  },
};
</script>

<style lang="scss">
.edit-race-form {
  display: flex;
  flex-flow: column wrap;

  .input {
    display: flex;
    flex-flow: column wrap;
    align-items: start;
    margin-bottom: 10px;

    label {
      margin-bottom: 7px;
    }

    input {
      width: 100%;
    }
  }
}
</style>