<script>
    import {BASE_URL} from "../stores/globals.js";
    export let assignmentStatus
    export let selected
    export let statusArray
    export let id
    export let loggedTime

    const changeStatus = async () => {
        await fetch(`${$BASE_URL}/projects`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                status: selected
            })
        })
        location.reload()
    }
    const logWork = async () => {
        await fetch(`${$BASE_URL}/projects`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                loggedTine: loggedTime
            })
        })
    }

</script>

<div class='status-side-bar'>
    <form on:submit|preventDefault={changeStatus}>
        <h1>Details</h1>
        <h3>Current status: {assignmentStatus}</h3>
        <label for="statusOptions">Change Status</label>
        <select bind:value={selected} id="statusOptions" name="statusOptions">
            {#each statusArray as option}
                <option value="{option.toLowerCase()}">{option}</option>
            {/each}
        </select>
        <button type="submit">Change project status</button>
    </form>
    <form on:submit|preventDefault={logWork}>
        <h2>Log time</h2>
        <input bind:value={loggedTime} placeholder="Format: 1h 5m 55s" type="text">
        <button type="submit">Log work done</button>
    </form>
</div>


<style lang="scss">
  .status-side-bar {
    flex-wrap: wrap;
    background-color: orange;
    width: 30%;

    h3 {
      text-transform: capitalize;
      margin-bottom: 1em;
    }

    form {
      select,
      button,
      label,
      input {
        text-align: center;
        width: 100%;
        display: block;
        background-color: transparent;
      }

      select,
      button,
      {
        padding: 5px 10px;
        border: 2px solid black;
        margin-top: 5px;

        &:hover {
          background-color: darkorange;
        }
      }

    }
  }
</style>
