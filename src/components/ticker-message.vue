<template>
  <transition name="slide-top">
    <div v-if="ticker" class="ticker-wrap">
      <span class="ticker">
        <icon :symbol="tickerIcon"></icon>
        {{ticker}}
      </span>
      <btn v-for="b in buttons" :key="b.label" :icon="b.icon" @click="b.action">{{b.label}}</btn>
      <btn force-small @click="$emit('ignore')" icon="check"></btn>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    ticker: [String, Boolean],
    tickerIcon: String,
    buttons: Array,
    tickerTimeout: {
      type: Number,
      default: 5000
    }
  },
  updated () {
    if (this.ticker) {
      setTimeout(() => {
        this.$emit('ignore')
      }, this.tickerTimeout)
    }
  }
}
</script>

<style scoped lang="stylus">
.ticker-wrap
  display flex
  align-items center
  flex-wrap wrap
  position fixed
  z-index 15
  top 1em
  left 0
  right 0
  width max-content
  max-width 80%
  margin auto
  padding .2em 1em
  border-radius 2em
  color hsl(150, 100%, 70%)
  border 2px solid hsl(150, 80%, 50%)
  background-color #1e2430
  animation pulse 2s infinite

@keyframes pulse
  from
    box-shadow 0 0 0 hsl(150, 80%, 50%)

  50%, 100%
    box-shadow 0 0 0 1em transparent

.ticker
  display inline-block
  margin 0 1em
  border-radius 1em

.slide-top-enter-active
  transition .6s cubic-bezier(0.190, 1.000, 0.220, 1.000)
.slide-top-leave-active
  transition .1s ease-in

.slide-top-leave-to
  opacity 0
  transform translateY(-100%)
.slide-top-enter
  opacity 0
  transform translateY(-100%)
</style>
