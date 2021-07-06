import './style.css'
import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'

const scene = new Scene();

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: '#e0005a'})
const mesh = new Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

const camera = new PerspectiveCamera(75, sizes.width / sizes.height )
// y: up
// y: left
// z: towards us
camera.position.z = 3
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);


console.log('e')