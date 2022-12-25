<script>

    import {Link, Router} from "svelte-navigator";
</script>

<Router>
    <nav>
        <Link class="link" to="/">Home</Link>
        <Link class="link" to="/projects">Projects</Link>
        <Link class="link" to="/projects">Other 2</Link>
        <Link class="link" to="/login">Login &#128100;</Link>
    </nav>
    <hr>
</Router>


<style lang="scss">
  nav {
    background-color: rgba(10, 100, 255, 0.55);
    display: flex;
    align-items: center;
    justify-content: space-around;

    :global(.link) {
      color: black;
      font-size: 2.2em;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

    }
  }

  hr {
    border: 2px solid black;
  }

</style>
