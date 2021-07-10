import './style.css'
import * as THREE from 'three'

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
    console.log(cursor)
}) 

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: '#00dfad'})
)
scene.add(mesh)

// Camera
// first param, vertical field of view: 45-75
// second param: aspect ratio 
// 3rd param: near (objects show between these two)
// 4th param: far 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2)  
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    camera.position.x = cursor.x * 3
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()