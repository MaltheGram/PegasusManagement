<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    import io from "socket.io-client";
    import DetailsSideBar from "./DetailsSideBar.svelte";
    import Comments from "./Comments.svelte";

    // Declared data (TODO: If time, provide this from the API)
    const notSpecified = "not specified"

    // Data from API
    //export let id = "ID not given\nSomething went wrong ⛔️"
    let assignmentStatus = notSpecified
    let assignmentName = notSpecified
    let assignmentDescription = notSpecified
    let assignedUser = notSpecified
    let spentTime = notSpecified
    let connectionCounter
    let id = location.pathname.split("/")[2] || "Something went wrong ⛔"


    const handleSocket = () => {
        let socket
        socket = io($BASE_URL)
        socket.on("connect", () => {
            socket.on(`user connected`, data => {
                connectionCounter = data
                /*if (connectionCounter > 1) {
                    toastr["warning"](`${connectionCounter} people is currently looking at this ticket`)
                }

                 */
            })
        })
        socket.on("disconnect", () => {
            socket.on("user disconnected", data => {
                connectionCounter = data
            })
        })
    }


    const initialize = async () => {
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
            <!-- <h1>Connections: {connectionCounter}</h1> -->
            <h2>{assignmentName}</h2>
            <p>{assignmentDescription}</p>
        </div>
    </div>
    <div class="vl"></div>
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
      width: 65%;

      .content {
        margin: 0 5em;
        text-align: center;

        h2 {
          margin-bottom: 1em;

        }
      }
    }

    .vl {
      border-left: 6px solid green;
    }
  }


</style>
