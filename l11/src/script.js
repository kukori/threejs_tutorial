import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Texture
const LoadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(LoadingManager)
// const colorTexture = textureLoader.load('/door/color.jpg')
// const colorTexture = textureLoader.load('/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/checkerboard-8x8.png')
const colorTexture = textureLoader.load('/minecraft.png')
// const alphaTexture = textureLoader.load('/door/alpha.jpg')
// const heightTexture = textureLoader.load('/door/height.jpg')
// const normalTexture = textureLoader.load('/door/normal.jpg')
// const ambientOcculsionTexture = textureLoader.load('/door/ambientOcculsion.jpg')
// const metalnessTexture = textureLoader.load('/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// // radians
// colorTexture.rotation = Math.PI / 4
// // change pivot center (rotation center) to the middle of the square
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// when we use NearestFilter for minFilter we don't need mipmaping
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
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