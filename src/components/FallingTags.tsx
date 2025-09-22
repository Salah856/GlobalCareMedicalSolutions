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
  const sceneRef = useRef(null);
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

    // Put canvas behind DOM tags
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.zIndex = "0";

    // Start engine + renderer
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
      elem.style.zIndex = "1"; // ensure above canvas
      elem.style.padding = "6px 12px";
      elem.style.borderRadius = "20px";
      elem.style.background = tag.color;
      elem.style.color = "white";
      elem.style.fontWeight = "bold";
      elem.style.userSelect = "none";
      elem.style.pointerEvents = "none"; 

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

    // Enable drag with mouse
    const mouse = Mouse.create(render.canvas);
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
    <>
    <h1 
      style={{ 
        color: "#fff", 
        fontSize: "4rem",
        textAlign: "center",
        fontFamily: "Times New Roman",
      }}
    >
      Our <span
        style={{
          background: "linear-gradient(90deg, #096A9D, #00C9FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "bold",
          fontSize: "4rem",
          margin: "0 10px",
        }}
      >
        Services
      </span> includes
    </h1>
    <div
      ref={sceneRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#0f144c" }}
    />
    </>
  );
};


















// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";

// export function InteractiveFallingTags() {
//   const containerRef = useRef(null);
//   const [draggedElement, setDraggedElement] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [touchCounts, setTouchCounts] = useState({});
//   const [staticElements, setStaticElements] = useState(new Set());

//   const tags = [
//     { id: 1, text: "Internal Medicine", color: "#8B0000" },
//     { id: 2, text: "Oncology", color: "#6A5ACD" },
//     { id: 3, text: "Gastroenterology", color: "#228B22" },
//     { id: 4, text: "Nurse Practitioner", color: "#1E90FF" },
//     { id: 5, text: "Psychiatrists", color: "#FF1493" },
//     { id: 6, text: "Plastic Surgery", color: "#FFD700" },
//     { id: 7, text: "Rehabilitation", color: "#DC143C" },
//     { id: 8, text: "Urology", color: "#FF8C00" },
//     { id: 9, text: "Family Medicine", color: "#2F4F4F" }
//   ];

//   useEffect(() => {
//     if (!isDragging) {
//       initAnimations();
//     }
//   }, [isDragging]);

//   const initAnimations = () => {
//     const elements = containerRef.current.querySelectorAll(".tag:not(.dragging):not(.static)");
    
//     elements.forEach((el, i) => {
//       // Skip if element is static
//       if (staticElements.has(el.dataset.id)) return;
      
//       // Reset any existing animations
//       gsap.killTweensOf(el);
      
//       // Set initial random position
//       gsap.set(el, {
//         x: Math.random() * (window.innerWidth - 150),
//         y: Math.random() * 200,
//         rotation: Math.random() * 30 - 15
//       });

//       // Create falling animation with bounce
//       gsap.to(el, {
//         y: window.innerHeight - 150,
//         rotation: "+=" + (Math.random() * 60 - 30),
//         duration: 3 + Math.random() * 2,
//         ease: "bounce.out",
//         repeat: -1,
//         yoyo: true,
//         delay: i * 0.2
//       });

//       // Add horizontal drift
//       gsap.to(el, {
//         x: "+=" + (Math.random() * 100 - 50),
//         duration: 6 + Math.random() * 3,
//         ease: "sine.inOut",
//         repeat: -1,
//         yoyo: true
//       });
//     });
//   };

//   const handleTouchStart = (e, id) => {
//     setIsDragging(true);
//     const element = e.currentTarget;
//     setDraggedElement(element);
    
//     // Kill any existing animations on this element
//     gsap.killTweensOf(element);
    
//     // Add dragging class for styling
//     element.classList.add("dragging");
    
//     // Store initial positions
//     const rect = element.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left;
//     const offsetY = e.clientY - rect.top;
    
