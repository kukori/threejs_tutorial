import './style.css'
//import { Scene, BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGLRenderer } from 'three'
import * as THREE from 'three'

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: '#e0005a'})
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)


//position is a Vector3
console.log(mesh.position.length())
console.log(mesh.position.distanceTo(new THREE.Vector3(1, 2, 1)))
//sets the length of the vector to 1
mesh.position.normalize()
mesh.position.set(0.7, -0.6, 1)

mesh.scale.x = 0.5

mesh.rotation.reorder('YXZ')
// 90 degree rotation is pi/2, 180 degree is pi
// mesh.rotation.y = 3.14159
mesh.rotation.y = Math.PI/4
mesh.rotation.x = Math.PI/4

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

// camera.lookAt(mesh.position)

console.log(mesh.position.distanceTo(camera.position))

//Group
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#006cad' })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#00dfad' })
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#00dfe3' })
)
cube3.position.x = -2
group.add(cube3)

// move the whole group
group.position.y = 2

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);

console.log('e')