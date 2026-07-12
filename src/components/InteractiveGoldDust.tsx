import React, { useEffect, useRef, useState } from 'react';
import { Theme } from '../types';

interface InteractiveGoldDustProps {
  theme: Theme;
}

// WebGL shaders for high-performance organic gold fluid
const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_mouse_velocity;
  uniform float u_light_mode;

  // Royal Golden Palette
  const vec3 GOLD_DEEP  = vec3(0.58, 0.40, 0.09); // Rich antiqued bronze-gold
  const vec3 GOLD_MID   = vec3(0.92, 0.76, 0.30); // 18K Luxury Yellow Gold
  const vec3 GOLD_LIGHT = vec3(0.98, 0.88, 0.58); // 24K Pure Gold Highlights
  const vec3 GOLD_GLOW  = vec3(1.00, 0.95, 0.82); // High-specular shimmer luminescence

  // Classic high-performance pseudo-random hash generator
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // 2D Noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), 
      u.y
    );
  }

  // Domain warping FBM for exquisite fluid silk marbling
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    float frequency = 1.0;
    // Rotate matrix to reduce grid alignment artifacts
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      p = rot * p * 2.05 + vec2(0.15 * sin(p.y + u_time * 0.4), 0.15 * cos(p.x + u_time * 0.3));
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 m = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    float d = length(p - m);

    // Dynamic fluid force field warping based on mouse coordinates
    float mouse_active = step(0.01, u_mouse.x); // Check if mouse is active on screen
    
    // Warped flow vectors
    vec2 flow = p * 1.5;
    flow.y += u_time * 0.07;
    flow.x += sin(flow.y * 1.1 + u_time * 0.15) * 0.22;

    // Organic liquid gold silk folds
    vec2 warp_a = vec2(fbm(flow), fbm(flow + vec2(1.2, 3.4)));
    vec2 warp_b = vec2(fbm(flow + 4.2 * warp_a + vec2(0.2, 0.5) * u_time * 0.08), fbm(flow + 2.8 * warp_a));
    float silk = fbm(flow + 3.5 * warp_b);

    // Exquisite golden trail effects
    // Primary glowing trail
    float trail_core = exp(-d * 6.5) * 0.65;
    // Secondary wider atmospheric glow
    float trail_glow = exp(-d * 2.2) * 0.35;
    // Speed-dependent trail stretch / dynamic wake
    float wake = exp(-d * (12.0 - min(u_mouse_velocity * 8.5, 7.5))) * (0.35 + u_mouse_velocity * 0.7);

    // Sum of trails
    float final_trail = (trail_core + trail_glow + wake) * mouse_active;

    // Microscopic glitter star dust particles
    vec2 glitter_uv = gl_FragCoord.xy * 0.22;
    // Dynamic random blinking index
    float glitter_rand = hash(floor(glitter_uv) + vec2(floor(u_time * 18.0)));
    // Glimmering intensity
    float glitter = step(0.996, glitter_rand) * abs(sin(u_time * 4.0 + hash(floor(glitter_uv)) * 6.28));
    
    // Attract some glimmers towards the mouse trail (luxury magnetic sparkle field)
    float attraction = smoothstep(0.4, 0.0, d);
    glitter *= (1.0 + attraction * 3.5 * (1.0 + u_mouse_velocity * 2.0));

    // Refined premium color compounding
    vec3 base_gold = mix(GOLD_DEEP, GOLD_MID, silk);
    // Specular shine highlights
    base_gold += GOLD_LIGHT * pow(silk, 4.0) * 0.75;
    base_gold += GOLD_GLOW * pow(silk, 8.0) * 0.5;

    // Compound with trail color (adding beautiful light dispersion / chromatic glow)
    vec3 trail_color = mix(GOLD_MID, GOLD_LIGHT, smoothstep(0.1, 0.8, final_trail));
    trail_color += GOLD_GLOW * pow(final_trail, 3.0) * 1.5;

    // Combine
    vec3 final_color = base_gold * 0.8 + trail_color * final_trail * 1.6;
    final_color += GOLD_GLOW * glitter * 0.95; // Add raw specular glitters

    // Smooth transparency envelope to make it elegant, non-intrusive and sophisticated
    float alpha = silk * 0.065 + final_trail * 0.85 + glitter * 0.35;

    if (u_light_mode > 0.5) {
      // Light Theme: Soft refined champagne aura with high legibility
      alpha *= 0.38;
      vec3 light_ambient = mix(vec3(0.98, 0.97, 0.95), final_color, alpha * 0.4);
      gl_FragColor = vec4(light_ambient, alpha * 0.25);
    } else {
      // Dark Theme: Radiant floating stellar dust with deep contrast
      gl_FragColor = vec4(final_color, alpha);
    }
  }
