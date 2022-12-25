<script>
    import {BASE_URL} from "../stores/globals.js"
    import AssignmentColums from "./AssignmentColums.svelte";

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

<div class="grid-container">
    <AssignmentColums
            array={openStatusArray}
            title="open"
    />
    <AssignmentColums
            array={analysisStatusArray}
            title="analysis"/>
    <AssignmentColums
            array={backlogStatusArray}
            title="backlog"/>
    <AssignmentColums
            array={inProgressArray}
            title="in progress"
    />
    <AssignmentColums
            array={readyForTestArray}
            title="ready for test"
    />
    <AssignmentColums
            array={readyForDeployArray}
            title="ready for deploy"
    />
</div>

<style lang="scss">
  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    height: 100%;
    background-color: rgba(10, 100, 255, 0.55);
  }
</style>
