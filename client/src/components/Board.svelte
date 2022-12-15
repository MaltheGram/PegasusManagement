<script>
    import {BASE_URL} from "../stores/globals.js"
    import {MaterialApp} from "svelte-materialify";
    import Assignment from "./Assignment.svelte";

    let assignments = []
    let openStatusArray = []
    let analysisStatusArray = []
    let backlogStatusArray = []
    let inProgressArray = []
    let readyForTestArray = []
    let readyForDeployArray = []


    const fetchProjects = async () => {
        fetch(`${$BASE_URL}/projects`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then((data) => {
                assignments = data.data
                openStatusArray = assignments[0].openStatusArray
                analysisStatusArray = assignments[0].analysisStatusArray
                backlogStatusArray = assignments[0].backlogStatusArray
                inProgressArray = assignments[0].inProgressArray
                readyForTestArray = assignments[0].readyForTestStatusArray
                readyForDeployArray = assignments[0].readyForDeployStatusArray

            })
    }
    fetchProjects()


    let active = false

</script>

<MaterialApp>
    <div class="flex-container">
        <Assignment
                array={openStatusArray}
                title="open"
        />
        <Assignment
                array={analysisStatusArray}
                title="analysis"/>
        <Assignment
                array={backlogStatusArray}
                title="backlog"/>
        <Assignment
                array={inProgressArray}
                title="in progress"
        />
        <Assignment
                array={readyForTestArray}
                title="ready for test"
        />
        <Assignment
                array={readyForDeployArray}
                title="ready for deploy"
        />
    </div>
</MaterialApp>

<style lang="scss">
  .flex-container {
    display: flex;
    justify-content: space-evenly;
    height: 100%;

  }
</style>
