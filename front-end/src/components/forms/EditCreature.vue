<template>
  <form @submit.prevent="submit" class="edit-race-form">
    <div class="ui input focus">
      <label>Имя</label>
      <input v-model="name" type="text" placeholder="Название" />
    </div>
    <div class="ui input">
      <label>HP</label>
      <input v-model.number="hp" type="number" placeholder="HP" />
    </div>
    <div class="ui input">
      <label>Раса</label>
      <select class="ui search dropdown" v-model="raceId" type="text">
        <option
          v-for="option in races"
          v-bind:value="option.id"
          :key="option.id"
        >{{ option.name }}</option>
      </select>
    </div>
    <button type="submit" class="ui button">Submit</button>
  </form>
</template>

<script>
import http from "../../utils/http";
export default {
  name: "EditCreatureForm",
  props: ["item_name", "item_hp", "item_race"],
  data: () => {
    return {
      name: "",
      hp: 0,
      raceId: 0,
      races: [],
    };
  },
  mounted() {
    this.init();
    http.get("/race").then((res) => (this.races = res.data));
  },
  watch: {
    item_name() {
      this.init();
    },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        name: this.name,
        description: this.description,
        hp: this.hp,
        mp: this.mp,
        raceId: this.raceId
      });
    },
    init() {
      this.name = this.item_name;
      this.description = this.item_description;
      this.hp = this.item_hp;
      this.mp = this.item_mp;
      this.raceId = this.item_race;
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