`;

export default function InteractiveGoldDust({ theme }: InteractiveGoldDustProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webglError, setWebglError] = useState(false);

  // Mouse tracking with high-performance trailing interpolation
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, speed: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Track mouse coordinates with velocity
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = canvas.height - e.clientY; // Flip Y for WebGL coordinates
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Attempt WebGL Setup
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn("WebGL not supported. Falling back to 2D Canvas particles.");
      setWebglError(true);
      return;
    }

    // Helper functions for Shader compilation
    const compileShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(VERTEX_SHADER_SRC, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(FRAGMENT_SHADER_SRC, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      setWebglError(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setWebglError(true);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking failed:", gl.getProgramInfoLog(program));
      setWebglError(true);
      return;
    }

    gl.useProgram(program);

    // Bind viewport vertices
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttr);
    gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, false, 0, 0);

    // Retrieve uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uMouseVelocity = gl.getUniformLocation(program, 'u_mouse_velocity');
    const uLightMode = gl.getUniformLocation(program, 'u_light_mode');

    let animationFrameId: number;
    let startTime = Date.now();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const mouse = mouseRef.current;

      // Smoothly interpolate mouse coordinates (Lag-behind/trail effect)
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          // Lerp for exquisite trailing responsiveness
          mouse.x += (mouse.targetX - mouse.x) * 0.082;
          mouse.y += (mouse.targetY - mouse.y) * 0.082;
        }

        // Compute mouse speed/velocity
        const dx = mouse.x - mouse.lastX;
        const dy = mouse.y - mouse.lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        mouse.speed += (speed - mouse.speed) * 0.1; // Smooth speed factor
      } else {
        // Slowly ease to resting position
        mouse.speed += (0 - mouse.speed) * 0.05;
      }

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      // Clear color buffer
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass values to uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMouseVelocity, Math.min(mouse.speed / 100.0, 1.0));
      gl.uniform1f(uLightMode, theme === 'light' ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteBuffer(vertexBuffer);
    };
  }, [theme, webglError]);

  // High quality 2D Canvas Fallback in case WebGL fails
  useEffect(() => {
    if (!webglError) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spinSpeed: number;
      opacity: number;
    }[] = [];
    const maxParticles = 65;

    const handleResizeFallback = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1.2,
          speedY: -(Math.random() * 0.5 + 0.2),
          speedX: Math.random() * 0.4 - 0.2,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: Math.random() * 0.03 - 0.015,
          opacity: Math.random() * 0.55 + 0.2,
        });
      }
    };

    handleResizeFallback();
    window.addEventListener('resize', handleResizeFallback);

    const mouse = mouseRef.current;
    const handleMouseMoveFallback = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMoveFallback);

    const animateFallback = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = theme === 'light';

      // Interpolate mouse coordinates
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      }

      particles.forEach((p) => {
        p.angle += p.spinSpeed;
        p.x += p.speedX + Math.sin(p.angle) * 0.12;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        // Soft cursor attraction/repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 160 && mouse.x !== -1000) {
          const push = (160 - dist) * 0.035;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (isLight) {
          ctx.fillStyle = `rgba(182, 140, 52, ${p.opacity * 0.42})`;
        } else {
          ctx.fillStyle = `rgba(244, 212, 114, ${p.opacity})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.25)';
          ctx.shadowBlur = 5;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateFallback);
    };

    animateFallback();

    return () => {
      window.removeEventListener('resize', handleResizeFallback);
      window.removeEventListener('mousemove', handleMouseMoveFallback);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, webglError]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block transition-all"
      style={{ mixBlendMode: theme === 'light' ? 'multiply' : 'screen' }}
    />
  );
}
