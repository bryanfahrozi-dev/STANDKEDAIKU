let cart = [];

function formatRp(number){
    return 'Rp ' + Number(number).toLocaleString();
}

function updateCart(){
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    const total = cart.reduce((s, i) => s + Number(i.price), 0);
    if(countEl) countEl.textContent = cart.length;

    if(!itemsEl) return;
    if(cart.length === 0){
        itemsEl.innerHTML = '<p class="empty">Keranjang kosong</p>';
        totalEl.textContent = formatRp(0);
        return;
    }

    itemsEl.innerHTML = '';
    cart.forEach((item, idx) =>{
        const row = document.createElement('div');
        row.className = 'item';
        row.innerHTML = `<div class="name">${item.name}</div><div class="price">${formatRp(item.price)}</div>`;
        itemsEl.appendChild(row);
    });
    totalEl.textContent = formatRp(total);
}

function toggleCart(){
    const panel = document.getElementById('cart-panel');
    if(!panel) return;
    const open = panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', (!open).toString());
}

function addToCart(name, price){
    cart.push({ name, price });

    const cartIcon = document.querySelector('.cart-icon');
    if(cartIcon){
        cartIcon.classList.add('animate-pop');
        setTimeout(()=>cartIcon.classList.remove('animate-pop'), 220);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `position: fixed; bottom: 22px; right: 22px; background: linear-gradient(135deg,#a855f7,#6b21a8); color:#fff; padding:10px 14px; border-radius:10px; z-index:4000; box-shadow:0 6px 20px rgba(0,0,0,0.3);`;
    toast.innerText = `✅ ${name} masuk keranjang`;
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 1800);

    updateCart();
}

function sendWhatsApp(){
    if(cart.length === 0){
        alert('Pilih menu dulu kak 😊');
        return;
    }
    // Nomor: isi nomor Anda di sini. Boleh pakai format lokal (08...) atau internasional (628...)
    let phoneNumber = '085733742737'; // Ganti dengan nomor Anda

    // Normalisasi nomor: jika mulai dengan 0 -> ganti dengan 62 (Indonesia)
    function normalizePhone(p){
        p = p.replace(/[^0-9]/g, '');
        if(p.startsWith('0')) return '62' + p.slice(1);
        return p;
    }

    const total = cart.reduce((s, i) => s + Number(i.price), 0);

    let message = '*PESANAN BARU - KEDAIKU*\n';
    message += '----------------------------\n';
    cart.forEach(item => {
        message += `✅ ${item.name} (Rp ${Number(item.price).toLocaleString()})\n`;
    });
    message += '----------------------------\n';
    message += `*Total: Rp ${total.toLocaleString()}*\n\n`;
    message += 'Mohon segera diproses ya kak! 🙏';

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${normalizePhone(phoneNumber)}?text=${encoded}`;
    window.open(url, '_blank');
}

// Inisialisasi hitung awal
document.addEventListener('DOMContentLoaded', ()=> updateCart());