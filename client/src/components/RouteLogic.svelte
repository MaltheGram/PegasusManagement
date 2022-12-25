<script>
    import {Route, Router} from "svelte-navigator"
    import Board from "./Board.svelte";
    import AssignmentDetails from "./AssignmentDetails.svelte";
    import Login from "./Login.svelte";
</script>

<Router>
    <Route path="/">
        <h1>Frontpage</h1>
    </Route>
    <Route path="/projects">
        <Board/>
    </Route>
    <Route path="/projects/:id">
        <AssignmentDetails/>
    </Route>
    <Route path="/login">
        <h1>Login page WIP</h1>
        <Login/>
    </Route>
</Router>


