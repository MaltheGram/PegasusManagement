<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    let id = "ID not given\nSomething went wrong ⛔️"
    let object // For test
    let selected
    let status = ["Open", "Analysis", "Backlog", "In Progress", "Ready For Test", "Ready For Deploy"]


    const initialize = async () => {
        id = location.pathname.split("/")[2]
        console.log(id)
        fetch(`${$BASE_URL}/projects/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                object = data.data
            })
    }
    const changeStatus = () => {
        console.log(selected)
        console.log(id)
        fetch(`${$BASE_URL}/projects`, {
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
        toastr["success"]("Project status updates")
    }

    onMount(async () => {
        await initialize()

    })

</script>

<div>
    <div>
        {JSON.stringify(object)}
    </div>
    <form on:submit|preventDefault={changeStatus}>
        <select bind:value={selected} id="statusOptions" name="statusOptions">
            {#each status as option}
                <option value="{option.toLowerCase()}">{option}</option>
            {/each}
        </select>
        <button type="submit">Change project status</button>
    </form>
</div>
