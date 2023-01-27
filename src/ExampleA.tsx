import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { SpotLight } from 'three';

function ExampleA() {
    const threeRef = useRef<HTMLDivElement>(null);
    //初始化
    function init() {
        //创建一个scene，他将支持我们所有的elementy节点的对象，相机和光线
        const scene = new THREE.Scene();
        //引入AxesHelper
        const axes = new THREE.AxesHelper(20);
        scene.add(axes);


        //添加一个平面图形
        const planeGeometry = new THREE.PlaneGeometry(60, 20);
        const planeMaterial = new THREE.MeshBasicMaterial({
            color: 0xcccccc,
        })
        const plane = new THREE.Mesh(planeGeometry, planeMaterial)
        //平面的定位
        plane.rotation.x = 0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 5;
        plane.position.z = 6;
        //在scene里面添加plane,画布里添加新的图形
        scene.add(plane);

        //创建一个cube
        const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            wireframe: true,
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        //设置定位
        cube.position.x = -14;
        cube.position.y = 13;
        cube.position.z = 10;
        //添加到画布scene里面
        scene.add(cube)

        //创建一个球体
        const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x7777ff,
            wireframe: true,
        })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        plane.receiveShadow = true;
        //设置定位
        sphere.position.x = 10;
        sphere.position.y = 14;
        sphere.position.z = 10;
        scene.add(sphere);


        //设置挂载点
        const renderer = new THREE.WebGLRenderer();
        //设置颜色
        renderer.setClearColor(new THREE.Color(0xeeeeee));

        //设置window的宽高
        renderer.setSize(window.innerWidth, window.innerHeight);

        //创建一个我们想要的的camera相机
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )


        //创建相机的坐标系，实现三维
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        if (threeRef.current) {
            threeRef.current.appendChild(renderer.domElement);
            renderer.render(scene, camera);
        }
    }
    useEffect(() => {
        //调用init初始化函数
        init();
    }, [])
    return (
        <>
            <div ref={threeRef}></div>
        </>
    )
}

export default ExampleA;