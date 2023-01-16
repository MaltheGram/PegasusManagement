<script>

    import {Link, navigate, Router} from "svelte-navigator"
    import {BASE_URL} from "../stores/globals.js"
    import {onMount} from "svelte"

    let loggedIn = false
    let userName = "Not logged in"

    export const userStatus = () => {
        fetch(`${$BASE_URL}/api/session`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then((data) => {
                if (data.data.isLoggedIn) {
                    loggedIn = true
                    userName = `${data.data.firstName} ${data.data.lastName}`
                }
            })
    }
    const logOut = () => {
        fetch(`${$BASE_URL}/api/sessiondestroy`, {
            method: "GET",
            credentials: "include"
        })
        setTimeout(() => {
            location.href = "/"
        }, 2000)
        toastr["info"](`Goodbye ${userName}...⌛️`)
    }
    onMount(
        userStatus
    )

</script>

<Router>
    {#if loggedIn}
        <nav>
            <Link class="link" to="/">Home</Link>
            <Link class="link" to="/projects">Projects</Link>
            <Link class="link" to="/create">Create new</Link>
            <Link class="link" on:click={logOut} to="/">Logout</Link>
        </nav>
        <hr>
    {:else }
        <nav>
            <Link class="link" to="/">Home</Link>
            <Link class="link" to="/login">Login &#128100;</Link>
        </nav>
    {/if}
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

      &:hover:not(.user) {
        text-decoration: underline;
      }
    }
  }

  hr {
    border: 2px solid darkgrey;
  }

</style>
