<template>
  <button :class="[variantClass, {'btn-icon-only': iconOnly}]"
    @click="$emit('click')"
    @mousedown="press"
    @mouseup="release"
    @mouseleave="leave"
  >
    <icon v-if="icon" :symbol="icon"></icon>
    <slot></slot>
  </button>
</template>

<script>
import dynamics from 'dynamics.js'
export default {
  props: {
    icon: String,
    variant: {
      type: String,
      default: 'green'
    },
    forceSmall: Boolean
  },
  computed: {
    variantClass () {
      return `btn-${this.variant}`
    },
    iconOnly () {
      return !this.$slots.default && !this.forceSmall
    }
  },
  methods: {
    press () {
      dynamics.animate(this.$el, {
        scale: 0.9
      }, {
        type: dynamics.spring,
        frequency: 220,
        friction: 170,
        duration: 500
      })
    },
    release () {
      dynamics.animate(this.$el, {
        scale: 1
      }, {
        type: dynamics.spring,
        frequency: 220,
        friction: 170,
        duration: 700
      })
    },
    leave () {
      dynamics.animate(this.$el, {
        scale: 1
      }, {
        duration: 300
      })
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../stylus/unified-color"

button
  font-family Noto Sans
  padding 0.3em 1em
  margin 0.3em
  border-radius 2em
  color #fff
  border-width 2px
  border-style solid
  outline none
  transition-property border-color
  transition-duration: 0.5s
  user-select none
  &:focus
    &:not(:hover)
      border-color currentColor
      animation pop .5s
  &:hover
    &:not([disabled])
      border-color currentColor
      transition-duration 0.15s

for style, hue in palette
  .btn-{style}:not([disabled])
    border-color: ln(hue)
    background-color: bg(hue)

.btn-icon-only
  font-size 1.5em
  padding 0em .3em

</style>
