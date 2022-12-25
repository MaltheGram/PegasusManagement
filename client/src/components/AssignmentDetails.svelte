<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    import StatusSideBar from "./StatusSideBar.svelte";

    // Declared data (TODO: If time, provide this from the API)
    let statusArray = ["Open", "Analysis", "Backlog", "In Progress", "Ready For Test", "Ready For Deploy"]
    const notSpecified = "not specified"

    // Data from API
    let id = "ID not given\nSomething went wrong ⛔️"
    let selected
    let assignmentStatus = notSpecified
    let assignmentName = notSpecified
    let assignmentDescription = notSpecified


    const initialize = async () => {
        id = location.pathname.split("/")[2]
        fetch(`${$BASE_URL}/projects/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => {
                const context = data.data[0]
                assignmentStatus = context?.status || `Status ${notSpecified}`
                assignmentName = context?.name || `Name ${notSpecified}`
                assignmentDescription = context?.description || `Description ${notSpecified}`
            })
    }


    onMount(async () => {
        await initialize()
    })

</script>

<div class='flex-container'>
    <div class='content column'>
        <h2>{assignmentName}</h2>
        <p>{assignmentDescription}</p>
    </div>
    <StatusSideBar
            assignmentStatus="{assignmentStatus}"
            id="{id}"
            selected="{selected}"
            statusArray="{statusArray}"
    />
</div>


<style lang="scss">
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .column {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .content {
      width: 70%;
      background-color: red;

      h2 {
        margin-bottom: 1em;

      }

    }


  }


</style>
