import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

// Debug
const gui = new dat.GUI()
  
// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/matcap.png')
const matcapTexture2 = textureLoader.load('/matcap_2.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Fonts
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    '/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'hello kukori', {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )
        // calculate center:
        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     (Math.abs(textGeometry.boundingBox.min.x) + Math.abs(textGeometry.boundingBox.max.x)) * -0.5,
        //     (Math.abs(textGeometry.boundingBox.min.y) + Math.abs(textGeometry.boundingBox.max.y)) * -0.5,
        //     (Math.abs(textGeometry.boundingBox.min.z) + Math.abs(textGeometry.boundingBox.max.z)) * -0.5

        // )
        // easy way
        textGeometry.center()

        // const material = new THREE.MeshNormalMaterial()
        // const material = new THREE.MeshBasicMaterial()
        // material.wireframe = true
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
    }
)

const torusMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2})
const torusGeometry = new THREE.TorusBufferGeometry(0.2, 0.05, 20, 45)
for(let i = 0; i < 100; i++) {
    const torus = new THREE.Mesh(torusGeometry, torusMaterial)
    torus.position.x = (Math.random() -0.5) * 10
    torus.position.y = (Math.random() -0.5) * 10
    torus.position.z = (Math.random() -0.5) * 10
    torus.rotation.x = Math.random() * Math.PI
    torus.rotation.y = Math.random() * Math.PI
    let scale = Math.random()
    torus.scale.x = scale
    torus.scale.y = scale
    torus.scale.z = scale
    scene.add(torus)
}

// Lights
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight('#ffffff', 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()