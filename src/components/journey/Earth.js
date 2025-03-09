import * as THREE from "three";
import * as CONST from "@/components/journey/const";
import { countryInfos } from "@/components/journey/country";

export default class Earth extends THREE.Group {
  constructor() {
    super();
    this.world = null;
    this.countryPoints = [];

    this.init();
  }

  init() {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(100, 60, 60);
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(`${CONST.PATH.IMG_JOURNEY}world-map-dot-white.png`),
      bumpScale: 1.0,
      transparent: true,
      side: THREE.DoubleSide, // Allow visibility from both sides
    });

    this.world = new THREE.Mesh(geometry, material);
    this.world.receiveShadow = true;

    this.createCountryPoints();
  }

  update() {
    this.world.rotation.y += 0.002; // Rotates the Earth
  }

  /**
   * Create country marker points
   */
  createCountryPoints() {
    countryInfos.forEach((country) => {
      const latitude = country.latlng[0];
      const longitude = country.latlng[1];
      const point = new THREE.Group();
      point.name = country.name;

      this.createFlagOnGround(point);
      this.setPointPos(point, latitude, longitude);

      this.countryPoints.push(point);
      this.world.add(point);
    });

    this.add(this.world)
  }

  /**
   * Creates a flag marker on the ground
   */
  createFlagOnGround(point) {
    
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(3, 32),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(
          `${CONST.PATH.IMG_JOURNEY_FLAG + point.name}.png`,
        ),
        side: THREE.DoubleSide,
        name: 'point-ground',
        transparent: true,
        opacity: 0.8,
      }),
    )

    point.add(ground)
    ground.rotateX(Math.PI / 2)
    ground.scale.set(-1, 1, 1);
  }

  /**
   * Sets the position of a marker based on latitude/longitude
   */
  setPointPos(point, latitude, longitude) {
    point.position.copy(this.translateGeoCoords(latitude, longitude, 98));
    point.lookAt(new THREE.Vector3(0, 0, 0));
    point.rotateX(80);
    point.translateY(2.5);
  }

  /**
   * Convert latitude/longitude to 3D Sphere Position
   */
  translateGeoCoords(latitude, longitude, radius) {
    const phi = (latitude * Math.PI) / 180; // Elevation
    const theta = ((longitude - 180) * Math.PI) / 180; // Azimuth

    const x = -radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  }
}