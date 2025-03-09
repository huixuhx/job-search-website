import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // ✅ Correct
import anime from "animejs";
import debounce from "lodash.debounce";

// Import necessary components
import Earth from "@/components/journey/Earth";
import Stars from "@/components/journey/Stars"

import { getCountryInfoByName } from "@/components/journey/country";
import * as CONST from "@/components/journey/const";
import * as Common from "@/components/journey/common";
import { LOADING_TIME } from "@/utils/const";

export default class ServiceJourney {
  currentDescDiv = [];
  currentNameDiv = [];
  currentFlagImg = [];
  currentPicImg = [];

  //class name
  PIC_VISIBLE_CLASS = "pic-visible";
  DESC_VISIBLE_CLASS = "desc-visible";
  FLAG_VISIBLE_CLASS = "flag-visible";
  NAME_VISIBLE_CLASS = "name-visible";

  animeShowDesc = [];
  animeShowName = [];
  animeShowPic = [];
  animeShowFlag = [];

  constructor(appRef, canvasRef) {
    this.appRef = appRef;
    this.canvasRef = canvasRef;
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.WIDTH / this.HEIGHT,
      0.1,
      1000
    );
    this.earth = new Earth();
    this.renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
    this.controller = new OrbitControls(this.camera, this.renderer.domElement);
    this.stars = new Stars();

    this.isMoveEarth = true;
    this.isOnCountryPoint = false;
    this.isClosingCountryInfo = false;



