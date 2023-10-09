import { Mesh } from "three";
import LinkedList from "./LinkedList";
import ListNode from "./ListNode";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { MeshNormalMaterial } from "three";
import { Vector3 } from "three";

const NODE_GEOMETRY = new RoundedBoxGeometry(0.9, 0.9, 0.9, 5, 0.1)
const NODE_MATERIAL = new MeshNormalMaterial()


const UP = new Vector3(0,0,-1)
const DOWN = new Vector3(0,0,1)
const LEFT = new Vector3(-1,0,0)
const RIGHT = new Vector3(1,0,0)

export default class Snake {

    direction = UP

    constructor({ scene, resolution = new Vector2(10,10) }){
        this.scene = scene
        this.resolution = resolution
        const head = new ListNode(new SnakeNode())
        head.data.mesh.position.x = resolution.x / 2
        head.data.mesh.position.z = resolution.y / 2
        this.body = new LinkedList(head)

        for (let index = 0; index < 3; index++) {
            this.addTailNode()
            
        }
        scene.add(head.data.mesh)
    }

    get head(){
        return this.body.head
    }

    get end(){
        return this.body.end
    }

    update(){

        let currentNode = this.end

        while(currentNode.prev){
            const position = currentNode.prev.data.mesh.position
            currentNode.data.mesh.position.copy(position)

            currentNode = currentNode.prev
        }

        currentNode.data.mesh.position.add(this.direction)
    }

    addTailNode(){
        const node = new ListNode(new SnakeNode())
        const position = this.end.data.mesh.position.clone()
        position.sub(this.direction)
        node.data.mesh.position.copy(position)
        this.body.addNode(node)
        this.scene.add(node.data.mesh)
    }
}

class SnakeNode {
    constructor(){
        this.mesh = new Mesh(NODE_GEOMETRY,NODE_MATERIAL)
    }
}