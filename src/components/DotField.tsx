import {
  memo,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
} from 'react';

const TWO_PI = Math.PI * 2;

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type DotFieldProps = HTMLAttributes<HTMLDivElement> & {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
};

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  className = '',
  ...rest
}: DotFieldProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({
    x: -9999,
    y: -9999,
    prevX: -9999,
    prevY: -9999,
    speed: 0,
  });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const glowId = `dot-field-glow-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let resizeTimer: number | undefined;
    let frameCount = 0;

    const buildDots = (width: number, height: number) => {
      const step = dotRadius + dotSpacing;
      const columns = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const paddingX = (width % step) / 2;
      const paddingY = (height % step) / 2;
      const dots = new Array<Dot>(rows * columns);
      let index = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const ax = paddingX + column * step + step / 2;
          const ay = paddingY + row * step + step / 2;
          dots[index] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
          index += 1;
        }
      }

      dotsRef.current = dots;
    };

    const resize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const rect = container.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        sizeRef.current = { w: rect.width, h: rect.height };
        buildDots(rect.width, rect.height);
        if (reducedMotion) drawFrame();
      }, 60);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    const updateMouseSpeed = () => {
      const mouse = mouseRef.current;
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      mouse.speed += (distance - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const drawFrame = () => {
      frameCount += 1;
      updateMouseSpeed();

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const { w, h } = sizeRef.current;
      const time = frameCount * 0.02;
      const targetEngagement = reducedMotion ? 0 : Math.min(mouse.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const engaged = engagement.current;

      glowOpacity.current += (engaged - glowOpacity.current) * 0.08;
      if (glow) {
        glow.setAttribute('cx', String(mouse.x));
        glow.setAttribute('cy', String(mouse.y));
        glow.style.opacity = String(glowOpacity.current);
      }

      context.clearRect(0, 0, w, h);
      const gradient = context.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      context.fillStyle = gradient;
      context.beginPath();

      const cursorRadiusSquared = cursorRadius * cursorRadius;
      const radius = dotRadius / 2;

      for (let index = 0; index < dots.length; index += 1) {
        const dot = dots[index];
        const dx = mouse.x - dot.ax;
        const dy = mouse.y - dot.ay;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < cursorRadiusSquared && engaged > 0.01) {
          const distance = Math.max(1, Math.sqrt(distanceSquared));
          const angle = Math.atan2(dy, dx);

          if (bulgeOnly) {
            const proximity = 1 - distance / cursorRadius;
            const push = proximity * proximity * bulgeStrength * engaged;
            dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
            dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
          } else {
            const move = (500 / distance) * (mouse.speed * cursorForce);
            dot.vx -= Math.cos(angle) * move;
            dot.vy -= Math.sin(angle) * move;
          }
        } else if (bulgeOnly) {
          dot.sx += (dot.ax - dot.sx) * 0.1;
          dot.sy += (dot.ay - dot.sy) * 0.1;
        }

        if (!bulgeOnly) {
          dot.vx *= 0.9;
          dot.vy *= 0.9;
          dot.x = dot.ax + dot.vx;
          dot.y = dot.ay + dot.vy;
          dot.sx += (dot.x - dot.sx) * 0.1;
          dot.sy += (dot.y - dot.sy) * 0.1;
        }

        let drawX = dot.sx;
        let drawY = dot.sy;
        if (waveAmplitude > 0 && !reducedMotion) {
          drawY += Math.sin(dot.ax * 0.03 + time) * waveAmplitude;
          drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * waveAmplitude * 0.5;
        }

        const sparkleScale = sparkle && ((index * 2654435761 ^ frameCount >> 3) >>> 0) % 100 < 3
          ? 1.8
          : 1;
        const drawRadius = radius * sparkleScale;
        context.moveTo(drawX + drawRadius, drawY);
        context.arc(drawX, drawY, drawRadius, 0, TWO_PI);
      }

      context.fill();
      if (!reducedMotion || frameCount === 1) {
        rafRef.current = window.requestAnimationFrame(drawFrame);
      }
    };

    resize();
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', resize);
    rafRef.current = window.requestAnimationFrame(drawFrame);

    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      window.clearTimeout(resizeTimer);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', resize);
    };
  }, [
    bulgeOnly,
    bulgeStrength,
    cursorForce,
    cursorRadius,
    dotRadius,
    dotSpacing,
    gradientFrom,
    gradientTo,
    sparkle,
    waveAmplitude,
  ]);

  return (
    <div ref={containerRef} className={`dot-field-container ${className}`} {...rest}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <svg
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
