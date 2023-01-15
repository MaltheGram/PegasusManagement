<script>
    import {Route, Router} from "svelte-navigator"
    import Board from "./Board.svelte";
    import AssignmentDetails from "./AssignmentDetails.svelte";
    import Login from "./auth/Login.svelte";
    import Signup from "./auth/Signup.svelte";
    import CreateAssignment from "./CreateAssignment.svelte";
    import Chat from "./Chat.svelte";
</script>

<Router>
    <Route path="/">
        <Chat/>
    </Route>
    <Route path="/projects">
        <Board/>
    </Route>
    <Route path="/projects/:id">
        <AssignmentDetails/>
    </Route>
    <Route path="/create">
        <CreateAssignment/>
    </Route>
    <Route path="/login">
        <h1>Login page WIP</h1>
        <Login/>
    </Route>
    <Route path="/signup">
        <Signup/>
    </Route>
</Router>


