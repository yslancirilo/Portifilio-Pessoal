// Script para funcionalidades da timeline, scroll das linguagens e modo claro/escuro
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do modo claro/escuro
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    
    // Verificar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    // Função para trocar tema
    function toggleTheme(event) {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Adicionar efeito de transição suave
        body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Aplicar novo tema
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Efeito de ondas na tela
        if (event) createRippleEffect(event);
    }
    
    // Adicionar evento de clique no botão desktop
    if (themeToggle) {
        themeToggle.addEventListener('click', function(event) {
            toggleTheme(event);
            
            // Efeito visual surpresa - pulso no botão
            themeToggle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Adicionar evento de clique no botão mobile
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Função para criar efeito de ondas
    function createRippleEffect(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.1)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = (e.clientX - 25) + 'px';
        ripple.style.top = (e.clientY - 25) + 'px';
        ripple.style.width = '50px';
        ripple.style.height = '50px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Adicionar animação CSS para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    // Funcionalidade de scroll para as linguagens
    const languagesScroll = document.querySelector('.languages-scroll');
    
    if (languagesScroll) {
        let isDown = false;
        let startX;
        let scrollLeft;

        languagesScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            languagesScroll.classList.add('active');
            startX = e.pageX - languagesScroll.offsetLeft;
            scrollLeft = languagesScroll.scrollLeft;
        });

        languagesScroll.addEventListener('mouseleave', () => {
            isDown = false;
            languagesScroll.classList.remove('active');
        });

        languagesScroll.addEventListener('mouseup', () => {
            isDown = false;
            languagesScroll.classList.remove('active');
        });

        languagesScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - languagesScroll.offsetLeft;
            const walk = (x - startX) * 2;
            languagesScroll.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Funcionalidade do toggle mobile
    const mobileToggle = document.getElementById('mobile-toggle');
    const myInfo = document.getElementById('myInfo');
    
    if (mobileToggle && myInfo) {
        mobileToggle.addEventListener('click', function() {
            myInfo.classList.toggle('show');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Funcionalidade de toggle para timeline em dispositivos móveis
    function isMobile() {
        return window.innerWidth <= 480;
    }
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const timelineText = item.querySelector('.timeline-text');
        
        if (timelineText) {
            timelineText.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();
                    
                    // Se o item já está ativo, apenas fecha ele
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                        return;
                    }
                    
                    // Remove active de todos os outros items
                    timelineItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Adiciona active no item clicado
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Remove active ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            timelineItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
    
    console.log('Timeline, scroll, modo claro/escuro e toggle mobile carregados');
});

function sendContactForm() {
    var name = document.getElementById('contactName').value;
    var email = document.getElementById('contactEmail').value;
    var subject = document.getElementById('contactSubject').value;
    var message = document.getElementById('contactMessage').value;
    
    if (name === '' || email === '' || subject === '' || message === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }
    
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
    
    alert('Mensagem enviada com sucesso!');
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}













/*--------------------
Vars
--------------------*/
const deg = (a) => Math.PI / 180 * a
const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1))
const opt = {
  particles: window.width / 500 ? 1000 : 500,
  noiseScale: 0.009,
  angle: Math.PI / 180 * -90,
  h1: rand(0, 360),
  h2: rand(0, 360),
  s1: rand(20, 90),
  s2: rand(20, 90),
  l1: rand(30, 80),
  l2: rand(30, 80),
  strokeWeight: 1.2,
  tail: 82,
}
const Particles = []
let time = 0
document.body.addEventListener('click', () => {
  opt.h1 = rand(0, 360)
  opt.h2 = rand(0, 360)
  opt.s1 = rand(20, 90)
  opt.s2 = rand(20, 90)
  opt.l1 = rand(30, 80)
  opt.l2 = rand(30, 80)
  opt.angle += deg(random(60, 60)) * (Math.random() > .5 ? 1 : -1)
  
  for (let p of Particles) {
    p.randomize()
  }
})


/*--------------------
Particle
--------------------*/
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.lx = x
    this.ly = y
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.hueSemen = Math.random()
    this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
    this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
    this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
    this.maxSpeed = this.hueSemen > .5 ? 3 : 2
  }
  
  randomize() {
    this.hueSemen = Math.random()
    this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
    this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
    this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
    this.maxSpeed = this.hueSemen > .5 ? 3 : 2
  }
  
  update() {
    this.follow()
    
    this.vx += this.ax
    this.vy += this.ay
    
    var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
    var a = Math.atan2(this.vy, this.vx)
    var m = Math.min(this.maxSpeed, p)
    this.vx = Math.cos(a) * m
    this.vy = Math.sin(a) * m
    
    this.x += this.vx
    this.y += this.vy
    this.ax = 0
    this.ay = 0
    
    this.edges()
  }
  
  follow() {
    let angle = (noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + opt.angle
    
    this.ax += Math.cos(angle)
    this.ay += Math.sin(angle)
    
  }
  
  updatePrev() {
    this.lx = this.x
    this.ly = this.y
  }
  
  edges() {
    if (this.x < 0) {
      this.x = width
      this.updatePrev()
    }
    if (this.x > width) {
      this.x = 0
      this.updatePrev()
    }
    if (this.y < 0) {
      this.y = height
      this.updatePrev()
    }
    if (this.y > height) {
      this.y = 0
      this.updatePrev()
    }
  }
  
  render () {
    stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`)
    line(this.x, this.y, this.lx, this.ly)
    this.updatePrev()
  }
}


/*--------------------
Setup
--------------------*/
function setup() {
  createCanvas(windowWidth, windowHeight)
  for (let i = 0; i < opt.particles; i++) {
    Particles.push(new Particle(Math.random() * width, Math.random() * height))
  }
  strokeWeight(opt.strokeWeight)
}


/*--------------------
Draw
--------------------*/
function draw() {
  time++
  background(0, 100 - opt.tail)
  
  for (let p of Particles) {
    p.update()
    p.render()
  }
}


/*--------------------
Resize
--------------------*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
