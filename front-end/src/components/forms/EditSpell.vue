<template>
  <form @submit.prevent="submit" class="edit-race-form">
    <div class="ui input focus">
      <label>Имя</label>
      <input v-model="name" type="text" placeholder="Название" />
    </div>
    <div class="ui input focus">
      <label>Описание</label>
      <input v-model="description" type="text" placeholder="Описание" />
    </div>
    <div class="ui input">
      <label>MP</label>
      <input v-model.number="mp" type="number" placeholder="MP" />
    </div>
    <button type="submit" class="ui button">Submit</button>
  </form>
</template>

<script>
// import http from "../../utils/http";
export default {
  name: "EditSpellForm",
  props: ["item_name", "item_description", "item_mp"],
  data: () => {
    return {
      name: "",
      description: "",
      mp: 0,
    };
  },
  mounted() {
    this.init();
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
        mp: this.mp,
      });
    },
    init() {
      this.name = this.item_name;
      this.description = this.item_description;
      this.mp = this.item_mp;
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