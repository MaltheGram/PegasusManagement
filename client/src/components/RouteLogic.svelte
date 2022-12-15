<script>
    import {Route, Router} from "svelte-navigator"
    import Column from "./Board.svelte";
</script>

<Router>
    <Route path="/">
    </Route>
    <Route path="/projects">
        <Column/>
    </Route>
</Router>