//     element.dataset.offsetX = offsetX;
//     element.dataset.offsetY = offsetY;
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging || !draggedElement) return;
    
//     const offsetX = parseFloat(draggedElement.dataset.offsetX);
//     const offsetY = parseFloat(draggedElement.dataset.offsetY);
    
//     // Update element position to follow pointer
//     gsap.set(draggedElement, {
//       x: e.clientX - offsetX - draggedElement.parentElement.getBoundingClientRect().left,
//       y: e.clientY - offsetY - draggedElement.parentElement.getBoundingClientRect().top,
//       rotation: gsap.getProperty(draggedElement, "rotation")
//     });
//   };

//   const handleTouchEnd = () => {
//     if (!draggedElement) return;
    
//     setIsDragging(false);
    
//     // Remove dragging class
//     draggedElement.classList.remove("dragging");
    
//     // Get element ID and update touch count
//     const elementId = draggedElement.dataset.id;
//     const currentCount = touchCounts[elementId] || 0;
//     const newCount = currentCount + 1;
    
//     setTouchCounts(prev => ({
//       ...prev,
//       [elementId]: newCount
//     }));
    
//     // If touched 3 times, make it static
//     if (newCount >= 3) {
//       draggedElement.classList.add("static");
//       setStaticElements(prev => new Set([...prev, elementId]));
      
//       // Make it fall to the ground and stay there
//       gsap.to(draggedElement, {
//         y: window.innerHeight - 150,
//         rotation: 0,
//         duration: 1.5,
//         ease: "bounce.out"
//       });
//     } else {
//       // Spring up then fall
//       gsap.to(draggedElement, {
//         y: Math.random() * 200, // Spring up to a random height
//         rotation: "+=" + (Math.random() * 60 - 30),
//         duration: 0.5,
//         ease: "power1.out",
//         onComplete: () => {
//           // Then fall down
//           gsap.to(draggedElement, {
//             y: window.innerHeight - 150,
//             rotation: "+=" + (Math.random() * 60 - 30),
//             duration: 1.5,
//             ease: "bounce.out",
//             onComplete: () => {
//               // After falling, resume normal animation if not static
//               if (!staticElements.has(elementId)) {
//                 initAnimations();
//               }
//             }
//           });
//         }
//       });
//     }
    
//     setDraggedElement(null);
//   };

//   // Add event listeners for mouse actions
//   useEffect(() => {
//     const handleMouseUp = () => {
//       if (isDragging) {
//         handleTouchEnd();
//       }
//     };

//     const handleMouseMove = (e) => {
//       if (isDragging) {
//         handleTouchMove(e);
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, draggedElement, touchCounts, staticElements]);

//   return (
//     <div 
//       className="relative w-full h-screen bg-blue-900 overflow-hidden"
//       onMouseMove={handleTouchMove}
//       onMouseUp={handleTouchEnd}
//     >
//       <div className="absolute top-0 left-0 w-full p-6 text-center z-10">
//         <h1 className="text-3xl font-bold text-white mb-2">Medical Specialties</h1>
//         {/* <p className="text-white opacity-80">Touch tags to make them spring up! After 3 touches, they'll stay on the ground.</p> */}
//       </div>
      
//       <div ref={containerRef} className="absolute w-full h-full">
//         {tags.map((tag) => (
//           <div
//             key={tag.id}
//             data-id={tag.id}
//             className="tag absolute px-4 py-2 rounded-full text-white font-medium shadow-lg cursor-pointer select-none"
//             style={{ 
//               backgroundColor: tag.color,
//               userSelect: 'none',
//               touchAction: 'none'
//             }}
//             onMouseDown={(e) => handleTouchStart(e, tag.id)}
//           >
//             {tag.text}
//           </div>
//         ))}
//       </div>
      
//       {/* Inline styles for the dragging effect */}
//       <style>
//         {`
//           .tag.dragging {
//             z-index: 100;
//             box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
//           }
//           .tag.static {
//             cursor: default;
//             opacity: 0.8;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

