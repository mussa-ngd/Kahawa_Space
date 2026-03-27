// Sample orders data for seller
let orders = [
    {
        id: 'KAH-24015',
        date: '2026-03-15',
        status: 'pending',
        total: 2975,
        buyer: {
            name: 'Blue Bottle Coffee',
            email: 'orders@bluebottle.com',
            company: 'Blue Bottle Coffee Roasters',
            address: '123 Main St, Oakland, CA 94607, USA'
        },
        items: [
            {
                name: 'Tanzania Peaberry AA Reserve',
                origin: 'Tanzania',
                quantity: 350,
                unitPrice: 8.50,
                total: 2975,
                image: 'coffee-bean'
            }
        ],
        shipping: null,
        notes: 'Please ensure quality certificate included'
    },
    {
        id: 'KAH-24018',
        date: '2026-03-12',
        status: 'confirmed',
        total: 1840,
        buyer: {
            name: 'Intelligentsia Coffee',
            email: 'purchasing@intelligentsia.com',
            company: 'Intelligentsia Coffee',
            address: '53 W Jackson Blvd, Chicago, IL 60604, USA'
        },
        items: [
            {
                name: 'Ethiopia Yirgacheffe Natural G1',
                origin: 'Ethiopia',
                quantity: 200,
                unitPrice: 9.20,
                total: 1840,
                image: 'coffee-bean'
            }
        ],
        shipping: {
            carrier: 'DHL Express',
            number: 'DH123456789TZ'
        },
        notes: null
    },
    {
        id: 'KAH-24022',
        date: '2026-03-10',
        status: 'shipped',
        total: 2550,
        buyer: {
            name: 'Stumptown Coffee',
            email: 'orders@stumptown.com',
            company: 'Stumptown Coffee Roasters',
            address: '100 SE Salmon St, Portland, OR 97214, USA'
        },
        items: [
            {
                name: 'Kenya AA SL28 & SL34',
                origin: 'Kenya',
                quantity: 250,
                unitPrice: 10.20,
                total: 2550,
                image: 'coffee-bean'
            }
        ],
        shipping: {
            carrier: 'FedEx',
            number: 'FX987654321TZ',
            trackingUrl: 'https://www.fedex.com/tracking'
        },
        notes: 'Expedited shipping requested'
    },
    {
        id: 'KAH-24025',
        date: '2026-03-05',
        status: 'delivered',
        total: 4750,
        buyer: {
            name: 'La Colombe Coffee',
            email: 'buying@lacolombe.com',
            company: 'La Colombe Coffee Roasters',
            address: '1335 Frankford Ave, Philadelphia, PA 19125, USA'
        },
        items: [
            {
                name: 'Tanzania Peaberry AA Reserve',
                origin: 'Tanzania',
                quantity: 500,
                unitPrice: 9.50,
                total: 4750,
                image: 'coffee-bean'
            }
        ],
        shipping: {
            carrier: 'UPS',
            number: '1Z9999999999999999'
        },
        notes: 'Delivered on 2026-03-18'
    },
    {
        id: 'KAH-24028',
        date: '2026-03-01',
        status: 'cancelled',
        total: 920,
        buyer: {
            name: 'Coffee Collective',
            email: 'orders@coffeecollective.dk',
            company: 'Coffee Collective',
            address: 'Godthåbsvej 34B, 2000 Frederiksberg, Denmark'
        },
        items: [
            {
                name: 'Brazil Yellow Bourbon',
                origin: 'Brazil',
                quantity: 100,
                unitPrice: 9.20,
                total: 920,
                image: 'coffee-bean'
            }
        ],
        shipping: null,
        notes: 'Cancelled by buyer'
    }
];

let currentStatusFilter = 'all';
let currentDateFilter = 'all';
let currentSearch = '';
let currentOrderId = null;

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#d32f2f' : '#ff9800'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 3000;
        animation: fadeInUp 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Update statistics
