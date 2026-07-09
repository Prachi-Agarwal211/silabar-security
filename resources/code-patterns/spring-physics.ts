// Mass-Spring-Damper Physics
// No dependencies — pure JS physics for smooth spring animations

export interface SpringConfig {
  mass: number      // Higher = heavier, slower response
  stiffness: number // Higher = snappier, more bounce
  damping: number   // Higher = less bounce, settles faster
}

export interface SpringState {
  value: number
  velocity: number
  target: number
}

export const defaultSpring: SpringConfig = {
  mass: 1,
  stiffness: 100,
  damping: 10
}

// Create a spring system
export function createSpring(config: SpringConfig = defaultSpring): {
  state: SpringState
  setTarget: (target: number) => void
  update: (dt: number) => number
  snap: () => void
} {
  const state: SpringState = { value: 0, velocity: 0, target: 0 }

  function setTarget(target: number) {
    state.target = target
  }

  function update(dt: number): number {
    // Clamp dt to avoid physics explosion on tab switch
    const clampedDt = Math.min(dt, 0.05)
    const { mass, stiffness, damping } = config

    const force = (state.target - state.value) * stiffness
    const damper = -state.velocity * damping
    const acceleration = (force + damper) / mass

    state.velocity += acceleration * clampedDt
    state.value += state.velocity * clampedDt

    // Snap if very close to target and nearly stopped
    if (Math.abs(state.value - state.target) < 0.001 && Math.abs(state.velocity) < 0.001) {
      state.value = state.target
      state.velocity = 0
    }

    return state.value
  }

  function snap() {
    state.value = state.target
    state.velocity = 0
  }

  return { state, setTarget, update, snap }
}

// Usage:
// const spring = createSpring({ mass: 1, stiffness: 120, damping: 12 })
// spring.setTarget(100)
// function loop(dt) { const val = spring.update(dt); element.style.transform = `translateX(${val}px)` }
