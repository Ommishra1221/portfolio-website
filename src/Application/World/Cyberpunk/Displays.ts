import * as THREE from 'three';
import RoomKit from './RoomKit';

// Verified local reference: portfolio-inner-site/src/constants/portfolioContent.ts.
// Static display copy keeps the two applications independently buildable.
const repositories = [
    {
        title: 'E-Commerce Backend System',
        summary: ['A secure commerce backend designed around clear', 'product, user, and order workflows.'],
        technologies: 'Java / Spring Boot / Spring Security / MySQL',
        url: 'github.com/Ommishra1221/ecommerce-springboot-react',
    },
    {
        title: 'Leave Management System',
        summary: ['A structured employee leave workflow from application', 'through administrator approval.'],
        technologies: 'Java / Spring MVC / MySQL / JPA',
        url: 'github.com/Ommishra1221/Leave-Management-System',
    },
];

/** Static workspace illustrations; no API requests, activity counters or live output. */
export function displayTexture(kit: RoomKit, mode: 'github' | 'terminal') {
    const fallback = () => {
        const texture = new THREE.DataTexture(new Uint8Array([8, 11, 20, 255]), 1, 1);
        texture.needsUpdate = true;
        return kit.texture(texture);
    };
    if (typeof document === 'undefined') return fallback();
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 600;
    const context = canvas.getContext('2d');
    if (!context) {
        console.warn('[CyberpunkRoom] Decorative display unavailable; portfolio monitor is preserved.');
        return fallback();
    }
    const text = (value: string, x: number, y: number, color = '#b5c3d8', size = 21) => {
        context.font = `${size}px monospace`;
        context.fillStyle = color;
        context.fillText(value, x, y);
    };
    context.fillStyle = '#080b14';
    context.fillRect(0, 0, 960, 600);
    context.fillStyle = '#101827';
    context.fillRect(0, 0, 960, 58);
    text(mode === 'github' ? 'GITHUB / REPOSITORIES' : 'BACKEND / JAVA WORKSPACE', 32, 37, '#dce5f3', 23);
    for (let index = 0; index < 3; index++) {
        context.fillStyle = ['#466075', '#385a68', '#514067'][index];
        context.fillRect(844 + index * 26, 25, 9, 9);
    }
    if (mode === 'github') {
        text('Om Kumar Mishra', 32, 105, '#dce5f3', 30);
        text('github.com/Ommishra1221', 32, 140, '#61d6e8');
        repositories.forEach((repository, index) => {
            const top = 165 + index * 185;
            context.fillStyle = '#111b2b';
            context.fillRect(32, top, 896, 167);
            context.fillStyle = index ? '#8b5cf6' : '#00b8cc';
            context.fillRect(32, top, 3, 167);
            text(repository.title, 52, top + 32, '#dce5f3', 25);
            repository.summary.forEach((line, row) => text(line, 52, top + 63 + row * 25, '#9daec5', 20));
            text(repository.technologies, 52, top + 119, '#bca6f3', 19);
            text(repository.url, 52, top + 146, '#61d6e8', 17);
        });
        text('STATIC PORTFOLIO REFERENCE / NO LIVE ACTIVITY', 32, 574, '#8293ac', 17);
    } else {
        text('ILLUSTRATIVE EXAMPLE / NOT A LIVE SESSION', 32, 103, '#bca6f3', 20);
        const lines: Array<[string, string]> = [
            ['// Spring Boot / REST API example', '#8293ac'],
            ['@RestController', '#bca6f3'],
            ['class OrderController {', '#61d6e8'],
            ['  @GetMapping("/api/orders")', '#bca6f3'],
            ['  List<Order> orders() {', '#61d6e8'],
            ['    return service.findAll();', '#dce5f3'],
            ['  }', '#dce5f3'],
            ['}', '#dce5f3'],
            ['', '#8293ac'],
            ['$ mvn test  # illustrative Maven command', '#61d6e8'],
            ['-- SQL example', '#8293ac'],
            ['SELECT id, status FROM orders;', '#bca6f3'],
        ];
        lines.forEach(([line, color], index) => {
            const y = 148 + index * 31;
            text(String(index + 1).padStart(2, '0'), 32, y, '#52637d', 17);
            text(line, 80, y, color, 22);
        });
        text('STATIC CODE STUDY / NO COMMANDS EXECUTED', 32, 574, '#8293ac', 17);
    }
    const texture = kit.texture(new THREE.CanvasTexture(canvas));
    texture.encoding = THREE.sRGBEncoding;
    texture.anisotropy = 2;
    return texture;
}
