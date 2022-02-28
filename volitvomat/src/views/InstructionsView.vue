<template>
  <div>
    <header>
      <h1>Kako rešujem?</h1>
    </header>
    <div class="divider"></div>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
      error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
      ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
      numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
      quaerat voluptatem.
    </p>
    <div class="button-wrapper">
      <RouterLink to="/vprasanje/0" class="white-button">
        <div>
          Razumem, pokaži mi<br />prvo vprašanje.
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
header h1 {
  text-transform: uppercase;
  padding: 20px 0;
  font-family: 'Bangers', cursive;
  font-size: 38px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 3px;
}
.white-button {
  font-size: 24px;
}
</style>
