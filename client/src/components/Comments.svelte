<script>
    import {BASE_URL} from "../stores/globals.js";
    import {onMount} from "svelte";
    let commentTitle
    let commentContent

    let projectID = location.pathname.split("/")[2]
    let allComments = []

    const getAllComments = async () => {
        await fetch(`${$BASE_URL}/api/comments/${projectID}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then((data) => {
                allComments = data.data
            })
    }

    const postComment = async () => {
        await fetch(`${$BASE_URL}/api/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({commentTitle, commentContent, projectID})
        })
            .then(res => {
                if (res.status === 200) {
                    toastr["success"](`Added new comment: ${commentTitle}`)
                    setTimeout(() => {
                        location.reload()
                    }, 1200)
                }
            })
    }

    onMount(
        getAllComments
    )

</script>


<div>
    <div class="container">
        <form on:submit|preventDefault={postComment}>
            <label for="title">Comment title</label>
            <input bind:value={commentTitle} id="title" name="title" required type="text">

            <label for="comment">Comment</label>
            <textarea bind:value={commentContent} cols="30" id="comment" name="comment" required rows="5"></textarea>

            <button type="submit">Submit comment</button>
        </form>
    </div>

    <div class="comment-container">
        {#each allComments as comment}
            <div class="comment">

                <p>{comment.projectID}</p>
                <p>{comment.commentTitle}</p>
                <p>{comment.commentContent}</p>
            </div>
        {/each}
    </div>
</div>


<style lang="scss">
  @import "../styles/forms.css";


  .container {
    width: 60%;
    margin-top: 50vh;

  }

  .comment-container {
    text-align: center;

    .comment {
      margin: 2em 0;
    }
  }


</style>
