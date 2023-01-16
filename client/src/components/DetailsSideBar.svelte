<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    import Modal from "./Modal.svelte"


    // Declared props
    let statusArray = ["Open", "Analysis", "Backlog", "In Progress", "Ready For Test", "Ready For Deploy", "Closed"]

    // Props
    export let id
    export let assignmentStatus
    export let selectedStatus
    export let loggedTime
    export let assignedUser
    export let spentTime

    export let userRole
    let users = []
    let user
    let modal = false


    const getAllUserNames = async () => {
        await fetch(`${$BASE_URL}/api/users`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then((data) => {
                users = data.data
            })
    }
    const changeStatus = async () => {
        await fetch(`${$BASE_URL}/api/projects/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: selectedStatus,
            })
        })
            .then(res => res.json())
            .then(data => {
                assignmentStatus = data.data.project.status

            })
    }

    const assignUser = async () => {
        await fetch(`${$BASE_URL}/api/projects/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                assignedUser: user
            })
        })
            .then(res => res.json())
            .then(data => {
                assignedUser = data.data.project.assignedUser
            })
    }

    const logWork = async () => {
        await fetch(`${$BASE_URL}/api/projects/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loggedTime: loggedTime
            })
        })
            .then(res => res.json())
            .then(data => {
                spentTime = data.data.project.loggedTime
            })
    }

    const deleteAssignment = async () => {
        await fetch(`${$BASE_URL}/api/projects/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => {
                if (res.status === 200) {
                    toastr["success"](`${id} was successfully deleted. Redirecting... ⏳`)
                    setTimeout(() => {
                        location.href = "/projects"
                    }, 1200)
                }
            })
    }
    onMount(
        getAllUserNames
    )
</script>

<div class='status-side-bar'>
    <h1>Details</h1>
    <div>
        <p>Assigned user: {assignedUser}</p>
        <p>Time spent: {spentTime} </p>
    </div>
    {#if userRole}
        <form on:submit|preventDefault={changeStatus}>
            <h3>Current status: {assignmentStatus}</h3>
            <label for="statusOptions">Change Status</label>
            <select bind:value={selectedStatus} id="statusOptions" name="statusOptions">
                {#each statusArray as option}
                    <option value="{option}">{option}</option>
                {/each}
            </select>
            <button type="submit">Change project status</button>
        </form>

        <form on:submit|preventDefault={logWork}>
            <h3>Log time</h3>
            <label for="loggedTime">Log Time</label>
            <input bind:value={loggedTime} id="loggedTime" name="loggedTime" placeholder="Format: 1h 5m 55s"
                   type="text">
            <button type="submit">Log work done</button>
        </form>


        <div class="assignUser">
            <form on:submit|preventDefault={assignUser}>
                <h3>Assign user</h3>
                <select bind:value={user} id="assignUser" name="assignUser">
                    {#each users as user}
                        <option value="{user.fullName}">{user.fullName}</option>
                    {/each}
                </select>
                <button type="submit">Assign user</button>
            </form>
        </div>

        {#if userRole === "admin"}
            <div class="deletion">
                <h4>Delete assignment?</h4>
                <button class on:click={() => modal = true}>
                    <i class="fa fa-trash-o" style="font-size:48px;color:red"></i>
                </button>
            </div>
        {/if}
        {#if modal}
            <Modal on:close={() => modal = false}>
                <div class="modal">
                    <h3>Confirm deletion:</h3>
                    <button class="deletion__yes" on:click={deleteAssignment}>Yes</button>
                    <button class="deletion__no" on:click={() => modal = false}>No</button>
                </div>
            </Modal>
        {/if}
    {/if}
</div>


<style lang="scss">
  .status-side-bar {
    flex-wrap: wrap;
    width: 30%;
    text-align: center;

    h3 {
      text-transform: capitalize;
      margin-bottom: 1em;
    }

    form {
      margin: 1em 0;

      select,
      button,
      label,
      input {
        text-align: center;
        width: 70%;
        margin: auto;
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
          background-color: rgba(206, 197, 197, 0.15);
        }
      }

      button {
        background-color: lightgrey;
      }
    }

    .deletion {
      button {
        background-color: transparent;
        border: none;

        &:hover {
          transform: scale(1.10);
        }
      }

      &__yes {
        background-color: red;
        padding: 1.25em;
        width: 33%;
        border: none;
        color: aliceblue;

        &:hover {
          transform: scale(1.10);
        }
      }

      &__no {
        background-color: green;
        padding: 1.25em;
        width: 33%;
        border: none;
        color: aliceblue;

        &:hover {
          transform: scale(1.10);
        }
      }
    }
  }


</style>
