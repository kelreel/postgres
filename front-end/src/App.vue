<template>
  <div id="app">
    <header>
      <div class="logo">
        <h3>Heroes App</h3>
      </div>
      <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/race">Race</router-link>
      </nav>
    </header>

    <router-view class="router-container" />
  </div>
</template>

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
}

header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e5e5;

  .logo {
    margin-left: 1rem;
    color: #434343;
  }

  nav {
    margin: 10px;
    margin-right: 2rem;

    a {
      text-decoration: none;
      margin-right: 10px;
      color:rgb(41, 41, 41);

      &:hover {
        color: black;
      }
    }
  }
}

.router-container {
  margin-top: 1rem;
}
</style>