    this.createLight();
    this.createGeometry();
    this.createRenderer();
    this.trackControls();
    this.setResizeEvent();
    this.animate();
    this.firstAnimate();
  }

  createLight() {
    const ambientLight = new THREE.AmbientLight(CONST.COLOR.AMBIENT_LIGHT);
    this.scene.add(ambientLight);
  }

  createGeometry() {
    this.setCamPosByCountryIndex(2);

    this.canvasRef.current.addEventListener(
      CONST.EVENT.MOUSE_MOVE,
      this.handleMouseMove
    );
    this.canvasRef.current.addEventListener(
      CONST.EVENT.TOUCH_START,
      this.handleMouseMove
    );
    this.earth.scale.set(0.9, 0.9, 0.9);

    this.scene.add(this.stars);
    this.scene.add(this.earth);
  }

  setCamPosByCountryIndex(countryIndex) {
    const center = new THREE.Vector3();
    const city = this.earth.countryPoints[countryIndex].position;

    let centerVector = city.clone().sub(center).normalize();
    let targetVector = centerVector.clone().multiplyScalar(180);
    const camPos = targetVector.add(this.earth.position);

    this.camera.position.copy(camPos);
  }

  createRenderer() {
    this.renderer.setSize(this.WIDTH, this.HEIGHT);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.canvasRef.current.appendChild(this.renderer.domElement);
  }

  trackControls() {
    this.controller.minDistance = 170;
    this.controller.maxDistance = 200;
    this.controller.maxPolarAngle = Math.PI / 1.5;
    this.controller.enablePan = false;
    this.controller.enableZoom = false;
    this.controller.enableDamping = true;
    this.controller.minPolarAngle = 0.8;
    this.controller.maxPolarAngle = 2.4;
    this.controller.dampingFactor = 0.17;
    this.controller.rotateSpeed = 0.17;
  }

  setResizeEvent() {
    window.addEventListener(
      CONST.EVENT.RESIZE,
      debounce(() => {
        this.HEIGHT = window.innerHeight;
        this.WIDTH = window.innerWidth;
        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.camera.aspect = this.WIDTH / this.HEIGHT;
        this.camera.updateProjectionMatrix();
      }, 50)
    );
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isMoveEarth) this.earth.update();
    this.stars.update();
    this.controller.update();
    this.renderer.render(this.scene, this.camera);
  }

  handleMouseMove = (event) => {
    if (this.isOnCountryPoint || this.isClosingCountryInfo) return;

    const initializedMousePos =
      Common.getInitializedMousePosByMouseEvent(event);
    const intersects = this.getObjOnMouse(initializedMousePos);
    if (intersects.length > 0) {
      this.verifyOnCountryPoint(intersects);
    }
  };

  firstAnimate() {
    this.isMoveEarth = false;

    setTimeout(() => {
      this.showCountryInfo(
        "canada",
        window.innerHeight / 2,
        window.innerWidth / 2
      );
    }, LOADING_TIME + 500);

    setTimeout(() => {
      const countryInfo = getCountryInfoByName("canada");
      this.closePic(countryInfo);
      this.closeFlag(countryInfo);
      this.closeName(countryInfo);
      this.closeDesc(countryInfo);
    }, LOADING_TIME + 2500);

    setTimeout(() => {
      this.isMoveEarth = true;

    }, LOADING_TIME + 3000);
  }

  getObjOnMouse = (initializedMousePos) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(initializedMousePos, this.camera);
    return raycaster.intersectObjects(this.earth.children, true);
  };

  verifyOnCountryPoint = (intersects) => {
    let onCountryPointTmp = false;

    this.earth.countryPoints.forEach((city) => {
      if (city === intersects[0].object.parent) {

        const { screenX, screenY } = this.calcCenterOfCountryPoint(intersects);
        this.showCountryInfo(city.name, screenY, screenX);
        onCountryPointTmp = true;
        this.isMoveEarth = false;
      }
      this.isOnCountryPoint = onCountryPointTmp;
    });
  };

  calcCenterOfCountryPoint = (intersects) => {
    const box3 = new THREE.Box3().setFromObject(intersects[0].object);
    const centerOfObj = box3.getCenter(new THREE.Vector3());
    const objVector3 = centerOfObj.project(this.camera).clone();

    const screenX = (this.WIDTH / 2) * (objVector3.x + 1.0);
    const screenY = (this.HEIGHT / 2) * (-objVector3.y + 1.0);
    return { screenX, screenY };
  };

  showCountryInfo = (cityName, screenY, screenX) => {
    const countryInfo = getCountryInfoByName(cityName);
    this.showPic(countryInfo, screenY, screenX);
    this.showFlag(countryInfo, screenY, screenX);
    this.showName(countryInfo, screenY, screenX);
    this.showDesc(countryInfo, screenY, screenX);
  };

  showPic(countryInfo, screenY, screenX) {
    const picImg = (this.currentPicImg[countryInfo.index] =
      document.createElement("img"));

    picImg.classList.add(`pic-visible${countryInfo.index}`);

    // Check whether the image file should be PNG or SVG
    if (countryInfo.useSVG) {
      picImg.src = `${CONST.PATH.IMG_JOURNEY_COUNTRY}${countryInfo.name}.svg`;
    } else {
      picImg.src = `${CONST.PATH.IMG_JOURNEY_COUNTRY}${countryInfo.name}.png`;
    }

    picImg.height = 150;
    picImg.width = 150;
    picImg.style.position = "absolute";
    picImg.style.top = `calc(${screenY}px - ${picImg.height / 2}px)`;
    picImg.style.left = `calc(${screenX}px - ${picImg.width / 2}px)`;
    if (this.appRef.current) {
      this.appRef.current.appendChild(picImg);
    }

    this.animeShowPic[countryInfo.index] = anime({
      targets: `.${this.PIC_VISIBLE_CLASS}${countryInfo.index}`,
      scale: [0, 1],
      duration: 400,
      easing: CONST.EASE.EASE_SHOW_COUNTRY_INFO,
      begin: () => {
        picImg.addEventListener(CONST.EVENT.MOUSE_LEAVE, () =>
          this.handleMouseLeaveInfo(countryInfo)
        );
        document.addEventListener(
          CONST.EVENT.TOUCH_START,
          () => this.handleMouseLeaveInfo(countryInfo),
          { once: true }
        );
      },
    });
  }
  showFlag(countryInfo, screenY, screenX) {
    const flagImg = (this.currentFlagImg[countryInfo.index] =
      document.createElement("img"));

    flagImg.classList.add(this.FLAG_VISIBLE_CLASS + countryInfo.index);

    // Check whether the flag file should be PNG or SVG
    if (countryInfo.useSVG) {
      flagImg.src = `${CONST.PATH.IMG_JOURNEY_FLAG}${countryInfo.name}.svg`;
    } else {
      flagImg.src = `${CONST.PATH.IMG_JOURNEY_FLAG}${countryInfo.name}.png`;
    }

    flagImg.height = 30;
    flagImg.width = 30;
    flagImg.style.position = "absolute";
    flagImg.style.top = `calc(${screenY}px - ${
      flagImg.offsetHeight / 2
    }px - 65px)`;
    flagImg.style.left = `calc(${screenX}px - ${
      flagImg.offsetWidth / 2
    }px - 65px)`;

    if (this.appRef.current) {
      this.appRef.current.appendChild(flagImg);
    }

    this.animeShowFlag[countryInfo.index] = anime({
      targets: `.${this.FLAG_VISIBLE_CLASS}${countryInfo.index}`,
      delay: 100,
      scale: [0, 1],
      rotate: [15, -5],
      duration: 400,
      easing: CONST.EASE.EASE_SHOW_COUNTRY_INFO,
    });
  }
  showName(countryInfo, screenY, screenX) {
    const nameDiv = (this.currentNameDiv[countryInfo.index] =
      document.createElement("div"));

    nameDiv.classList.add(this.NAME_VISIBLE_CLASS + countryInfo.index);
    nameDiv.innerHTML = countryInfo.name.toUpperCase();
    nameDiv.style.position = "absolute";
    nameDiv.style.top = `calc(${screenY}px - ${
      nameDiv.offsetHeight / 2
    }px - 50px)`;
    nameDiv.style.left = `calc(${screenX}px - ${
      nameDiv.offsetWidth / 2
    }px + 50px)`;
    if (this.appRef.current) {
      this.appRef.current.appendChild(nameDiv);
    }

    this.animeShowName[countryInfo.index] = anime({
      targets: `.${this.NAME_VISIBLE_CLASS}${countryInfo.index}`,
      delay: 100,
      scale: [0, 1],
      duration: 400,
      easing: CONST.EASE.EASE_SHOW_COUNTRY_INFO,
    });
  }

  showDesc(countryInfo, screenY, screenX) {
    const descDiv = (this.currentDescDiv[countryInfo.index] =
      document.createElement("div"));

    descDiv.classList.add(this.DESC_VISIBLE_CLASS + countryInfo.index);
    descDiv.innerHTML = countryInfo.desc;
    descDiv.style.position = "absolute";

    if (this.appRef.current) {
      this.appRef.current.appendChild(descDiv);
    }

    descDiv.style.top = `calc(${screenY}px - ${
      descDiv.offsetHeight / 2
    }px + 80px)`;
    descDiv.style.left = `calc(${screenX}px - ${
      descDiv.offsetWidth / 2
    }px + 70px)`;

    this.animeShowDesc[countryInfo.index] = anime({
      targets: `.${this.DESC_VISIBLE_CLASS}${countryInfo.index}`,
      delay: 200,
      scale: [0, 1],
      rotate: [15, -5],
      duration: 400,
      easing: CONST.EASE.EASE_SHOW_COUNTRY_INFO,
    });
  }

  handleMouseLeaveInfo(countryInfo) {
    if (!this.isClosingCountryInfo) {
      this.isClosingCountryInfo = true;
      this.isOnCountryPoint = false;
      this.isMoveEarth = true;

      Promise.all([
        this.closePic(countryInfo),
        this.closeName(countryInfo),
        this.closeFlag(countryInfo),
        this.closeDesc(countryInfo),
      ]).then(() => {
        this.isClosingCountryInfo = false;
      });
    }
  }


  closePic = async (countryInfo) => {
    await anime({
      targets: [`.pic-visible${countryInfo.index}`],
      scale: [1, 0],
      duration: 500,
      easing: CONST.EASE.EASE_CLOSE_COUNTRY_INFO,
      begin: () => this.animeShowPic[countryInfo.index].pause(),
      complete: () =>
        Common.removeElementItself(this.currentPicImg[countryInfo.index]),
    }).finished;
  };

  closeName = async (countryInfo) => {
    await anime({
      targets: [`.name-visible${countryInfo.index}`],
      scale: [1, 0],
      duration: 500,
      easing: CONST.EASE.EASE_CLOSE_COUNTRY_INFO,
      begin: () => this.animeShowName[countryInfo.index].pause(),
      complete: () =>
        Common.removeElementItself(this.currentNameDiv[countryInfo.index]),
    }).finished;
  };
  async closeFlag(countryInfo) {
    await anime({
      targets: [`.${this.FLAG_VISIBLE_CLASS}${countryInfo.index}`],
      scale: [1, 0],
      duration: 500,
      easing: CONST.EASE.EASE_CLOSE_COUNTRY_INFO,
      begin: () => {
        this.animeShowFlag[countryInfo.index].pause();
      },
      complete: () => {
        Common.removeElementItself(this.currentFlagImg[countryInfo.index]);
      },
    }).finished;
  }
  async closeDesc(countryInfo) {
    await anime({
      targets: [`.${this.DESC_VISIBLE_CLASS}${countryInfo.index}`],
      scale: [1, 0],
      duration: 500,
      easing: CONST.EASE.EASE_CLOSE_COUNTRY_INFO,
      begin: () => {
        this.animeShowDesc[countryInfo.index].pause();
      },
      complete: () => {
        Common.removeElementItself(this.currentDescDiv[countryInfo.index]);
      },
    }).finished;
  }
}
