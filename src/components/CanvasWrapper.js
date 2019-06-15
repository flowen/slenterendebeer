import React, { Suspense, useRef, useState, useMemo, useCallback } from 'react'
import { Canvas, useThree, useRender, extend, Vector3 } from 'react-three-fiber'
import { useSpring } from 'react-spring'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import modelPath from '../assets/gltf/bear_v1.gltf'

function Model({ file }) {
  const [obj, set] = useState()

  useMemo(
    async () =>
      await new GLTFLoader().load(file, (res) => {
        const { scene } = res
        set(scene)
      }),
    [file]
  )

  return obj ? <primitive object={obj} /> : null
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}

// function Controls(props) {
//   const { camera } = useThree()
//   const controls = useRef()
//   useRender(() => controls.current && controls.current.update())
//   return <orbitControls ref={controls} args={[camera]} {...props} />
// }

function CirclingLight() {
  const ref = useRef()
  let t = 0.1

  useRender(() => {
    t = t + 0.01
    ref.current.position.set(10, Math.sin(Math.PI * t) * 20 + 100, 20)
  })

  return <spotLight ref={ref} intensity={0.8} />
}

function Scene({ top, mouse }) {
  console.log(top, mouse)
  const { size } = useThree()
  // const scrollMax = size.height * 4.5

  return (
    <>
      <Suspense fallback={<Box />}>
        <Model file={modelPath} />
      </Suspense>
      <CirclingLight />
    </>
  )
}

const CanvasWrapper = () => {
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    []
  )
  const onScroll = useCallback((e) => set({ top: e.target.scrollTop }), [])

  return (
    <Canvas
      onScroll={onScroll}
      onMouseMove={onMouseMove}
      className="threejs-canvas"
      //children // Either a function child (which receives state) or regular children
      //gl                         // Props that go into the default webGL-renderer
      camera={{ position: [0, 20, 40] }} // Props that go into the default camera
      //raycaster                     // Props that go into the default raycaster
      //orthographic = false          // Creates an orthographic camera if true
      //pixelRatio = undefined        // You could provide window.devicePixelRatio if you like
      //invalidateFrameloop = false   // When true it only renders on changes, when false it's a game loop
      //updateDefaultCamera = true    // Adjusts default camera on size changes
      //onCreated // Callback when vdom is ready (you can block first render via promise)
    >
      {/* <Controls
        enableDamping
        enablePan={false}
        dampingFactor={0.1}
        rotateSpeed={0.1}
        maxPolarAngle={Math.PI / 2}
      /> */}

      <Scene top={top} mouse={mouse} />
    </Canvas>
  )
}

export default CanvasWrapper
