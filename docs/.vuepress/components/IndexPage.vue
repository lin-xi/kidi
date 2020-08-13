<template>
  <div class="index-page">
    <div class="cover">
      <img src="../public/images/skateboy.png" />
    </div>
    <div class="menu">
      <div class="item">
        <img src="../public/images/skate.png" />
        <a href="/guide/5min.html">快速入门</a>
      </div>
      <div class="item">
        <img src="../public/images/earphone.png" />
        <a href="/api/index.html">API</a>
      </div>
      <div class="item">
        <img src="../public/images/hat.png" />
        <a href="/cli/index.html">CLI</a>
      </div>
      <div class="item">
        <img src="../public/images/game.png" />
        <a href="https://github.com/lin-xi/kidi">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index-page",
  props: {
    name: { type: String, required: true },
  },
};
</script>

<style scoped lang="less">
.index-page {
  .cover {
    width: 100%;
    text-align: center;
    img {
      width: 60%;
    }
  }
  .menu {
    display: flex;
    border: 1px #f0f0f0 solid;
    .item {
      flex: 1;
      border-right: 1px #f0f0f0 solid;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 30px;
      padding: 20px;

      img {
        width: 128px;
        height: 128px;
      }

      &:last-child {
        border-right: none;
      }
      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }
  }
}
</style>
