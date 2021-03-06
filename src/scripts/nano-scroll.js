export default function nanoScroll (targetY, alpha, callback) {
  function lerp (v0, v1, t) {
    return v0 * (1 - t) + v1 * t
  }
  alpha = alpha || 0.2
  var raf
  var posY = pageYOffset
  if (targetY < 0) {
    targetY = 0
  }
  var max = document.body.scrollHeight - window.innerHeight
  if (targetY > max) {
    targetY = max
  }
  function loop () {
    if (Math.floor(posY) >= targetY - 1 && Math.floor(posY) <= targetY + 1) {
      cancelAnimationFrame(raf)
      window.scrollTo(pageXOffset, targetY)
      if (callback) callback()
    } else {
      posY = lerp(posY, targetY, alpha)
      window.scrollTo(pageXOffset, posY)
      raf = requestAnimationFrame(loop)
    }
  }
  loop()
}