function updateStats() {
    const pending = orders.filter(o => o.status === 'pending').length;
    const confirmed = orders.filter(o => o.status === 'confirmed').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0);

    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('confirmedCount').textContent = confirmed;
    document.getElementById('shippedCount').textContent = shipped;
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toLocaleString()}`;
}

// Filter orders
function filterOrders() {
    currentStatusFilter = document.getElementById('statusFilter').value;
    currentDateFilter = document.getElementById('dateFilter').value;
    currentSearch = document.getElementById('searchInput').value;
    renderOrders();
}

// Render orders
function renderOrders() {
    let filteredOrders = orders.filter(order => {
        // Filter by status
        if (currentStatusFilter !== 'all' && order.status !== currentStatusFilter) return false;
        // Filter by date
        if (currentDateFilter !== 'all') {
            const orderDate = new Date(order.date);
            const daysAgo = (new Date() - orderDate) / (1000 * 60 * 60 * 24);
            if (daysAgo > parseInt(currentDateFilter)) return false;
        }
        // Filter by search
        if (currentSearch && !order.id.toLowerCase().includes(currentSearch.toLowerCase()) &&
            !order.buyer.name.toLowerCase().includes(currentSearch.toLowerCase())) {
            return false;
        }
        return true;
    });

    updateStats();

    const container = document.getElementById('ordersList');

    if (filteredOrders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No Orders Found</h3>
                <p style="color: var(--gray); margin-bottom: 1rem;">You haven't received any orders yet.</p>
                <a href="listings.html" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 0.75rem 1.5rem;">Manage Listings</a>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-info">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${formatDate(order.date)}</span>
                    <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    ${order.status === 'pending' ? '<span class="badge badge-new"><i class="fas fa-clock"></i> New</span>' : ''}
                </div>
                <div class="order-total">
                    Total: $${order.total.toLocaleString()}
                </div>
            </div>
            <div class="order-body">
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="item-image">
                                <i class="fas fa-${item.image}"></i>
                            </div>
                            <div class="item-details">
                                <div class="item-name">${item.name}</div>
                                <div class="item-meta">${item.origin} • ${item.quantity} kg @ $${item.unitPrice}/kg</div>
                            </div>
                            <div class="item-price">$${item.total.toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <div class="buyer-info">
                        <i class="fas fa-user"></i>
                        <div>
                            <strong>${order.buyer.name}</strong><br>
                            <small>${order.buyer.email}</small>
                        </div>
                    </div>
                    <div class="order-actions">
                        ${order.status === 'pending' ? `
                            <button class="btn-primary" onclick="openStatusModal('${order.id}', 'confirm')">
                                <i class="fas fa-check"></i> Confirm Order
                            </button>
                            <button class="btn-outline" onclick="declineOrder('${order.id}')">
                                <i class="fas fa-times"></i> Decline
                            </button>
                        ` : ''}
                        ${order.status === 'confirmed' ? `
                            <button class="btn-primary" onclick="openStatusModal('${order.id}', 'ship')">
                                <i class="fas fa-truck"></i> Mark as Shipped
                            </button>
                        ` : ''}
                        ${order.status === 'shipped' ? `
                            <button class="btn-outline" onclick="viewTracking('${order.id}')">
                                <i class="fas fa-map-marker-alt"></i> Track
                            </button>
                        ` : ''}
                        <button class="btn-outline" onclick="viewOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Open status modal
function openStatusModal(orderId, action) {
    currentOrderId = orderId;
    const order = orders.find(o => o.id === orderId);
    const modal = document.getElementById('statusModal');
    const statusSelect = document.getElementById('newStatus');

    if (action === 'confirm') {
        statusSelect.value = 'confirmed';
    } else if (action === 'ship') {
        statusSelect.value = 'shipped';
    }

    document.getElementById('trackingNumber').value = order?.shipping?.number || '';
    document.getElementById('carrier').value = order?.shipping?.carrier || '';
    document.getElementById('statusNotes').value = '';

    modal.classList.add('active');
}

// Close status modal
function closeStatusModal() {
    document.getElementById('statusModal').classList.remove('active');
    currentOrderId = null;
}

// Update order status
function updateOrderStatus() {
    if (!currentOrderId) return;

    const order = orders.find(o => o.id === currentOrderId);
    const newStatus = document.getElementById('newStatus').value;
    const trackingNumber = document.getElementById('trackingNumber').value;
    const carrier = document.getElementById('carrier').value;
    const notes = document.getElementById('statusNotes').value;

    if (order) {
        order.status = newStatus;

        if (newStatus === 'shipped' && trackingNumber) {
            order.shipping = {
                carrier: carrier,
                number: trackingNumber
            };
        }

        if (notes) {
            order.notes = notes;
        }

        showNotification(`Order ${currentOrderId} status updated to ${newStatus}!`, 'success');
        closeStatusModal();
        renderOrders();
    }
}

// Decline order
function declineOrder(orderId) {
    if (confirm('Are you sure you want to decline this order? This action cannot be undone.')) {
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'cancelled';
            showNotification(`Order ${orderId} has been declined.`, 'info');
            renderOrders();
        }
    }
}

// View tracking
function viewTracking(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order && order.shipping) {
        const modal = document.getElementById('trackingModal');
        const content = document.getElementById('trackingContent');

        content.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <p><strong>Order #${order.id}</strong></p>
                <p><strong>Carrier:</strong> ${order.shipping.carrier}</p>
                <p><strong>Tracking Number:</strong> ${order.shipping.number}</p>
                <p><strong>Buyer:</strong> ${order.buyer.name}</p>
            </div>
            <div class="tracking-timeline">
                <div class="tracking-step completed">
                    <div class="step-title">Order Confirmed</div>
                    <div class="step-date">${formatDate(order.date)}</div>
                </div>
                <div class="tracking-step completed">
                    <div class="step-title">Shipped</div>
                    <div class="step-date">${order.shipping.shippedDate || formatDate(order.date)}</div>
                </div>
                <div class="tracking-step">
                    <div class="step-title">In Transit</div>
                    <div class="step-date">Estimated arrival: ${getEstimatedDelivery(order.date)}</div>
                </div>
            </div>
        `;
        modal.classList.add('active');
    }
}

// Get estimated delivery
function getEstimatedDelivery(orderDate) {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Close tracking modal
function closeTrackingModal() {
    document.getElementById('trackingModal').classList.remove('active');
}

// View order details
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        alert(`Order #${order.id}\nDate: ${formatDate(order.date)}\nStatus: ${order.status}\nBuyer: ${order.buyer.name}\nEmail: ${order.buyer.email}\nTotal: $${order.total}\n${order.notes ? `Notes: ${order.notes}` : ''}`);
    }
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Close modals on outside click
window.onclick = function (event) {
    const statusModal = document.getElementById('statusModal');
    const trackingModal = document.getElementById('trackingModal');
    if (event.target === statusModal) closeStatusModal();
    if (event.target === trackingModal) closeTrackingModal();
}

// Add filter event listeners
document.getElementById('statusFilter').addEventListener('change', filterOrders);
document.getElementById('dateFilter').addEventListener('change', filterOrders);
document.getElementById('searchInput').addEventListener('keyup', filterOrders);

// Initial render
renderOrders();