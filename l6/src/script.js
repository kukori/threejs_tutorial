import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#e0005a'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )
// y: up
// y: left
// z: towards us
camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)

// let clock = new THREE.Clock()
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2})
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0})

const tick = () => {

    // const elapsedTime = clock.getElapsedTime()

    // // 1 rotation / second
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    // mesh.rotation.x = elapsedTime
    // mesh.rotation.z = elapsedTime

    // mesh.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()