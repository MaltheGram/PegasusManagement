<script>

    import {navigate} from "svelte-navigator";
    import {BASE_URL} from "../stores/globals.js";
    let name, description

    const createAssignment = async () => {
        await fetch(`${$BASE_URL}/api/projects`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description})
        })
            .then(res => {
                if (res.status === 200) {
                    toastr["success"](`Success: ${name} was created`)
                    setTimeout(() => {
                        navigate("/projects")
                    }, 1200)
                }
            })
            .catch(() => {
                toastr["error"]("Error: Failed to create new assignment")
            })
    }


</script>


<div class="container">
    <form on:submit|preventDefault={createAssignment}>
        <label for="name">Assignment Name</label>
        <input bind:value={name} id="name" name="name" type="text">

        <label for="description">Description</label>
        <textarea bind:value={description} id="description" name="description" rows="20"></textarea>

        <button type="submit">Submit assignment</button>


    </form>
</div>


<style lang="scss">
  @import "../styles/forms.css";
</style>
