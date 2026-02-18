import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  imports: [CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  cursorX = 0;
  cursorY = 0;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationFrameId: number = 0;
  private mouse = { x: 0, y: 0 };

  constructor(private router: Router) { }

  ngOnInit() {
    this.initParticles();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initParticles() {
    this.canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Create initial particles
    this.createParticles();
    this.animate();
  }

  private createParticles() {
    this.particles = [];
    const numberOfParticles = (this.canvas!.width * this.canvas!.height) / 9000; // Density
    for (let i = 0; i < numberOfParticles; i++) {
      this.particles.push(new Particle(this.canvas!.width, this.canvas!.height));
    }
  }

  private resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createParticles(); // Recreate on resize for proper distribution
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
  }

  private animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas.width, this.canvas.height, this.mouse);
      this.particles[i].draw(this.ctx);

      // Connect particles - Professional thin lines
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - distance / 800})`; // Very subtle lines
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }

      // Connect to mouse - Slightly stronger but still subtle
      const dx = this.particles[i].x - this.mouse.x;
      const dy = this.particles[i].y - this.mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 180) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 - distance / 720})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  baseX: number;
  baseY: number;
  angle: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = Math.random() * 2 + 1; // Small, uniform size
    this.speedX = (Math.random() * 0.5) - 0.25; // Slow movement
    this.speedY = (Math.random() * 0.5) - 0.25;
    this.angle = Math.random() * 360;

    // Professional monochrome palette with slight opacity variation
    const opacity = Math.random() * 0.5 + 0.3;
    this.color = `rgba(255, 255, 255, ${opacity})`;
  }

  update(width: number, height: number, mouse: { x: number, y: number }) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Subtle "breathing" movement using sine wave
    this.angle += 0.02;
    this.x += Math.sin(this.angle) * 0.2;
    this.y += Math.cos(this.angle) * 0.2;

    // Wrap around edges for infinite flow feeling
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    else if (this.y < 0) this.y = height;

    // Mouse interaction (Fluid magnetic pull)
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (150 - distance) / 150;
      const directionX = forceDirectionX * force * 1.5;
      const directionY = forceDirectionY * force * 1.5;

      this.x += directionX;
      this.y += directionY;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
