// eslint-disable-next-line
// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import styles from './About.module.scss';

const About: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const { clientWidth, clientHeight } = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(clientWidth, clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(clientWidth, clientHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0';
        mountRef.current.appendChild(labelRenderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        const radius = 6;
        const widthSegments = 32;
        const heightSegments = 32;
        const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const textureLoader = new THREE.TextureLoader();

        const earthTexture = textureLoader.load('/src/assets/images/earth.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
        const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
        scene.add(earthMesh);

        const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
                viewVector: { value: camera.position },
            },
            vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
            vec3 vNormal = normalize(normalMatrix * normal);
            vec3 vNormel = normalize(normalMatrix * viewVector);
            intensity = pow(0.5 - dot(vNormal, vNormel), 5.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0.9);
        }
      `,
            fragmentShader: `
        varying float intensity;
        void main() {
            vec3 glow = vec3(0.3, 0.6, 1.0) * intensity;
            gl_FragColor = vec4(glow, 0.3);
        }
      `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
        const glowSphere = new THREE.Mesh(sphereGeometry, glowMaterial);
        glowSphere.scale.set(1.1, 1.1, 1.1);
        scene.add(glowSphere);

        const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: '#ff3b85' });
        const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

        const lat = (54.3282 * Math.PI) / 180;
        const lon = (220 * Math.PI) / 180;

        const x = -1 * radius * Math.cos(lat) * Math.sin(lon);
        const y = radius * Math.sin(lat);
        const z = radius * Math.cos(lat) * Math.cos(lon);

        const markerPos = new THREE.Vector3(x, y, z).multiplyScalar(1.02);
        markerMesh.position.copy(markerPos);

        earthMesh.add(markerMesh);

        const markerLabelDiv = document.createElement('div');
        markerLabelDiv.className = 'label';
        markerLabelDiv.textContent = 'Ульяновск';
        markerLabelDiv.style.color = 'white';
        markerLabelDiv.style.fontSize = '16px';
        markerLabelDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
        markerLabelDiv.style.padding = '2px 4px';
        markerLabelDiv.style.borderRadius = '4px';

        const markerLabel = new CSS2DObject(markerLabelDiv);

        markerLabel.position.set(0, 0.3, 0);
        markerMesh.add(markerLabel);

        const particles = 800;
        const positions = new Float32Array(particles * 3);
        for (let i = 0; i < particles; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        const particlesMesh = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particlesMesh);

        earthMesh.rotation.y = lon;
        earthMesh.rotation.x = -lat + Math.PI / 2;

        camera.position.set(0, 3, 16);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = -1.6;
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
        };
        controls.onContextMenu = () => {};

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            const { clientWidth, clientHeight } = mountRef.current;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
            labelRenderer.setSize(clientWidth, clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mountRef.current?.removeChild(renderer.domElement);
            mountRef.current?.removeChild(labelRenderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div className={styles.about}>
            <div className={styles.textBlock}>
                <h1>About Me</h1>
                <p>My text content here...</p>
            </div>
            <div className={styles.canvasContainer} ref={mountRef} />
        </div>
    );
};

export default About;
