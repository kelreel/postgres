<template>
  <main class="view">
    <h1>Расы</h1>
    <vuetable
      ref="vuetable"
      :fields="['id', 'name', 'description', 'actions']"
      :api-mode="false"
      :data="data"
      :css="css.table"
      class="table-wrapper"
    >
      <div slot="actions" slot-scope="props">
        <div class="actions-btn">
          <button class="ui icon button" @click="switchActionToEdit('view-item', props.rowData)">
            <i class="edit icon"></i>
          </button>
          <button class="ui icon button" @click="onActionDelete('view-item', props.rowData)">
            <i class="trash alternate icon"></i>
          </button>
        </div>
      </div>
    </vuetable>
    <div class="action-form">
      <h3>{{action.title}} {{action.item && action.item.name}}</h3>
      <EditRaceForm
        :race_name="action.item ? action.item.name : ''"
        :race_description="action.item ? action.item.description : ''"
        @submit="handleSubmit"
      />
    </div>
  </main>
</template>

<script>
import Vuetable from "vuetable-2";
import EditRaceForm from "../components/forms/EditRace";
import cssTable from "../utils/css-table";
import http from "../utils/http";
import { CREATE_ACTION, EDIT_ACTION } from "../utils/actions";

export default {
  components: {
    Vuetable,
    EditRaceForm,
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
      http.delete(`/race/${data.id}`).then(() => this.updateTable());
    },
    handleSubmit(data) {
      if (this.action.title === CREATE_ACTION) {
        this.addRace(data);
      } else {
        this.editRace(data);
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
    addRace(data) {
      http.post("/race", data).then(() => this.updateTable());
    },
    editRace(data) {
      http
        .patch(`/race/${this.action.currentId}`, data)
        .then(() => this.updateTable());
    },
    updateTable() {
      http
        .get(`/race`)
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
  max-width: 800px;

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