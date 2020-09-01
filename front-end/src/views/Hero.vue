<template>
  <main class="view">
    <h1>Герои</h1>
    <vuetable
      ref="vuetable"
      :fields="['id', 'name', 'description', 'mp', 'hp', 'actions']"
      :api-mode="false"
      :data="data"
      :css="css.table"
      class="table-wrapper"
    >
      <div slot="actions" slot-scope="props">
        <div class="actions-btn">
          <button class="ui small blue button" @click="$router.push(`/hero/${props.rowData.id}`)">
            Info
          </button>
          <button class="ui icon button" @click="switchActionToEdit('view-item', props.rowData)">
            <i class="edit icon"></i>
          </button>
          <button class="ui icon red button" @click="onActionDelete('view-item', props.rowData)">
            <i class="trash alternate icon"></i>
          </button>
        </div>
      </div>
    </vuetable>
    <div class="action-form">
      <h3>{{action.title}} {{action.item && action.item.name}}</h3>
      <EditHeroForm
        :item_name="action.item ? action.item.name : ''"
        :item_description="action.item ? action.item.description : ''"
        :item_hp="action.item && action.item.hp"
        :item_mp="action.item && action.item.mp"
        :item_race="action.item && action.item.raceId"
        @submit="handleSubmit"
      />
    </div>
  </main>
</template>

<script>
import Vuetable from "vuetable-2";
import EditHeroForm from "../components/forms/EditHero";
import cssTable from "../utils/css-table";
import http from "../utils/http";
import { CREATE_ACTION, EDIT_ACTION } from "../utils/actions";

export default {
  components: {
    Vuetable,
    EditHeroForm,
  },
  data() {
    return {
      css: cssTable,
      data: [],
      action: {
        title: CREATE_ACTION,
        currentId: null,
        item: null,
      },
    };
  },
  mounted() {
    this.updateTable();
  },
  methods: {
    onActionDelete(action, data) {
      http.delete(`/hero/${data.id}`).then(() => this.updateTable());
    },
    handleSubmit(data) {
      if (this.action.title === CREATE_ACTION) {
        this.addItem(data);
      } else {
        this.editItem(data);
      }
    },
    switchActionToEdit(event, data) {
      if (this.action.currentId === data.id) {
        this.switchActionToCreate();
        return;
      }
      this.action.title = EDIT_ACTION;
      this.action.currentId = data.id;
      this.action.item = data;
    },
    switchActionToCreate() {
      this.action.title = CREATE_ACTION;
      this.action.currentId = null;
      this.action.item = null;
    },
    addItem(data) {
      http.post("/hero", data).then(() => this.updateTable());
    },
    editItem(data) {
      http
        .patch(`/hero/${this.action.currentId}`, data)
        .then(() => this.updateTable());
    },
    updateTable() {
      http
        .get(`/hero`)
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.view {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
.table-wrapper {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin: 10px;
  padding: 10px;
  max-width: 1200px;

  .ui.celled.table tr td:first-child,
  .ui.celled.table tr th:first-child {
    width: 45px;
  }
}

.actions-btn {
  display: flex;
  flex-flow: row nowrap;

  .button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
.action-form {
  margin: 20px;
  max-width: 400px;
  width: 400px;
}
</style>