import React, { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Body,
} from "matter-js";

export function InteractiveFallingTags() {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Engine.create());
  const frameIdRef = useRef<number | null>(null);
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

  // Function to reset a tag with random position and velocity
  const resetTagRandomly = (tag: { elem: HTMLDivElement; body: Body; w: number; h: number }, width: number, height: number) => {
    // Random X position within bounds
    const randomX = Math.random() * (width - tag.w) + tag.w / 2;
    // Start from above the container - make sure it's visible
    const randomY = -Math.random() * height * 0.5 - tag.h;
    
    // Random velocity for interesting movement
    const randomVelocityX = (Math.random() - 0.5) * 3;
    const randomVelocityY = Math.random() * 4 + 2;
    
    Body.setPosition(tag.body, { x: randomX, y: randomY });
    Body.setVelocity(tag.body, { x: randomVelocityX, y: randomVelocityY });
    Body.setAngularVelocity(tag.body, (Math.random() - 0.5) * 0.08);
  };

  useEffect(() => {
    const engine = engineRef.current;
    const scene = sceneRef.current;
    if (!scene) return;

    // Reset engine
    engine.gravity.y = 0.3;
    engine.gravity.x = 0;

    const width = scene.offsetWidth;
    const height = scene.offsetHeight;

    // Clear previous content
    scene.innerHTML = "";

    // Create renderer directly in scene
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
    render.canvas.style.zIndex = "1";
    render.canvas.style.pointerEvents = "none";

    const runner = Runner.create();
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
      Bodies.rectangle(width / 2, -wallThickness / 2, width + 100, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
    ];

    World.add(engine.world, boundaries);

    // Create tags with different starting positions
    const tagBodies = tags.map((tag, index) => {
      const elem = document.createElement("div");
      elem.innerText = tag.text;
      elem.style.position = "absolute";
      elem.style.zIndex = "2";
      elem.style.padding = "8px 16px";
      elem.style.borderRadius = "25px";
      elem.style.background = tag.color;
      elem.style.color = "white";
      elem.style.fontWeight = "600";
      elem.style.fontSize = "14px";
      elem.style.userSelect = "none";
      elem.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      elem.style.whiteSpace = "nowrap";
      elem.style.cursor = "default";
      elem.style.pointerEvents = "none";
      elem.style.opacity = "1";

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
      
      const w = tempDiv.offsetWidth + 20;
      const h = tempDiv.offsetHeight + 10;
      document.body.removeChild(tempDiv);

      // Position tags at different heights so they're all visible
      // Some at the top, some midway, some at the bottom
      let randomY;
      if (index < 5) {
        // First 5 tags start near the top
        randomY = Math.random() * (height * 0.2);
      } else if (index < 10) {
        // Next 5 tags start in the middle
        randomY = height * 0.3 + Math.random() * (height * 0.3);
      } else {
        // Remaining tags start near the top but with different spacing
        randomY = Math.random() * (height * 0.4) - 50;
      }
      
      const randomX = Math.random() * (width - w) + w / 2;

      // Create body
      const body = Bodies.rectangle(randomX, randomY, w, h, {
        restitution: 0.6 + Math.random() * 0.3,
        friction: 0.1,
        frictionAir: 0.02,
        density: 0.001,
        chamfer: { radius: 15 },
        render: { visible: false },
      });

      // Set random initial velocity - all moving downward but with different speeds
      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 2, 
        y: Math.random() * 3 + 1 
      });
      
      // Add random angular velocity
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      World.add(engine.world, body);
      
      // Set initial position
      elem.style.left = `${randomX - w / 2}px`;
      elem.style.top = `${randomY - h / 2}px`;
      
      scene.appendChild(elem);

      return { elem, body, w, h };
    });

    tagBodiesRef.current = tagBodies;

    // Animation loop with continuous randomization
    let lastRandomizeTime = Date.now();
    const RANDOMIZE_INTERVAL = 1000; // Randomize every second

    const updateTags = () => {
      const currentWidth = scene.offsetWidth;
      const currentHeight = scene.offsetHeight;
      const now = Date.now();
      
      tagBodies.forEach((tag) => {
        // Reset if fallen too far
        if (tag.body.position.y > currentHeight + 100) {
          resetTagRandomly(tag, currentWidth, currentHeight);
        }
        
        // Randomize velocities periodically for continuous movement variation
        if (now - lastRandomizeTime > RANDOMIZE_INTERVAL) {
          // Add small random impulse to 30% of tags
          if (Math.random() < 0.3) {
            const randomImpulseX = (Math.random() - 0.5) * 0.03;
            const randomImpulseY = (Math.random() - 0.5) * 0.02;
            Body.applyForce(tag.body, tag.body.position, { 
              x: randomImpulseX, 
              y: randomImpulseY 
            });
          }
          
          // Randomly adjust velocity for some tags
          if (Math.random() < 0.2) {
            const newVelX = tag.body.velocity.x + (Math.random() - 0.5) * 1;
            const newVelY = tag.body.velocity.y + (Math.random() - 0.5) * 0.8;
            Body.setVelocity(tag.body, {
              x: Math.min(Math.max(newVelX, -5), 5),
              y: Math.min(Math.max(newVelY, -8), 10)
            });
          }
        }
        
        // Update position
        tag.elem.style.left = `${tag.body.position.x - tag.w / 2}px`;
        tag.elem.style.top = `${tag.body.position.y - tag.h / 2}px`;
        tag.elem.style.transform = `rotate(${tag.body.angle}rad)`;
      });
      
      // Reset the randomize timer
      if (now - lastRandomizeTime > RANDOMIZE_INTERVAL) {
        lastRandomizeTime = now;
      }

      frameIdRef.current = requestAnimationFrame(updateTags);
    };

    updateTags();

    // Handle resize
    const handleResize = () => {
      if (!scene) return;
      
      const newWidth = scene.offsetWidth;
      const newHeight = scene.offsetHeight;
      
      render.options.width = newWidth;
      render.options.height = newHeight;
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      
      // Update boundaries
      boundaries.forEach((boundary, index) => {
        if (index === 0) {
          Body.setPosition(boundary, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
        } else if (index === 1) {
          Body.setPosition(boundary, { x: -wallThickness / 2, y: newHeight / 2 });
        } else if (index === 2) {
          Body.setPosition(boundary, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
        } else if (index === 3) {
          Body.setPosition(boundary, { x: newWidth / 2, y: -wallThickness / 2 });
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
      
      tagBodies.forEach(({ elem }) => {
        if (elem && elem.parentNode) {
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
          height: "350px",
          maxWidth: "94%",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "12px",
          background: "linear-gradient(180deg, rgba(15, 20, 76, 0.9) 0%, rgba(15, 20, 76, 0.7) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
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
//   Body,
//   Events,
// } from "matter-js";

// export function InteractiveFallingTags() {
//   const sceneRef = useRef<HTMLDivElement | null>(null);
//   const engineRef = useRef(Engine.create());
//   const isDraggingRef = useRef(false);
//   const frameIdRef = useRef<number | null>(null);
//   const mouseConstraintRef = useRef<MouseConstraint | null>(null);
//   const tagBodiesRef = useRef<Array<{ elem: HTMLDivElement; body: Body; w: number; h: number }>>([]);

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

//     // Reset engine for clean start
//     engine.gravity.y = 0.7;
//     engine.gravity.x = 0;

//     const width = scene.offsetWidth;
//     const height = scene.offsetHeight;

//     // Clear previous content
//     scene.innerHTML = "";

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
//         showDebug: false,
//       },
//     });

//     render.canvas.style.position = "absolute";
//     render.canvas.style.top = "0";
//     render.canvas.style.left = "0";
//     render.canvas.style.zIndex = "1"; // Canvas behind tags
//     render.canvas.style.pointerEvents = "auto";

//     // Enable mouse events on canvas
//     render.canvas.style.touchAction = "none";
//     render.canvas.style.userSelect = "none";

//     const runner = Runner.create({
//       delta: 1000 / 60,
//       isFixed: true,
//     });

//     Runner.run(runner, engine);
//     Render.run(render);

//     // World boundaries
//     const wallThickness = 50;
//     const boundaries = [
//       Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, {
//         isStatic: true,
//         render: { visible: false },
//       }),
//       Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, {
//         isStatic: true,
//         render: { visible: false },
//       }),
//       Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + 100, {
//         isStatic: true,
//         render: { visible: false },
//       }),
//     ];

//     World.add(engine.world, boundaries);

//     // Create tags
//     const tagBodies = tags.map((tag, i) => {
//       const elem = document.createElement("div");
//       elem.innerText = tag.text;
//       elem.style.position = "absolute";
//       elem.style.zIndex = "2"; // Tags above canvas
//       elem.style.padding = "8px 16px";
//       elem.style.borderRadius = "25px";
//       elem.style.background = tag.color;
//       elem.style.color = "white";
//       elem.style.fontWeight = "600";
//       elem.style.fontSize = "14px";
//       elem.style.userSelect = "none";
//       elem.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//       elem.style.whiteSpace = "nowrap";
//       elem.style.cursor = "grab";
//       elem.style.pointerEvents = "none"; // Let events pass through to canvas

//       // Calculate dimensions
//       const tempDiv = document.createElement("div");
//       tempDiv.style.position = "absolute";
//       tempDiv.style.visibility = "hidden";
//       tempDiv.style.whiteSpace = "nowrap";
//       tempDiv.style.padding = "8px 16px";
//       tempDiv.style.fontSize = "14px";
//       tempDiv.style.fontWeight = "600";
//       tempDiv.innerText = tag.text;
//       document.body.appendChild(tempDiv);
      
//       const w = Math.max(tempDiv.offsetWidth, 120) + 10;
//       const h = Math.max(tempDiv.offsetHeight, 40) + 10;
//       document.body.removeChild(tempDiv);

//       scene.appendChild(elem);

//       // Position tags randomly
//       const x = Math.random() * (width - w * 1.5) + w * 0.75;
//       const y = -Math.random() * height * 2 - i * 30;

//       const body = Bodies.rectangle(x + w / 2, y, w, h, {
//         restitution: 0.4,
//         friction: 0.1,
//         frictionAir: 0.02,
//         density: 0.001,
//         chamfer: { radius: h / 2 },
//         render: { visible: false },
//         label: `tag-${i}`,
//       });

//       World.add(engine.world, body);

//       return { elem, body, w, h };
//     });

//     tagBodiesRef.current = tagBodies;

//     // Setup mouse constraint for interaction
//     const mouse = Mouse.create(render.canvas);
//     const mouseConstraint = MouseConstraint.create(engine, {
//       mouse: mouse,
//       constraint: {
//         stiffness: 0.2,
//         damping: 0.1,
//         render: { visible: false }
//       }
//     });

//     mouseConstraintRef.current = mouseConstraint;
    
//     // Make sure mouse constraint can interact with all bodies
//     mouseConstraint.collisionFilter.mask = 0xFFFFFFFF;
    
//     World.add(engine.world, mouseConstraint);
//     render.mouse = mouse;

//     Events.on(mouseConstraint, "startdrag", () => {
//       document.body.style.cursor = "grabbing";
//     });

//     Events.on(mouseConstraint, "enddrag", () => {
//       document.body.style.cursor = "default";
//     });


//     // Handle mouse events on the canvas
//     render.canvas.addEventListener("mousedown", () => {
//       isDraggingRef.current = true;
//     });

//     render.canvas.addEventListener("mouseup", () => {
//       isDraggingRef.current = false;
//     });

//     // Handle touch events
//     let isDraggingTag = false;

//     render.canvas.addEventListener("touchstart", (e) => {
//       if (e.touches[0]) {
//         const rect = render.canvas.getBoundingClientRect();
//         mouse.absolute.x = e.touches[0].clientX - rect.left;
//         mouse.absolute.y = e.touches[0].clientY - rect.top;
//         mouse.button = 0;
//         mouse.mousedown(null);
//         isDraggingTag = true;
//       }
//     }, { passive: true });

//     render.canvas.addEventListener("touchend", () => {
//       isDraggingTag = false;
//       isDraggingRef.current = false;
//       mouse.button = -1;
//       mouse.mouseup(null);
//     }, { passive: true });

//     render.canvas.addEventListener("touchmove", (e) => {
//       if (isDraggingTag && e.touches[0]) {
//         e.preventDefault();
//         const rect = render.canvas.getBoundingClientRect();
//         mouse.absolute.x = e.touches[0].clientX - rect.left;
//         mouse.absolute.y = e.touches[0].clientY - rect.top;
//       }
//     }, { passive: false });

//     // Update DOM positions
//     const updateTags = () => {
//       tagBodies.forEach(({ elem, body, w, h }) => {
//         // Reset if fallen too far
//         if (body.position.y > height + 200) {
//           Body.setPosition(body, {
//             x: Math.random() * (width - w * 1.5) + w * 0.75,
//             y: -50
//           });
//           Body.setVelocity(body, { x: 0, y: 0 });
//           Body.setAngularVelocity(body, 0);
//         }

//         // Update element position
//         elem.style.left = `${body.position.x - w / 2}px`;
//         elem.style.top = `${body.position.y - h / 2}px`;
//         elem.style.transform = `rotate(${body.angle}rad)`;
        
//         // Change cursor when dragging
//         if (mouseConstraint.body === body) {
//           elem.style.cursor = "grabbing";
//         } else {
//           elem.style.cursor = "grab";
//         }
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
      
//       // Update boundary positions
//       boundaries.forEach((boundary, index) => {
//         if (index === 0) { // floor
//           Body.setPosition(boundary, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
//         } else if (index === 1) { // left wall
//           Body.setPosition(boundary, { x: -wallThickness / 2, y: newHeight / 2 });
//         } else if (index === 2) { // right wall
//           Body.setPosition(boundary, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
//         }
//       });
//     };

//     window.addEventListener('resize', handleResize);

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
      
//       // Clean up DOM elements
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
      
//     </div>
//   );
// };





