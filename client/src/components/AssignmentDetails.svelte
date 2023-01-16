<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    import io from "socket.io-client";
    import DetailsSideBar from "./DetailsSideBar.svelte";
    import Comments from "./Comments.svelte";

    const notSpecified = "not specified"

    // Data from API
    let assignmentStatus = notSpecified
    let assignmentName = notSpecified
    let assignmentDescription = notSpecified
    let assignedUser = notSpecified
    let spentTime = notSpecified
    let connectionCounter
    let id = location.pathname.split("/")[2] || "Something went wrong ⛔"
    let userRole
    let author


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
    const getUserSession = async () => {
        await fetch(`${$BASE_URL}/api/session`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                userRole = data.data.role
                author = `${data.data.firstName} ${data.data.lastName}`
            })
    }


    onMount(async () => {
        await initialize()
        await getUserSession()
    })


</script>

<div class='flex-container'>
    <div class='wrapper'>
        <div class="content">
            <h2>{assignmentName}</h2>
            <p>{assignmentDescription}</p>
        </div>
        <Comments
                author={author}
                userRole={userRole}/>
    </div>
    <div class="vl"></div>
    <DetailsSideBar
            assignedUser={assignedUser}
            assignmentStatus={assignmentStatus}
            id={id}
            spentTime={spentTime}
            userRole={userRole}/>
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
      border-left: 6px solid darkgrey;
    }
  }


</style>
