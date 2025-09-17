const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const cards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalTitle = modal.querySelector('#modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalTech = modal.querySelector('.modal-tech');
const modalLink = modal.querySelector('.modal-link');
const modalClose = modal.querySelector('.modal-close');
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

const projects = {
    project1: {
        title: '旅先ガイドアプリ',
        description: '旅行者の趣味や滞在時間をもとに最適な観光プランを提案するWebアプリ。UX改善を担当し、滞在時間が20%向上。',
        tech: 'React / Firebase / Tailwind / Algolia',
        link: 'https://github.com/'
    },
    project2: {
        title: '学習管理ダッシュボード',
        description: '学習進捗を可視化するSaaS。デザインシステムを整備し、柔軟なコンポーネント構成を採用。',
        tech: 'Next.js / Supabase / Chart.js / Storybook',
        link: 'https://github.com/'
    },
    project3: {
        title: 'コミュニティプラットフォーム',
        description: 'イベント運営者向けのコミュニティツール。リアルタイム通知と権限管理で運営効率を改善。',
        tech: 'Vue / Node.js / WebSocket / Redis',
        link: 'https://github.com/'
    }
};

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href')?.slice(1);
        if (!targetId) {
            return;
        }
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
            return;
        }
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

navLinks?.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
        navLinks.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }
});

cards.forEach((card) => {
    card.querySelector('.btn')?.addEventListener('click', () => {
        const key = card.dataset.project;
        if (!key) {
            return;
        }
        const data = projects[key];
        if (!data) {
            return;
        }
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalTech.textContent = data.tech;
        modalLink.href = data.link;
        modal.setAttribute('aria-hidden', 'false');
        modal.dataset.active = key;
        document.body.style.overflow = 'hidden';
    });
});

const closeModal = () => {
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('data-active');
    document.body.style.overflow = '';
};

modalClose?.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
    }
});

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
        formMessage.textContent = '未入力の項目があります。';
        formMessage.classList.add('error');
        return;
    }

    const emailPattern = /^[\w.+\-]+@[\w\-]+\.[\w.\-]+$/;
    if (!emailPattern.test(email)) {
        formMessage.textContent = 'メールアドレスの形式を確認してください。';
        formMessage.classList.add('error');
        return;
    }

    formMessage.textContent = '送信が完了しました。追ってご連絡いたします。';
    formMessage.classList.add('success');
    contactForm.reset();
});

// 初期スクロール位置で nav を閉じる
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks?.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }
});
