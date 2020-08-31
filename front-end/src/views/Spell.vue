<template>
  <main class="view">
    <h1>Заклинания</h1>
    <vuetable
      ref="vuetable"
      :fields="['id', 'name', 'description', 'mp', 'actions']"
      :api-mode="false"
      :data="data"
      :css="css.table"
      class="table-wrapper"
    >
      <div slot="actions" slot-scope="props">
        <div class="actions-btn">
          <button class="ui small button" @click="switchActionToEdit('view-item', props.rowData)">
            <i class="edit icon"></i>
          </button>
          <button class="ui small button" @click="onActionDelete('view-item', props.rowData)">
            <i class="trash alternate icon"></i>
          </button>
        </div>
      </div>
    </vuetable>
    <div class="action-form">
      <h3>{{action.title}} {{action.item && action.item.name}}</h3>
      <EditSpellForm
        :item_name="action.item ? action.item.name : ''"
        :item_description="action.item ? action.item.description : ''"
        :item_mp="action.item && action.item.mp"
        :item_race="action.item && action.item.raceId"
        @submit="handleSubmit"
      />
    </div>
  </main>
</template>

<script>
import Vuetable from "vuetable-2";
import EditSpellForm from "../components/forms/EditSpell";
import cssTable from "../utils/css-table";
import http from "../utils/http";
import { CREATE_ACTION, EDIT_ACTION } from "../utils/actions";

export default {
  components: {
    Vuetable,
    EditSpellForm,
  },
  data() {
    return {
      css: cssTable,
      data: [],
      action: {
        title: CREATE_ACTION,
        currentId: null,
        item: null,
      }
    };
  },
  mounted() {
    this.updateTable()
  },
  methods: {
    onActionDelete(action, data) {
      http.delete(`/spell/${data.id}`).then(() => this.updateTable());
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
      http.post("/spell", data).then(() => this.updateTable());
    },
    editItem(data) {
      http
        .patch(`/spell/${this.action.currentId}`, data)
        .then(() => this.updateTable());
    },
    updateTable() {
      http
        .get(`/spell`)
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