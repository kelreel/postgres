<template>
  <form @submit.prevent="submit" class="edit-race-form">
    <div class="ui input focus">
      <label>Имя</label>
      <input v-model="name" type="text" placeholder="Название" />
    </div>
    <div class="ui input">
      <label>Описание</label>
      <input v-model="description" type="text" placeholder="Описание" />
    </div>
    <button type="submit" class="ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "EditRaceForm",
  props: ["race_name", "race_description"],
  data: () => {
    return {
      name: "",
      description: "",
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    race_name() {
      this.init();
    },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        name: this.name,
        description: this.description,
      });
    },
    init() {
      this.name = this.race_name;
      this.description = this.race_description;
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