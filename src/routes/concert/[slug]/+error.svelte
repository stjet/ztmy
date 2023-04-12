<script>
  import { page } from '$app/stores';
</script>

<h1>{$page.status}: {$page.error?.message}</h1>

<style>
  h1 {
    text-align: center;
    /* perfectly center error */
    margin-top: calc(50vh - 2em);
  }
</style>
