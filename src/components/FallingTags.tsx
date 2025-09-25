import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
} from "matter-js";


export function InteractiveFallingTags() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Engine.create());

  const tags = [
    { text: "Internal Medicine", color: "#8B0000" },
    { text: "Oncology", color: "#6495ED" },
    { text: "Cardiology", color: "#228B22" },
    { text: "Neurology", color: "#FFD700" },
    { text: "Dermatology", color: "#FF69B4" },
    { text: "Psychiatry", color: "#FF8C00" },
    { text: "Pediatrics", color: "#20B2AA" },
    { text: "Surgery", color: "#DC143C" },
    { text: "Radiology", color: "#4B0082" },
    { text: "Pathology", color: "#2E8B57" },
    { text: "Anesthesiology", color: "#FF4500" },
    { text: "Emergency Medicine", color: "#1E90FF" },
    { text: "Family Medicine", color: "#2F4F4F" },
    { text: "Gastroenterology", color: "#6A5ACD" },
    { text: "Endocrinology", color: "#FF1493" },
    { text: "Mental Health", color: "#8B0000" },
    { text: "Community Health Worker", color: "#8B0000" },
  ];

  useEffect(() => {
    const engine = engineRef.current;
    const scene = sceneRef.current;
    if (!scene) return;

    const width = scene.offsetWidth;
    const height = scene.offsetHeight;

    // Matter.js renderer
    const render = Render.create({
      element: scene,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "0";
    render.canvas.style.pointerEvents = "auto"; 

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // World boundaries
    const floor = Bodies.rectangle(width / 2, height + 20, width, 40, {
      isStatic: true,
    });
    const leftWall = Bodies.rectangle(-20, height / 2, 40, height, {
      isStatic: true,
    });
    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, {
      isStatic: true,
    });
    World.add(engine.world, [floor, leftWall, rightWall]);

    // Create tags as DOM + physics bodies
    const tagBodies = tags.map((tag, i) => {
      const elem = document.createElement("div");
      elem.innerText = tag.text;
      elem.style.position = "absolute";
      elem.style.zIndex = "1"; // فوق الكانفس
      elem.style.padding = "6px 12px";
      elem.style.borderRadius = "20px";
      elem.style.background = tag.color;
      elem.style.color = "white";
      elem.style.fontWeight = "bold";
      elem.style.userSelect = "none";
      elem.style.cursor = "grab";
      scene.appendChild(elem);

      const w = elem.offsetWidth || 100;
      const h = elem.offsetHeight || 40;
      const x = Math.random() * (width - w);
      const y = -i * 80;

      const body = Bodies.rectangle(x + w / 2, y, w, h, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.001,
        chamfer: { radius: h / 2 },
      });

      World.add(engine.world, body);

      return { elem, body, w, h };
    });

    // Mouse + touch drag
    const mouse = Mouse.create(render.canvas);
    mouse.element.removeEventListener("touchmove", mouse.mousemove);
    mouse.element.addEventListener("touchmove", mouse.mousemove, {
      passive: false,
    });

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Sync DOM with physics
    const update = () => {
      tagBodies.forEach(({ elem, body, w, h }) => {
        elem.style.transform = `translate(${body.position.x - w / 2}px, ${
          body.position.y - h / 2
        }px) rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    // Cleanup on unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      scene.innerHTML = "";
    };
  }, []);

  return (
    <div style={{ background: "#0f144c", padding: "50px 0" }}>
      <h1
        style={{
          color: "#fff",
          fontSize: "2.5rem",
          textAlign: "center",
          fontFamily: "Times New Roman",
          marginBottom: "30px",
        }}
      >
        Our{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #096A9D, #00C9FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Services
        </span>{" "}
        include
      </h1>

      {/* جزء الكومبوننت بس (مش هيسد الصفحة) */}
      <div
        ref={sceneRef}
        className="relative w-full overflow-hidden"
        style={{
          background: "#0f144c",
          height: "500px", 
        }}
      />
    </div>
  );
};








// import React, { useEffect, useRef } from "react";
// import {
//   Engine,
//   Render,
//   World,
//   Bodies,
//   Runner,
//   Mouse,
//   MouseConstraint,
// } from "matter-js";


// export function InteractiveFallingTags() {
//   const sceneRef = useRef(null);
//   const engineRef = useRef(Engine.create());

//   const tags = [
//     { text: "Internal Medicine", color: "#8B0000" },
//     { text: "Oncology", color: "#6495ED" },
//     { text: "Cardiology", color: "#228B22" },
//     { text: "Neurology", color: "#FFD700" },
//     { text: "Dermatology", color: "#FF69B4" },
//     { text: "Psychiatry", color: "#FF8C00" },
//     { text: "Pediatrics", color: "#20B2AA" },
//     { text: "Surgery", color: "#DC143C" },
//     { text: "Radiology", color: "#4B0082" },
//     { text: "Pathology", color: "#2E8B57" },
//     { text: "Anesthesiology", color: "#FF4500" },
//     { text: "Emergency Medicine", color: "#1E90FF" },
//     { text: "Family Medicine", color: "#2F4F4F" },
//     { text: "Gastroenterology", color: "#6A5ACD" },
//     { text: "Endocrinology", color: "#FF1493" },
//     { text: "Mental Health", color: "#8B0000" },
//     { text: "Community Health Worker", color: "#8B0000" },

//   ];

//   useEffect(() => {
//     const engine = engineRef.current;
//     const scene = sceneRef.current;
//     if (!scene) return;

//     const width = scene.offsetWidth;
//     const height = scene.offsetHeight;

//     // Matter.js renderer
//     const render = Render.create({
//       element: scene,
//       engine,
//       options: {
//         width,
//         height,
//         wireframes: false,
//         background: "transparent",
//       },
//     });

//     // Put canvas behind DOM tags
//     render.canvas.style.position = "absolute";
//     render.canvas.style.top = "0";
//     render.canvas.style.left = "0";
//     render.canvas.style.zIndex = "0";

//     // Start engine + renderer
//     const runner = Runner.create();
//     Runner.run(runner, engine);
//     Render.run(render);

//     // World boundaries
//     const floor = Bodies.rectangle(width / 2, height + 20, width, 40, {
//       isStatic: true,
//     });
//     const leftWall = Bodies.rectangle(-20, height / 2, 40, height, {
//       isStatic: true,
//     });
//     const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height, {
//       isStatic: true,
//     });
//     World.add(engine.world, [floor, leftWall, rightWall]);

//     // Create tags as DOM + physics bodies
//     const tagBodies = tags.map((tag, i) => {
//       const elem = document.createElement("div");
//       elem.innerText = tag.text;
//       elem.style.position = "absolute";
//       elem.style.zIndex = "1"; // ensure above canvas
//       elem.style.padding = "6px 12px";
//       elem.style.borderRadius = "20px";
//       elem.style.background = tag.color;
//       elem.style.color = "white";
//       elem.style.fontWeight = "bold";
//       elem.style.userSelect = "none";
//       elem.style.pointerEvents = "none"; 
//       // elem.style.cursor = "pointer";


//       scene.appendChild(elem);

//       const w = elem.offsetWidth || 100;
//       const h = elem.offsetHeight || 40;
//       const x = Math.random() * (width - w);
//       const y = -i * 80; 

//       const body = Bodies.rectangle(x + w / 2, y, w, h, {
//         restitution: 0.6,
//         friction: 0.1,
//         frictionAir: 0.01,
//         density: 0.001,
//         chamfer: { radius: h / 2 },
//       });

//       World.add(engine.world, body);

//       return { elem, body, w, h };
//     });

//     // Enable drag with mouse
//     const mouse = Mouse.create(render.canvas);
//     const mouseConstraint = MouseConstraint.create(engine, {
//       mouse,
//       constraint: { stiffness: 0.2, render: { visible: false } },
//     });
//     World.add(engine.world, mouseConstraint);
//     render.mouse = mouse;

//     // Sync DOM with physics
//     const update = () => {
//       tagBodies.forEach(({ elem, body, w, h }) => {
//         elem.style.transform = `translate(${body.position.x - w / 2}px, ${
//           body.position.y - h / 2
//         }px) rotate(${body.angle}rad)`;
//       });
//       requestAnimationFrame(update);
//     };
//     update();

//     // Cleanup on unmount
//     return () => {
//       Render.stop(render);
//       Runner.stop(runner);
//       World.clear(engine.world, false);
//       Engine.clear(engine);
//       render.canvas.remove();
//       render.textures = {};
//       scene.innerHTML = "";
//     };
//   }, []);

//   return (
//     <>
//     <h1 
//       style={{ 
//         color: "#fff", 
//         fontSize: "4rem",
//         textAlign: "center",
//         fontFamily: "Times New Roman",
//       }}
//     >
//       Our <span
//         style={{
//           background: "linear-gradient(90deg, #096A9D, #00C9FF)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           fontWeight: "bold",
//           fontSize: "4rem",
//           margin: "0 10px",
//         }}
//       >
//         Services
//       </span> include
//     </h1>
//     <div
//       ref={sceneRef}
//       className="relative w-full h-screen overflow-hidden"
//       style={{ background: "#0f144c" }}
//     />
//     </>
//   );
// };



