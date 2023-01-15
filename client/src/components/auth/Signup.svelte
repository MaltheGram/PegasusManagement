<script>
    import {BASE_URL} from "../../stores/globals.js";
    import {navigate} from "svelte-navigator";
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
                if (res.status !== 200) {
                    toastr["error"]("Signup failed. Please try again")
                } else if (res.status) {
                    setTimeout(() => {
                        navigate("/projects")
                        location.reload()
                    }, 2500)
                    toastr["success"]("Signup success! Redirecting to projects site...⌛️!")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

</script>

<div class="container">
    <h1>Signup</h1>
    <form on:submit|preventDefault={signUp}>
        <label for="firstName">First name</label>
        <input bind:value={firstName} id="firstName" name="firstName" placeholder="Bob" required type="text">

        <label for="lastName">First name</label>
        <input bind:value={lastName} id="lastName" name="lastName" placeholder="Bobsen" required type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" name="email" placeholder="Bob@mail.com" required type="email">

        <label for="password">Password</label>
        <input autocomplete="current-password" bind:value={password} id="password" name="password" placeholder="*******"
               required
               type="password">

        <button type="submit">Signup</button>
    </form>
</div>

<style>
    @import "../../styles/forms.css";
</style>
