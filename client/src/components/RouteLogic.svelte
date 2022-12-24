<script>
    import {Route, Router} from "svelte-navigator"
    import Column from "./Board.svelte";
    import AssignmentDetails from "./AssignmentDetails.svelte";
</script>

<Router>
    <Route path="/">
    </Route>
    <Route path="/projects">
        <Column/>
    </Route>
    <Route path="/projects/:id">
        <AssignmentDetails/>
    </Route>
</Router>


