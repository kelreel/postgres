<template>
  <form @submit.prevent="submit" class="edit-race-form">
    <div class="ui input">
      <label>Заклинание</label>
      <select class="ui search dropdown" v-model="spellId" type="text">
        <option
          v-for="option in spells"
          v-bind:value="option.id"
          :key="option.id"
        >{{ option.name }} ({{option.mp}} MP)</option>
      </select>
    </div>
    <button type="submit" class="ui button">Добавить</button>
  </form>
</template>

<script>
import http from "../../utils/http";
export default {
  name: "EditSpellListForm",
  data: () => {
    return {
      spellId: 1,
      spells: [],
    };
  },
  mounted() {
    http.get("/spell").then((res) => (this.spells = res.data));
  },
  methods: {
    submit() {
      this.$emit("submit", {
        spellId: this.spellId,
      });
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