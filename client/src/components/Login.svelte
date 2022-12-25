<script>
    import {Link} from "svelte-navigator"
</script>

<div class="container">
    <form>
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" name="email" placeholder="Bob@mail.com" type="email">

        <label for="password">Password</label>
        <input autocomplete="current-password" id="password" name="password" placeholder="*******"
               type="password">
        <button type="submit">Login</button>
    </form>

    <h3>Not a user?</h3>
    <p>Sign up
        <Link to="/signup">here!</Link>
    </p>

</div>


<style lang="scss">
  .container {
    margin: auto;
    width: 25%;
    text-align: center;

    h1 {
      margin: 1em 0;
    }

    input,
    button {
      width: 100%;
      padding: 1em;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 0.7em;
    }

  }

  .recover-btn {
    margin-top: 0.75em;
    padding: 1em 2.25em;
    width: 100%;

    border: 1px solid #ccc;
    background-color: transparent;
  }

</style>
