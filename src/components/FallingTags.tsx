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
  const tagBodiesRef = useRef<Array<{ elem: HTMLDivElement; body: Body; w: number; h: number; hasLanded: boolean; driftDirection: { x: number; y: number } }>>([]);

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

  // Reset tag for falling again
  const resetTagRandomly = (tag: any, width: number, height: number) => {
    const randomX = Math.random() * (width - tag.w) + tag.w / 2;
    const randomY = -Math.random() * height * 0.5 - tag.h;
    
    const randomVelocityX = (Math.random() - 0.5) * 2;
    const randomVelocityY = Math.random() * 5 + 2;
    
    Body.setPosition(tag.body, { x: randomX, y: randomY });
    Body.setVelocity(tag.body, { x: randomVelocityX, y: randomVelocityY });
    Body.setAngularVelocity(tag.body, (Math.random() - 0.5) * 0.08);
    tag.hasLanded = false;
    
    // Assign random drift direction for when it lands
    tag.driftDirection = {
      x: (Math.random() - 0.5) * 0.8,
      y: (Math.random() - 0.5) * 0.4
    };
  };

  // Make tag start drifting slowly
  const startDrifting = (tag: any) => {
    if (tag.hasLanded) return;
    
    tag.hasLanded = true;
    
    // Random slow velocity in different directions
    const slowSpeedX = tag.driftDirection.x || (Math.random() - 0.5) * 0.8;
    const slowSpeedY = tag.driftDirection.y || (Math.random() - 0.5) * 0.4;
    
    Body.setVelocity(tag.body, { x: slowSpeedX, y: slowSpeedY });
    Body.setAngularVelocity(tag.body, (Math.random() - 0.5) * 0.02);
  };

  useEffect(() => {
    const engine = engineRef.current;
    const scene = sceneRef.current;
    if (!scene) return;

    // Very low gravity so they float slowly
    engine.gravity.y = 0.05;
    engine.gravity.x = 0;

    const width = scene.offsetWidth;
    const height = scene.offsetHeight;

    scene.innerHTML = "";

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
        restitution: 0.3,
      }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, {
        isStatic: true,
        render: { visible: false },
        restitution: 0.5,
      }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + 100, {
        isStatic: true,
        render: { visible: false },
        restitution: 0.5,
      }),
      Bodies.rectangle(width / 2, -wallThickness / 2, width + 100, wallThickness, {
        isStatic: true,
        render: { visible: false },
        restitution: 0.5,
      }),
    ];

    World.add(engine.world, boundaries);

    // Create tags
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

      let randomY;
      if (index < 5) {
        randomY = Math.random() * (height * 0.2);
      } else if (index < 10) {
        randomY = height * 0.3 + Math.random() * (height * 0.3);
      } else {
        randomY = Math.random() * (height * 0.4) - 50;
      }
      
      const randomX = Math.random() * (width - w) + w / 2;

      const body = Bodies.rectangle(randomX, randomY, w, h, {
        restitution: 0.4,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.0005,
        chamfer: { radius: 15 },
        render: { visible: false },
      });

      Body.setVelocity(body, { 
        x: (Math.random() - 0.5) * 1.5, 
        y: Math.random() * 3 + 2 
      });
      
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

      World.add(engine.world, body);
      
      elem.style.left = `${randomX - w / 2}px`;
      elem.style.top = `${randomY - h / 2}px`;
      
      scene.appendChild(elem);

      return { 
        elem, 
        body, 
        w, 
        h, 
        hasLanded: false,
        driftDirection: {
          x: (Math.random() - 0.5) * 0.8,
          y: (Math.random() - 0.5) * 0.4
        }
      };
    });

    tagBodiesRef.current = tagBodies;

    // Animation loop
    let lastDriftUpdate = Date.now();
    const DRIFT_INTERVAL = 15;

    const updateTags = () => {
      const currentWidth = scene.offsetWidth;
      const currentHeight = scene.offsetHeight;
      const now = Date.now();
      
      tagBodies.forEach((tag) => {
        // Check if tag has landed (near bottom and slow)
        const isNearGround = tag.body.position.y > currentHeight - 40;
        const isSlow = Math.abs(tag.body.velocity.y) < 0.6;
        
        if (!tag.hasLanded && isNearGround && isSlow) {
          startDrifting(tag);
        }
        
        // Keep drifting tags moving slowly in random directions
        if (tag.hasLanded) {
          // Change direction randomly every interval
          if (now - lastDriftUpdate > DRIFT_INTERVAL) {
            // Randomly change drift direction slowly
            if (Math.random() < 0.5) {
              tag.driftDirection.x += (Math.random() - 0.5) * 0.3;
              tag.driftDirection.y += (Math.random() - 0.5) * 0.2;
              
              // Keep speeds slow
              tag.driftDirection.x = Math.min(Math.max(tag.driftDirection.x, -0.9), 0.9);
              tag.driftDirection.y = Math.min(Math.max(tag.driftDirection.y, -0.6), 0.6);
              
              // Apply new slow velocity
              Body.setVelocity(tag.body, { 
                x: tag.driftDirection.x, 
                y: tag.driftDirection.y 
              });
            }
            
            // Random tiny angular movement
            if (Math.random() < 0.4) {
              Body.setAngularVelocity(tag.body, (Math.random() - 0.5) * 0.015);
            }
          }
          
          // Add very gentle random forces to keep them moving
          if (Math.random() < 0.03) {
            const gentleForceX = (Math.random() - 0.5) * 0.008;
            const gentleForceY = (Math.random() - 0.5) * 0.005;
            Body.applyForce(tag.body, tag.body.position, { 
              x: gentleForceX, 
              y: gentleForceY 
            });
          }
          
          // Ensure drifting tags always have some slow movement
          const currentVel = tag.body.velocity;
          if (Math.abs(currentVel.x) < 0.1 && Math.abs(currentVel.y) < 0.1) {
            // Give them a little push if they stop completely
            Body.setVelocity(tag.body, { 
              x: tag.driftDirection.x * 0.5, 
              y: tag.driftDirection.y * 0.3 
            });
          }
          
          // Cap velocities to keep movement slow
          if (Math.abs(tag.body.velocity.x) > 1.2) {
            Body.setVelocity(tag.body, { 
              x: tag.body.velocity.x * 0.98, 
              y: tag.body.velocity.y 
            });
          }
          if (Math.abs(tag.body.velocity.y) > 0.8) {
            Body.setVelocity(tag.body, { 
              x: tag.body.velocity.x, 
              y: tag.body.velocity.y * 0.98 
            });
          }
        }
        
        // Reset if fallen off screen
        if (tag.body.position.y > currentHeight + 100) {
          resetTagRandomly(tag, currentWidth, currentHeight);
        }
        
        // Update position
        tag.elem.style.left = `${tag.body.position.x - tag.w / 2}px`;
        tag.elem.style.top = `${tag.body.position.y - tag.h / 2}px`;
        tag.elem.style.transform = `rotate(${tag.body.angle}rad)`;
      });
      
      if (now - lastDriftUpdate > DRIFT_INTERVAL) {
        lastDriftUpdate = now;
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
//   Body,
// } from "matter-js";

// export function InteractiveFallingTags() {
//   const sceneRef = useRef<HTMLDivElement | null>(null);
//   const engineRef = useRef(Engine.create());
//   const frameIdRef = useRef<number | null>(null);
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

//   // Function to reset a tag with random position and velocity
//   const resetTagRandomly = (tag: { elem: HTMLDivElement; body: Body; w: number; h: number }, width: number, height: number) => {
//     // Random X position within bounds
//     const randomX = Math.random() * (width - tag.w) + tag.w / 2;
//     // Start from above the container - make sure it's visible
//     const randomY = -Math.random() * height * 0.5 - tag.h;
    
//     // Random velocity for interesting movement
//     const randomVelocityX = (Math.random() - 0.5) * 3;
//     const randomVelocityY = Math.random() * 4 + 2;
    
//     Body.setPosition(tag.body, { x: randomX, y: randomY });
//     Body.setVelocity(tag.body, { x: randomVelocityX, y: randomVelocityY });
//     Body.setAngularVelocity(tag.body, (Math.random() - 0.5) * 0.08);
//   };

//   useEffect(() => {
//     const engine = engineRef.current;
//     const scene = sceneRef.current;
//     if (!scene) return;

//     // Reset engine
//     engine.gravity.y = 0.3;
//     engine.gravity.x = 0;

//     const width = scene.offsetWidth;
//     const height = scene.offsetHeight;

//     // Clear previous content
//     scene.innerHTML = "";

//     // Create renderer directly in scene
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
//     render.canvas.style.zIndex = "1";
//     render.canvas.style.pointerEvents = "none";

//     const runner = Runner.create();
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
//       Bodies.rectangle(width / 2, -wallThickness / 2, width + 100, wallThickness, {
//         isStatic: true,
//         render: { visible: false },
//       }),
//     ];

//     World.add(engine.world, boundaries);

//     // Create tags with different starting positions
//     const tagBodies = tags.map((tag, index) => {
//       const elem = document.createElement("div");
//       elem.innerText = tag.text;
//       elem.style.position = "absolute";
//       elem.style.zIndex = "2";
//       elem.style.padding = "8px 16px";
//       elem.style.borderRadius = "25px";
//       elem.style.background = tag.color;
//       elem.style.color = "white";
//       elem.style.fontWeight = "600";
//       elem.style.fontSize = "14px";
//       elem.style.userSelect = "none";
//       elem.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
//       elem.style.whiteSpace = "nowrap";
//       elem.style.cursor = "default";
//       elem.style.pointerEvents = "none";
//       elem.style.opacity = "1";

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
      
//       const w = tempDiv.offsetWidth + 20;
//       const h = tempDiv.offsetHeight + 10;
//       document.body.removeChild(tempDiv);

//       // Position tags at different heights so they're all visible
//       // Some at the top, some midway, some at the bottom
//       let randomY;
//       if (index < 5) {
//         // First 5 tags start near the top
//         randomY = Math.random() * (height * 0.2);
//       } else if (index < 10) {
//         // Next 5 tags start in the middle
//         randomY = height * 0.3 + Math.random() * (height * 0.3);
//       } else {
//         // Remaining tags start near the top but with different spacing
//         randomY = Math.random() * (height * 0.4) - 50;
//       }
      
//       const randomX = Math.random() * (width - w) + w / 2;

//       // Create body
//       const body = Bodies.rectangle(randomX, randomY, w, h, {
//         restitution: 0.6 + Math.random() * 0.3,
//         friction: 0.1,
//         frictionAir: 0.02,
//         density: 0.001,
//         chamfer: { radius: 15 },
//         render: { visible: false },
//       });

//       // Set random initial velocity - all moving downward but with different speeds
//       Body.setVelocity(body, { 
//         x: (Math.random() - 0.5) * 2, 
//         y: Math.random() * 3 + 1 
//       });
      
//       // Add random angular velocity
//       Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);

//       World.add(engine.world, body);
      
//       // Set initial position
//       elem.style.left = `${randomX - w / 2}px`;
//       elem.style.top = `${randomY - h / 2}px`;
      
//       scene.appendChild(elem);

//       return { elem, body, w, h };
//     });

//     tagBodiesRef.current = tagBodies;

//     // Animation loop with continuous randomization
//     let lastRandomizeTime = Date.now();
//     const RANDOMIZE_INTERVAL = 1000; // Randomize every second

//     const updateTags = () => {
//       const currentWidth = scene.offsetWidth;
//       const currentHeight = scene.offsetHeight;
//       const now = Date.now();
      
//       tagBodies.forEach((tag) => {
//         // Reset if fallen too far
//         if (tag.body.position.y > currentHeight + 100) {
//           resetTagRandomly(tag, currentWidth, currentHeight);
//         }
        
//         // Randomize velocities periodically for continuous movement variation
//         if (now - lastRandomizeTime > RANDOMIZE_INTERVAL) {
//           // Add small random impulse to 30% of tags
//           if (Math.random() < 0.3) {
//             const randomImpulseX = (Math.random() - 0.5) * 0.03;
//             const randomImpulseY = (Math.random() - 0.5) * 0.02;
//             Body.applyForce(tag.body, tag.body.position, { 
//               x: randomImpulseX, 
//               y: randomImpulseY 
//             });
//           }
          
//           // Randomly adjust velocity for some tags
//           if (Math.random() < 0.2) {
//             const newVelX = tag.body.velocity.x + (Math.random() - 0.5) * 1;
//             const newVelY = tag.body.velocity.y + (Math.random() - 0.5) * 0.8;
//             Body.setVelocity(tag.body, {
//               x: Math.min(Math.max(newVelX, -5), 5),
//               y: Math.min(Math.max(newVelY, -8), 10)
//             });
//           }
//         }
        
//         // Update position
//         tag.elem.style.left = `${tag.body.position.x - tag.w / 2}px`;
//         tag.elem.style.top = `${tag.body.position.y - tag.h / 2}px`;
//         tag.elem.style.transform = `rotate(${tag.body.angle}rad)`;
//       });
      
//       // Reset the randomize timer
//       if (now - lastRandomizeTime > RANDOMIZE_INTERVAL) {
//         lastRandomizeTime = now;
//       }

//       frameIdRef.current = requestAnimationFrame(updateTags);
//     };

//     updateTags();

//     // Handle resize
//     const handleResize = () => {
//       if (!scene) return;
      
//       const newWidth = scene.offsetWidth;
//       const newHeight = scene.offsetHeight;
      
//       render.options.width = newWidth;
//       render.options.height = newHeight;
//       render.canvas.width = newWidth;
//       render.canvas.height = newHeight;
      
//       // Update boundaries
//       boundaries.forEach((boundary, index) => {
//         if (index === 0) {
//           Body.setPosition(boundary, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
//         } else if (index === 1) {
//           Body.setPosition(boundary, { x: -wallThickness / 2, y: newHeight / 2 });
//         } else if (index === 2) {
//           Body.setPosition(boundary, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
//         } else if (index === 3) {
//           Body.setPosition(boundary, { x: newWidth / 2, y: -wallThickness / 2 });
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
      
//       tagBodies.forEach(({ elem }) => {
//         if (elem && elem.parentNode) {
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
//           height: "350px",
//           maxWidth: "94%",
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

