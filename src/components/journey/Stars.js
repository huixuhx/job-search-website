import * as THREE from "three";
import * as CONST from "@/components/journey/const";

export default class Stars extends THREE.Group {
  constructor() {
    super();
    this.createStars();
  }

  update() {
    // this.rotation.y += 0.0005;
    this.rotation.y += 0.006;
  }

  createStars() {
    const geometry = new THREE.BufferGeometry();
    const size = 3000;
    const numOfStars = 800;
    let points = [];

    for (let i = 0; i < numOfStars; i += 3) {
      points.push(
        new THREE.Vector3(
          size * (Math.random() - 0.5),
          size * (Math.random() - 0.5),
          size * (Math.random() - 0.5)
        )
      );
    }

    geometry.setFromPoints(points);
    geometry.computeVertexNormals();

    const material = new THREE.PointsMaterial({
      size: 2,
      color: CONST.COLOR.UNIVERSE_STAR,
    });

    this.add(new THREE.Points(geometry, material));
  }
}