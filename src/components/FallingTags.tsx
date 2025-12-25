import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
  Body,
  Events,
} from "matter-js";

export function InteractiveFallingTags() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Engine.create());
  const isDraggingRef = useRef(false);
  const frameIdRef = useRef<number | null>(null);
  const mouseConstraintRef = useRef<MouseConstraint | null>(null);
  const tagBodiesRef = useRef<Array<{ elem: HTMLDivElement; body: Body; w: number; h: number }>>([]);

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

    // Reset engine for clean start
    engine.gravity.y = 0.7;
    engine.gravity.x = 0;

    const width = scene.offsetWidth;
    const height = scene.offsetHeight;

    // Clear previous content
    scene.innerHTML = "";

    // Create renderer
    const render = Render.create({
      element: scene,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        showVelocity: false,
        showCollisions: false,
        showAngleIndicator: false,
        showSleeping: false,
        showDebug: false,
      },
    });

    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "1"; // Canvas behind tags
    render.canvas.style.pointerEvents = "auto";

    // Enable mouse events on canvas
    render.canvas.style.touchAction = "none";
    render.canvas.style.userSelect = "none";

    const runner = Runner.create({
      delta: 1000 / 60,
      isFixed: true,
    });

    Runner.run(runner, engine);
    Render.run(render);

    // World boundaries
    const wallThickness = 50;
    const boundaries = [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + 100, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    World.add(engine.world, boundaries);

    // Create tags
    const tagBodies = tags.map((tag, i) => {
      const elem = document.createElement("div");
      elem.innerText = tag.text;
      elem.style.position = "absolute";
      elem.style.zIndex = "2"; // Tags above canvas
      elem.style.padding = "8px 16px";
      elem.style.borderRadius = "25px";
      elem.style.background = tag.color;
      elem.style.color = "white";
      elem.style.fontWeight = "600";
      elem.style.fontSize = "14px";
      elem.style.userSelect = "none";
      elem.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      elem.style.whiteSpace = "nowrap";
      elem.style.cursor = "grab";
      elem.style.pointerEvents = "none"; // Let events pass through to canvas

      // Calculate dimensions
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.whiteSpace = "nowrap";
      tempDiv.style.padding = "8px 16px";
      tempDiv.style.fontSize = "14px";
      tempDiv.style.fontWeight = "600";
      tempDiv.innerText = tag.text;
      document.body.appendChild(tempDiv);
      
      const w = Math.max(tempDiv.offsetWidth, 120) + 10;
      const h = Math.max(tempDiv.offsetHeight, 40) + 10;
      document.body.removeChild(tempDiv);

      scene.appendChild(elem);

      // Position tags randomly
      const x = Math.random() * (width - w * 1.5) + w * 0.75;
      const y = -Math.random() * height * 2 - i * 30;

      const body = Bodies.rectangle(x + w / 2, y, w, h, {
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.02,
        density: 0.001,
        chamfer: { radius: h / 2 },
        render: { visible: false },
        label: `tag-${i}`,
      });

      World.add(engine.world, body);

      return { elem, body, w, h };
    });

    tagBodiesRef.current = tagBodies;

    // Setup mouse constraint for interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        render: { visible: false }
      }
    });

    mouseConstraintRef.current = mouseConstraint;
    
    // Make sure mouse constraint can interact with all bodies
    mouseConstraint.collisionFilter.mask = 0xFFFFFFFF;
    
    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Handle mouse events on the canvas
    render.canvas.addEventListener("mousedown", () => {
      isDraggingRef.current = true;
    });

    render.canvas.addEventListener("mouseup", () => {
      isDraggingRef.current = false;
    });

    // Handle touch events
    render.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      isDraggingRef.current = true;
      // Update mouse position for touch
      if (e.touches[0]) {
        const rect = render.canvas.getBoundingClientRect();
        mouse.absolute.x = e.touches[0].clientX - rect.left;
        mouse.absolute.y = e.touches[0].clientY - rect.top;
        mouse.button = 0;
        mouse.mousedown(null);
      }
    }, { passive: false });

    render.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      isDraggingRef.current = false;
      mouse.button = -1;
      mouse.mouseup(null);
    }, { passive: false });

    render.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (e.touches[0]) {
        const rect = render.canvas.getBoundingClientRect();
        mouse.absolute.x = e.touches[0].clientX - rect.left;
        mouse.absolute.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: false });

    // Update DOM positions
    const updateTags = () => {
      tagBodies.forEach(({ elem, body, w, h }) => {
        // Reset if fallen too far
        if (body.position.y > height + 200) {
          Body.setPosition(body, {
            x: Math.random() * (width - w * 1.5) + w * 0.75,
            y: -50
          });
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);
        }

        // Update element position
        elem.style.left = `${body.position.x - w / 2}px`;
        elem.style.top = `${body.position.y - h / 2}px`;
        elem.style.transform = `rotate(${body.angle}rad)`;
        
        // Change cursor when dragging
        if (mouseConstraint.body === body) {
          elem.style.cursor = "grabbing";
        } else {
          elem.style.cursor = "grab";
        }
      });

      frameIdRef.current = requestAnimationFrame(updateTags);
    };

    updateTags();

    // Handle window resize
    const handleResize = () => {
      if (!scene) return;
      
      const newWidth = scene.offsetWidth;
      const newHeight = scene.offsetHeight;
      
      render.options.width = newWidth;
      render.options.height = newHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      
      // Update boundary positions
      boundaries.forEach((boundary, index) => {
        if (index === 0) { // floor
          Body.setPosition(boundary, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
        } else if (index === 1) { // left wall
          Body.setPosition(boundary, { x: -wallThickness / 2, y: newHeight / 2 });
        } else if (index === 2) { // right wall
          Body.setPosition(boundary, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
        }
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      
      if (render.canvas && render.canvas.parentNode) {
        render.canvas.parentNode.removeChild(render.canvas);
      }
      
      // Clean up DOM elements
      tagBodies.forEach(({ elem }) => {
        if (elem.parentNode) {
          elem.parentNode.removeChild(elem);
        }
      });
      
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ 
      background: "#0f144c", 
      padding: "40px 20px",
      position: "relative",
      overflow: "hidden",
      minHeight: "600px"
    }}>
      <h1
        style={{
          color: "#fff",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          textAlign: "center",
          fontFamily: "'Times New Roman', serif",
          marginBottom: "40px",
          zIndex: 20,
          position: "relative",
          fontWeight: "bold"
        }}
      >
        Our{" "}
        <span
          style={{
            background: "linear-gradient(90deg, #096A9D, #00C9FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            display: "inline-block"
          }}
        >
          Services
        </span>{" "}
        include
      </h1>

      <div
        ref={sceneRef}
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          maxWidth: "1200px",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "12px",
          background: "linear-gradient(180deg, rgba(15, 20, 76, 0.9) 0%, rgba(15, 20, 76, 0.7) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      />
      
      <div style={{
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.7)",
        marginTop: "20px",
        fontSize: "14px",
        fontFamily: "sans-serif"
      }}>
        👆 Drag tags around to interact
      </div>
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
//   Body, 
// } from "matter-js";

// export function InteractiveFallingTags() {
//   const sceneRef = useRef<HTMLDivElement | null>(null);
//   const engineRef = useRef(Engine.create());
//   const isDraggingRef = useRef(false);
//   const frameIdRef = useRef<number | null>(null);

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

//     engine.gravity.y = 0.8;
//     engine.gravity.x = 0;

//     const width = scene.offsetWidth;
//     const height = scene.offsetHeight;

//     // Create renderer
//     const render = Render.create({
//       element: scene,
//       engine,
//       options: {
//         width,
//         height,
//         wireframes: false,
//         background: "transparent",
//         showVelocity: false,
//         showCollisions: false,
//         showAngleIndicator: false,
//         showSleeping: false,
//       },
//     });

//     render.canvas.style.position = "absolute";
//     render.canvas.style.top = "0";
//     render.canvas.style.left = "0";
//     render.canvas.style.zIndex = "0";
//     render.canvas.style.pointerEvents = "auto";

//     // Optimize renderer
//     Render.setPixelRatio(render, window.devicePixelRatio || 1);

//     const runner = Runner.create({
//       delta: 1000 / 60,
//       isFixed: true,
//       enabled: true,
//     });

//     Runner.run(runner, engine);
//     Render.run(render);

//     // World boundaries with slight buffer
//     const wallThickness = 50;
//     const floor = Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, {
//       isStatic: true,
//       render: { visible: false },
//     });
//     const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, {
//       isStatic: true,
//       render: { visible: false },
//     });

//     const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + 100, {
//       isStatic: true,
//       render: { visible: false, },
//     });

//     World.add(engine.world, [floor, leftWall, rightWall]);

//     const tagBodies = tags.map((tag, i) => {
//       const elem = document?.createElement("div");
//       elem.innerText = tag?.text;
//       elem.style.position = "absolute";
//       elem.style.zIndex = "10";
//       elem.style.padding = "8px 16px";
//       elem.style.borderRadius = "25px";
//       elem.style.background = tag?.color;
//       elem.style.color = "white";
//       elem.style.fontWeight = "600";
//       elem.style.fontSize = "14px";
//       elem.style.userSelect = "none";
//       elem.style.cursor = "pointer";
//       elem.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//       elem.style.whiteSpace = "nowrap";
//       elem.style.pointerEvents = 'none'; 
      
//       // Add touch action for mobile
//       elem.style.touchAction = "none";
      
//       scene.appendChild(elem);

//       // Measure element dimensions
//       const w = Math.max(elem.offsetWidth, 150);
//       const h = Math.max(elem.offsetHeight, 60);
      
//       // Position tags randomly but spread out
//       const x = Math.random() * (width - w * 1.5) + w * 0.75;
//       const y = -Math.random() * height * 2 - i * 30;

//       const body = Bodies.rectangle(x + w / 2, y, w, h, {
//         restitution: 0.3,
//         friction: 0.1,
//         frictionAir: 0.05,
//         density: 0.002,
//         chamfer: { radius: h / 2 },
//         render: { visible: false },
//         sleepThreshold: 60,
//         slop: 0.05,
//       });

//       World.add(engine.world, body);

//       return { elem, body, w, h };
//     });

//     // Handle mouse interaction
//     const mouse = Mouse.create(render.canvas);
    
//     // Fix mobile touch handling
//     if (mouse.element) {
//       mouse.element.removeEventListener("touchmove", mouse.mousemove);
//       mouse.element.removeEventListener("touchstart", mouse.mousedown);
//       mouse.element.removeEventListener("touchend", mouse.mouseup);
      
//       mouse.element.addEventListener("touchmove", (e) => {
//         e.preventDefault();
//         mouse.mousemove(e);
//       }, { passive: false });
      
//       mouse.element.addEventListener("touchstart", (e) => {
//         e.preventDefault();
//         mouse.mousedown(e);
//         isDraggingRef.current = true;
//       });
      
//       mouse.element.addEventListener("touchend", (e) => {
//         e.preventDefault();
//         mouse.mouseup(e);
//         isDraggingRef.current = false;
//       });
//     }

//     const mouseConstraint = MouseConstraint.create(engine, {
//       mouse: mouse,
//       constraint: {
//         stiffness: 0.1,
//         damping: 0.1,
//         render: { visible: false }
//       }
//     });

//     // Prevent dragging when clicking on canvas background
//     mouseConstraint.mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
//     mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

//     World.add(engine.world, mouseConstraint);
//     render.mouse = mouse;

//     // Sync DOM with physics - optimized
//     const updateTags = () => {
//       tagBodies.forEach(({ elem, body, w, h }) => {
//         if (body.position.y > height + 100) {
//           // Reset tag position if it falls too far
//           Body.setPosition(body, {
//             x: Math.random() * (width - w * 1.5) + w * 0.75,
//             y: -50
//           });
//           Body.setVelocity(body, { x: 0, y: 0 });
//           Body.setAngularVelocity(body, 0);
//         }

//         elem.style.transform = `translate3d(${body.position.x - w / 2}px, ${
//           body.position.y - h / 2
//         }px, 0) rotate(${body.angle}rad)`;
//         elem.style.transition = isDraggingRef.current ? 'none' : 'transform 0.1s linear';
//       });
      
//       frameIdRef.current = requestAnimationFrame(updateTags);
//     };

//     updateTags();

//     // Handle window resize
//     const handleResize = () => {
//       if (!scene) return;
      
//       const newWidth = scene.offsetWidth;
//       const newHeight = scene.offsetHeight;
      
//       render.options.width = newWidth;
//       render.options.height = newHeight;
//       render.canvas.width = newWidth;
//       render.canvas.height = newHeight;
      
//       // Update walls
//       Body.setPosition(floor, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
//       Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
//       Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
//     };

//     window.addEventListener('resize', handleResize);

//     // Cleanup on unmount
//     return () => {
//       if (frameIdRef.current) {
//         cancelAnimationFrame(frameIdRef.current);
//       }
      
//       Render.stop(render);
//       Runner.stop(runner);
//       World.clear(engine.world, false);
//       Engine.clear(engine);
      
//       if (render.canvas && render.canvas.parentNode) {
//         render.canvas.parentNode.removeChild(render.canvas);
//       }
      
//       tagBodies.forEach(({ elem }) => {
//         if (elem.parentNode) {
//           elem.parentNode.removeChild(elem);
//         }
//       });
      
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div style={{ 
//       background: "#0f144c", 
//       padding: "40px 20px",
//       position: "relative",
//       overflow: "hidden",
//       minHeight: "600px"
//     }}>
//       <h1
//         style={{
//           color: "#fff",
//           fontSize: "clamp(2rem, 5vw, 3rem)",
//           textAlign: "center",
//           fontFamily: "'Times New Roman', serif",
//           marginBottom: "40px",
//           zIndex: 20,
//           position: "relative",
//           fontWeight: "bold"
//         }}
//       >
//         Our{" "}
//         <span
//           style={{
//             background: "linear-gradient(90deg, #096A9D, #00C9FF)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             fontWeight: "bold",
//             display: "inline-block"
//           }}
//         >
//           Services
//         </span>{" "}
//         include
//       </h1>

//       <div
//         ref={sceneRef}
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "500px",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           overflow: "hidden",
//           borderRadius: "12px",
//           background: "linear-gradient(180deg, rgba(15, 20, 76, 0.9) 0%, rgba(15, 20, 76, 0.7) 100%)",
//           border: "1px solid rgba(255, 255, 255, 0.1)"
//         }}
//       />
      
//       <div style={{
//         textAlign: "center",
//         color: "rgba(255, 255, 255, 0.7)",
//         marginTop: "20px",
//         fontSize: "14px",
//         fontFamily: "sans-serif",
//         display: window.innerWidth < 768 ? "block" : "none"
//       }}>
//         👆 Drag tags around to interact
//       </div>
//     </div>
//   );
// };






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
//   const sceneRef = useRef<HTMLDivElement | null>(null);
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

//     render.canvas.style.position = "absolute";
//     render.canvas.style.top = "0";
//     render.canvas.style.left = "0";
//     render.canvas.style.zIndex = "0";
//     render.canvas.style.pointerEvents = "auto"; 

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
//       elem.style.zIndex = "1"; // فوق الكانفس
//       elem.style.padding = "6px 12px";
//       elem.style.borderRadius = "20px";
//       elem.style.background = tag.color;
//       elem.style.color = "white";
//       elem.style.fontWeight = "bold";
//       elem.style.userSelect = "none";
//       elem.style.cursor = "grab";
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

//     // Mouse + touch drag
//     const mouse = Mouse.create(render.canvas);
//     mouse.element.removeEventListener("touchmove", mouse.mousemove);
//     mouse.element.addEventListener("touchmove", mouse.mousemove, {
//       passive: false,
//     });

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
//     <div style={{ background: "#0f144c", padding: "50px 0" }}>
//       <h1
//         style={{
//           color: "#fff",
//           fontSize: "2.5rem",
//           textAlign: "center",
//           fontFamily: "Times New Roman",
//           marginBottom: "30px",
//         }}
//       >
//         Our{" "}
//         <span
//           style={{
//             background: "linear-gradient(90deg, #096A9D, #00C9FF)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             fontWeight: "bold",
//           }}
//         >
//           Services
//         </span>{" "}
//         include
//       </h1>

//       {/* جزء الكومبوننت بس (مش هيسد الصفحة) */}
//       <div
//         ref={sceneRef}
//         className="relative w-full overflow-hidden"
//         style={{
//           background: "#0f144c",
//           height: "500px", 
//         }}
//       />
//     </div>
//   );
// };

















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



