<template>
  <main class="view">
    <div v-if="hero" class="hero-info">
      <h1>{{hero.name}}</h1>
      <p>{{hero.description}}</p>
      <p class="details">HP: {{hero.hp}} MP: {{hero.mp}}</p>
    </div>
    <h2>Армия</h2>
    <div class="army">
      <vuetable
        ref="vuetable"
        :fields="['id', 'name', 'hp', 'count', 'actions']"
        :api-mode="false"
        :data="army"
        :css="css.table"
        class="table-wrapper"
      >
        <div slot="actions" slot-scope="props">
          <div class="actions-btn">
            <button class="ui small button" @click="switchActionToEdit('army', props.rowData)">
              <i class="edit icon"></i>
            </button>
            <button class="ui small button" @click="onActionDeleteArmy('army', props.rowData)">
              <i class="trash alternate icon"></i>
            </button>
          </div>
        </div>
      </vuetable>
      <div class="action-form">
        <h3>{{action.title}} {{action.item && action.item.name}}</h3>
        <EditArmyForm
          :item_creatureId="action.item && action.item.creatureId"
          :item_hp="action.item && action.item.hp"
          @submit="handleSubmitArmy"
        />
      </div>
    </div>
    <h2>Список заклинаний</h2>
    <div class="army">
      <vuetable
        ref="vuetable"
        :fields="['id', 'name', 'description', 'mp', 'actions']"
        :api-mode="false"
        :data="spells"
        :css="css.table"
        class="table-wrapper"
      >
        <div slot="actions" slot-scope="props">
          <div class="actions-btn">
            <button class="ui small button" @click="onActionDeleteSpell('spell', props.rowData)">
              <i class="trash alternate icon"></i>
            </button>
          </div>
        </div>
      </vuetable>
      <div class="action-form">
        <h3>Добавить заклинание</h3>
        <AddSpellList @submit="handleSubmitSpell" />
      </div>
    </div>
  </main>
</template>

<script>
import Vuetable from "vuetable-2";
import EditArmyForm from "../components/forms/EditArmy";
import AddSpellList from "../components/forms/AddSpellList";
import cssTable from "../utils/css-table";
import http from "../utils/http";
import { CREATE_ACTION, EDIT_ACTION } from "../utils/actions";

export default {
  components: {
    Vuetable,
    EditArmyForm,
    AddSpellList,
  },
  data() {
    return {
      css: cssTable,
      hero: null,
      army: [],
      spells: [],
      action: {
        title: CREATE_ACTION,
        currentId: null,
        item: null,
      },
    };
  },
  mounted() {
    this.getHero();
    this.getArmy();
    this.getSpells();
  },
  methods: {
    onActionDeleteArmy(action, data) {
      http.delete(`/army/${data.id}`).then(() => this.getArmy());
    },
    onActionDeleteSpell(action, data) {
      console.log(data.id);
      http.delete(`/spell_list/${data.id}`).then(() => this.getSpells());
    },
    handleSubmitArmy(data) {
      if (this.action.title === CREATE_ACTION) {
        this.addItemArmy(data);
      } else {
        this.editItemArmy(data);
      }
    },
    handleSubmitSpell(data) {
      http
        .post("/spell_list", {
          ...data,
          heroId: parseInt(this.$route.params.id),
        })
        .then(() => this.getSpells());
    },
    switchActionToEdit(event, data) {
      if (this.action.currentId === data.id) {
        this.switchActionToCreate();
        return;
      }
      this.action.type = event;
      this.action.title = EDIT_ACTION;
      this.action.currentId = data.id;
      this.action.item = data;
    },
    switchActionToCreate() {
      this.action.title = CREATE_ACTION;
      this.action.currentId = null;
      this.action.item = null;
    },
    addItemArmy(data) {
      http
        .post("/army", { ...data, heroId: parseInt(this.$route.params.id) })
        .then(() => this.getArmy());
    },
    editItemArmy(data) {
      http
        .patch(`/army/${this.action.currentId}`, data)
        .then(() => this.getArmy());
    },
    getHero() {
      http
        .get(`/hero/${this.$route.params.id}`)
        .then((res) => (this.hero = res.data));
    },
    getArmy() {
      http
        .get(`/hero/${this.$route.params.id}/army`)
        .then((res) => (this.army = res.data));
    },
    getSpells() {
      http
        .get(`/hero/${this.$route.params.id}/spells`)
        .then((res) => (this.spells = res.data));
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

.army,
.spells {
  margin: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border: 1px dashed black;
}

.hero-info > .details {
  font-weight: 500;
}
</style>