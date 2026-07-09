// Scroll-Controlled 3D Camera Path

import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface CameraKeyframe {
  position: { x: number; y: number; z: number }
  target: { x: number; y: number; z: number }
  ease?: string
}

export function createScrollCamera(
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  options: {
    trigger: string
    keyframes: CameraKeyframe[]
    scrub?: number
    duration?: string
  }
) {
  const { trigger, keyframes, scrub = 1.5, duration = '+=300%' } = options
  const lookTarget = new THREE.Vector3()

  // Create intermediate object for GSAP to animate (can't animate camera directly in all cases)
  const cameraProxy = {
    px: camera.position.x,
    py: camera.position.y,
    pz: camera.position.z,
    tx: lookTarget.x,
    ty: lookTarget.y,
    tz: lookTarget.z
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      pin: true,
      start: 'top top',
      end: duration,
      scrub,
      invalidateOnRefresh: true
    }
  })

  keyframes.forEach((kf, i) => {
    tl.to(cameraProxy, {
      px: kf.position.x,
      py: kf.position.y,
      pz: kf.position.z,
      tx: kf.target.x,
      ty: kf.target.y,
      tz: kf.target.z,
      ease: kf.ease || 'power2.inOut',
      onUpdate: () => {
        camera.position.set(cameraProxy.px, cameraProxy.py, cameraProxy.pz)
        lookTarget.set(cameraProxy.tx, cameraProxy.ty, cameraProxy.tz)
        camera.lookAt(lookTarget)
      }
    })
  })

  return tl
}

// Usage:
// const tl = createScrollCamera(camera, scene, {
//   trigger: '.scene',
//   keyframes: [
//     { position: { x: 0, y: 2, z: 8 }, target: { x: 0, y: 0, z: 0 }, ease: 'smooth' },
//     { position: { x: 3, y: 1, z: 5 }, target: { x: 0, y: 0, z: 0 }, ease: 'smooth' }
//   ]
// })
