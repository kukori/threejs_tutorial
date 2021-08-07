import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { RectAreaLight } from 'three'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights
// Ambient light is directionless
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#00fffc', 0.3)
scene.add(directionalLight);
directionalLight.position.set(1, 0.25, 0);

const hemisphereLight = new THREE.HemisphereLight('#ff0000', '#0000ff', 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight('#ff9000', 0.5)
pointLight.position.x = 1
pointLight.position.y = -0.5
pointLight.position.z = 1
pointLight.intensity = 2
pointLight.decay = 0.5
scene.add(pointLight)

// only works with MeshStandartMaterial and MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight('#4e00ff', 5, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 1))
scene.add(rectAreaLight)


const spotlight = new THREE.SpotLight('#78ff00', 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotlight.position.set(0, 2, 3)
scene.add(spotlight)

// spotlight position works differently than anything else, lookAt for example doesn't work
// have to add the target to the scene and then modify it's position
scene.add(spotlight.target)
spotlight.target.position.x = -0.75

// Resource cost
// Minimal: AmbientLight, HemisphereLight
// Moderate: DirectionalLight, PointLight
// High: SpotLight, RectAreaLight

// Light Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotlight)
scene.add(spotLightHelper)
window.requestAnimationFrame(() => {
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
window.requestAnimationFrame(() => {
    // rectAreaLightHelper.position.x = rectAreaLight.position.x
    // rectAreaLightHelper.position.y = rectAreaLight.position.y
    // rectAreaLightHelper.position.z = rectAreaLight.position.z
    rectAreaLightHelper.position.copy(rectAreaLight.position)
    rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
    rectAreaLightHelper.update()
})


// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()