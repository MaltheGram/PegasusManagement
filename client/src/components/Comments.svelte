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
            .then(data => {
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
            .then(res => res.json())
            .then(data => {
                allComments = [...allComments, data.data]
            })
    }

    const deleteComment = async (id) => {
        await fetch(`${$BASE_URL}/api/comments/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                allComments = allComments.filter(comment => comment.id !== data.id)
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
                <p>Title: {comment.commentTitle}</p>
                <p>Content: {comment.commentContent}</p>
                <p>Author: {comment.author}</p>
                <p>Comment id: {comment._id}</p>
                <div class="deletion">
                    <h4>Delete comment?</h4>
                    <button on:click={deleteComment(comment._id)}>
                        <i class="fa fa-trash-o" style="font-size:48px;color:red"></i>
                    </button>
                </div>
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
      border: 2px solid black;
      margin: 2em 0;
    }
  }

  .deletion {
    button {
      background-color: transparent;
      border: none;

      &:hover {
        transform: scale(1.10);
      }
    }

    &__yes {
      background-color: red;
      padding: 1.25em;
      width: 33%;
      border: none;
      color: aliceblue;

      &:hover {
        transform: scale(1.10);
      }
    }

    &__no {
      background-color: green;
      padding: 1.25em;
      width: 33%;
      border: none;
      color: aliceblue;

      &:hover {
        transform: scale(1.10);
      }
    }
  }


</style>
