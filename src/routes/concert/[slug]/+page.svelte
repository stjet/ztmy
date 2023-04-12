<script lang="ts">
  //imports
  import concerts_metadata from '$lib/data/concerts_metadata.json';
  //todo: import concert type
  
  //exports
  export let data;

  //get concert info
  let slug: string = data.slug;
  /*let concerts_info = concerts_metadata.find((item) => {
    return item.slug === slug;
  });*/
  //
</script>

<div>
  <div>
    <h2>Info</h2>
  </div>
  <div>
    <h2>Setlist</h2>
  </div>
  <div>
    <h2>Video</h2>
  </div>
  <div>
    <h2>Lyrics</h2>
  </div>
</div>
