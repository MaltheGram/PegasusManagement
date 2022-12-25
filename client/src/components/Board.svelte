<script>
    import {BASE_URL} from "../stores/globals.js"
    import AssignmentColum from "./AssignmentColum.svelte";

    let assignments = []
    let openStatusArray = []
    let analysisStatusArray = []
    let backlogStatusArray = []
    let inProgressArray = []
    let readyForTestArray = []
    let readyForDeployArray = []


    const fetchProjects = async () => {
        fetch(`${$BASE_URL}/api/projects`, {
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


</script>

<div class="grid-container">
    <AssignmentColum
            array={openStatusArray}
            title="open"
    />
    <AssignmentColum
            array={analysisStatusArray}
            title="analysis"/>
    <AssignmentColum
            array={backlogStatusArray}
            title="backlog"/>
    <AssignmentColum
            array={inProgressArray}
            title="in progress"
    />
    <AssignmentColum
            array={readyForTestArray}
            title="ready for test"
    />
    <AssignmentColum
            array={readyForDeployArray}
            title="ready for deploy"
    />
</div>

<style lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }
</style>
