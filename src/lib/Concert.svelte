<script lang="ts">
  export let title: string;
  export let slug: string;
  export let subtitle: string;
  export let thumbnail_url: string;
</script>

<article class="concert">
  <h2 class="concert-title"><a href={"concert/"+slug}>{title}</a></h2>
  <span>{subtitle}</span>
</article>

<style>
  .concert-title {
    margin-bottom: 10px;
  }
  .concert-title a {
    text-decoration: none;
  }
  .concert-title a:hover {
    text-decoration: underline;
  }
</style>
