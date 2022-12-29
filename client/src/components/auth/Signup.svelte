<script>
    import {BASE_URL} from "../../stores/globals.js";
    let firstName = ""
    let lastName = ""
    let email = ""
    let password = ""
    let statusCode

    const signUp = async () => {
        fetch(`${$BASE_URL}/api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstName, lastName, email, password})
        })
            .then(res => {
                statusCode = res.status
            })
            .catch(error => {
                console.log(error)
            })
        //location.href = "/"
    }

</script>

<div class="container">
    <h1>Signup</h1>
    <form on:submit|preventDefault={signUp}>
        <label for="firstName">First name</label>
        <input bind:value={firstName} id="firstName" name="firstName" placeholder="Bob" type="text">

        <label for="lastName">First name</label>
        <input bind:value={lastName} id="lastName" name="lastName" placeholder="Bobsen" type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="Bob@mail.com" type="email">

        <label for="password">Password</label>
        <input autocomplete="current-password" bind:value={password} id="password" name="password" placeholder="*******"
               type="password">

        <button type="submit">Signup</button>

        {#if statusCode === 422}
            <p>Unable to sign up. Please try again.</p>
        {/if}

    </form>
</div>

<style>
    @import "../../styles/forms.css";
</style>
