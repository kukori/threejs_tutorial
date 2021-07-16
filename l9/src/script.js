import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height =  window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}) 

window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}) 

// Scene
const scene = new THREE.Scene()
const geometry2 = new THREE.BoxBufferGeometry(4, 4, 4, 2, 2, 2)
const geometry = new THREE.BufferGeometry()

// const vertices = new Float32Array([
//     0,0,0,
//     0,1,0,
//     1,0,0,
// ])

const count = 500
const vertices = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++) {
    vertices[i] = (Math.random() - 0.5) * 4
}

geometry.setAttribute( 'position', new THREE.BufferAttribute(vertices, 3));


const material = new THREE.MeshBasicMaterial({ color: '#00dfad', wireframe: true})

// Object
const mesh = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry2, material)
scene.add(mesh)
scene.add(mesh2)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// to prevent perf issues we limit the PR to max 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()