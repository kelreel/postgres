<template>
  <div id="app">
    <header>
      <div v-on:click="gohome" class="logo">
        <img src="./assets/homm_logo.png" />
        <h3>Heroes App</h3>
      </div>
      <nav id="nav">
        <!-- <router-link to="/">Hero</router-link> -->
        <router-link to="/race">Race</router-link>
        <router-link to="/creature">Creature</router-link>
        <router-link to="/spell">Spell</router-link>
      </nav>
    </header>

    <router-view class="router-container" />
  </div>
</template>

<script>
export default {
  methods: {
    gohome: function () {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-flow: column wrap;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e5e5;

  .logo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    color: #434343;
    cursor: pointer;

    &:hover {
      color: rgb(116, 116, 116);
    }

    h3 {
      margin-bottom: 1.6rem;
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 15px;
    }
  }

  nav {
    margin: 10px;
    margin-right: 2rem;

    a {
      text-decoration: none;
      font-size: 1.2rem;
      margin-right: 20px;
      color: rgb(41, 41, 41);

      &.router-link-active {
        text-decoration: underline;
      }

      &:hover {
        color: rgb(116, 116, 116);
      }
    }
  }
}

.router-container {
  margin-top: 1rem;
}
</style>
