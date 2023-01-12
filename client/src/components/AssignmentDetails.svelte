<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    import io from "socket.io-client";
    import DetailsSideBar from "./DetailsSideBar.svelte";

    // Declared data (TODO: If time, provide this from the API)
    const notSpecified = "not specified"

    // Data from API
    let id = "ID not given\nSomething went wrong ⛔️"
    let assignmentStatus = notSpecified
    let assignmentName = notSpecified
    let assignmentDescription = notSpecified
    let assignedUser = notSpecified
    let spentTime = notSpecified


    let socket
    onMount(async () => {
        socket = io($BASE_URL)
        socket.on("connect", () => {
            console.log("Connected to socket io server")
        })
    })

    const initialize = async () => {
        id = location.pathname.split("/")[2]
        fetch(`${$BASE_URL}/api/projects/${id}`, {
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
                assignedUser = context?.assignedUser || `Assigned user is ${notSpecified}`
                spentTime = context?.loggedTime || `Logged time is ${notSpecified}`


            })
    }


    onMount(async () => {
        await initialize()
    })

</script>

<div class='flex-container'>
    <div class='wrapper'>
        <div class="content">
            <h2>{assignmentName}</h2>
            <p>{assignmentDescription}</p>
        </div>
    </div>
    <DetailsSideBar
            assignedUser={assignedUser}
            assignmentStatus={assignmentStatus}
            id={id}
            spentTime={spentTime}


    />
</div>


<style lang="scss">
  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100vh;

    .wrapper {
      width: 70%;
      background-color: red;

      .content {
        margin: 0 5em;
        text-align: center;

        h2 {
          margin-bottom: 1em;

        }
      }
    }
  }


</style>
