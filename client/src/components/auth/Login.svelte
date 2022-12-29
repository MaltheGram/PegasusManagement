<script>
    import {Link} from "svelte-navigator"
    import {BASE_URL} from "../../stores/globals.js";

    let email = ""
    let password = ""

    const login = async () => {
        await fetch(`${$BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
            credentials: "include"
        })
        location.reload()
    }


</script>

<div class="container">
    <h1>Login</h1>
    <form on:submit|preventDefault={login}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="Bob@mail.com" type="email">

        <label for="password">Password</label>
        <input autocomplete="current-password" bind:value={password} id="password" name="password" placeholder="*******"
               type="password">
        <button type="submit">Login</button>
    </form>
    <h3>Not a user?</h3>
    <p>Sign up
        <Link to="/signup">here!</Link>
    </p>
</div>

<style lang="scss">
  @import "../../styles/forms.css";
</style>
