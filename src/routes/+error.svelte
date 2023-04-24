<script>
  import { page } from '$app/stores';
</script>

<div>
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>

<style>
  div {
    /* perfectly center error */
    margin-top: calc(50vh - 9em);
  }

  div h1, div p {
    text-align: center;
    margin: 0;
  }

  div h1 {
    font-size: 8em;
    text-shadow: 3px 2px 2px #c7c9c7;
  }
</style>
