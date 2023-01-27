import React, { useEffect, useRef } from "react";
import { Scene, SpotLight, MeshBasicMaterial, Mesh, PerspectiveCamera, WebGL1Renderer, Color, PlaneGeometry, MeshLambertMaterial, Plane, SphereGeometry, BoxGeometry } from 'three';

function ExampleB() {
    const threeRef = useRef<HTMLDivElement>(null);
    //初始化函数
    function init() {
        //实例化scene场景
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position)

        //建立平面Geometory,实例化PlaneGeometry
        const planeGeometry = new PlaneGeometry(60, 10);
        const meshLamberMaterial = new MeshLambertMaterial({ color: 0xffffff });
        const plane = new Mesh(planeGeometry, meshLamberMaterial);
        scene.add(plane);

        //对平面进行旋转
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        //添加球体属性（默认半径）
        const sphereGeometry = new SphereGeometry();
        //设置材质
        const sphereMaterial = new MeshLambertMaterial({ color: 0x7777ff });
        //添加球体
        const sphere = new Mesh(sphereGeometry, sphereMaterial)
        //设置球体位置
        sphere.position.x = 20;
        sphere.position.y = 1;
        sphere.position.z = 4;
        //添加阴影
        sphere.castShadow = true;
        //球体添加到场景
        scene.add(sphere);

        //MeshLambertMaterial是实心，MeshBasicMaterial是空心（折线）
        //设置正方体属性
        const cubeGeometry = new BoxGeometry(4, 4, 4);
        //设置正方体材质
        const cubeMaterial = new MeshLambertMaterial({
            color: 0xff0000,
        });
        //添加新的正方体，为其添加设置的属性
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        //设置cube位置position
        cube.position.x = 3;
        cube.position.y = 3;
        cube.position.z = 3;
        //设置cube的阴影
        cube.castShadow = true;
        //在场景里面添加cube正方体
        scene.add(cube);

        //添加聚光灯        
        const spotLight = new SpotLight(0xffffff);
        //设置光照角度
        spotLight.position.set(10, 60, 10)//set(x,y,z)光源方向
        spotLight.castShadow = true;
        //将光照添加到场景
        scene.add(spotLight);

        //渲染页面
        const renderer = new WebGL1Renderer();
        //设置颜色
        renderer.setClearColor(new Color(0xffffff));
        //设置宽高
        renderer.setSize(window.innerWidth, window.innerHeight);
        //设置阴影
        renderer.shadowMap.enabled = true;
        plane.receiveShadow = true;
        //设置step变量
        var step = 0;
        if (threeRef.current) {
            threeRef.current.appendChild(renderer.domElement)
            renderer.render(scene, camera)
            renderScene();
            function renderScene() {
                //requestAnimationFrame是一个api，可以告诉浏览器你希望调用动画(需要调用动画的函数)
                //给正方体添加rotation 自转
                cube.rotation.x += 0.02;
                cube.rotation.y += 0.02;
                cube.rotation.z += 0.02;

                //给球体添加周期性动画，升起落下
                step += 0.02;
                sphere.position.x = 20 + 10 * Math.cos(step);
                sphere.position.y = 2 + 10 * Math.abs(Math.sin(step))

                requestAnimationFrame(renderScene);
                // console.log(new Date().getMilliseconds())
                renderer.render(scene, camera)
            }
        }
    }
    //调用初始化函数
    useEffect(() => {
        init();
    }, [])
    return <div ref={threeRef}></div>
}

export default ExampleB;