// تحسين توافقية التطبيق - يتم إضافة هذا الملف بعد الملف الرئيسي

class AppCompatibilityHandler {
    constructor() {
        this.deviceSupport = {
            notifications: 'Notification' in window,
            serviceWorker: 'serviceWorker' in navigator,
            geolocation: 'geolocation' in navigator
        };
        
        this.initializeErrorHandling();
        this.initializeConnectivityHandling();
        this.setupServiceWorker();
    }

    // تهيئة معالجة الأخطاء
    initializeErrorHandling() {
        window.onerror = (msg, url, line, col, error) => {
            console.error('خطأ:', {msg, url, line, col, error});
            this.showToast('حدث خطأ غير متوقع', 'error');
            return false;
        };

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Promise rejection:', event.reason);
            this.showToast('حدث خطأ في معالجة البيانات', 'error');
        });
    }

    // تهيئة معالجة الاتصال بالإنترنت
    initializeConnectivityHandling() {
        window.addEventListener('offline', () => {
            this.showOfflinePage();
        });

        window.addEventListener('online', () => {
            this.hideOfflinePage();
            this.reloadApp();
        });
    }

    // إعداد Service Worker
    async setupServiceWorker() {
        if (this.deviceSupport.serviceWorker) {
            try {
                const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js', {
                    scope: './'
                });
                console.log('Service Worker تم التسجيل بنجاح:', registration);
                this.initializeFirebase();
            } catch (error) {
                console.error('فشل تسجيل Service Worker:', error);
            }
        }
    }

    // تهيئة Firebase
    async initializeFirebase() {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
                const messaging = firebase.messaging();
                await this.setupNotifications(messaging);
            }
        } catch (error) {
            console.error("خطأ في تهيئة Firebase:", error);
            this.showToast('حدث خطأ في تهيئة التطبيق', 'error');
        }
    }

    // إعداد الإشعارات
    async setupNotifications(messaging) {
        if (this.deviceSupport.notifications) {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const token = await messaging.getToken({
                        vapidKey: 'BI9cpoewcZa1ftyZ_bGjO0GYa4_cT0HNja4YFd6FwLwHg5c0gQ5iSj_MJZRhMxKdgJ0-d-_rEXcpSQ_cx7GqCSc'
                    });
                    await this.saveTokenToDatabase(token);
                }
            } catch (error) {
                console.error('خطأ في إعداد الإشعارات:', error);
            }
        }
    }

    // حفظ التوكن في قاعدة البيانات
    async saveTokenToDatabase(token) {
        try {
            const userId = localStorage.getItem('userId') || 'anonymous';
            await firebase.database().ref(`fcm_tokens/${userId}`).set({
                token: token,
                lastUpdated: firebase.database.ServerValue.TIMESTAMP,
                device: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform
                }
            });
        } catch (error) {
            console.error('خطأ في حفظ التوكن:', error);
        }
    }

    // عرض صفحة عدم الاتصال
    showOfflinePage() {
        const offlinePage = document.createElement('div');
        offlinePage.id = 'offlinePage';
        offlinePage.innerHTML = `
            <div class="offline-container">
                <i class="fas fa-wifi-slash"></i>
                <h2>لا يوجد اتصال بالإنترنت</h2>
                <p>يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى</p>
                <button onclick="window.location.reload()">إعادة المحاولة</button>
            </div>
        `;
        document.body.appendChild(offlinePage);
    }

    // إخفاء صفحة عدم الاتصال
    hideOfflinePage() {
        const offlinePage = document.getElementById('offlinePage');
        if (offlinePage) {
            offlinePage.remove();
        }
    }

    // إعادة تحميل التطبيق
    reloadApp() {
        window.location.reload();
    }

    // عرض رسالة للمستخدم
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `notification-toast animate__animated animate__fadeInRight ${type}`;
        toast.innerHTML = `
            <div class="notification-content">
                <div class="notification-title">${type === 'error' ? 'خطأ' : 'تنبيه'}</div>
                <div class="notification-body">${message}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.replace('animate__fadeInRight', 'animate__fadeOutRight');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // فحص دعم الجهاز
    checkDeviceSupport() {
        if (!this.deviceSupport.notifications) {
            this.showToast('جهازك لا يدعم الإشعارات', 'warning');
        }
        if (!this.deviceSupport.serviceWorker) {
            this.showToast('جهازك لا يدعم بعض الميزات', 'warning');
        }
        if (!this.deviceSupport.geolocation) {
            this.showToast('جهازك لا يدعم تحديد الموقع', 'warning');
        }
    }

    // إضافة polyfills
    addPolyfills() {
        if (!window.Promise) {
            window.Promise = Promise;
        }
    }

    // تحميل الموارد الأساسية
    async loadEssentialResources() {
        try {
            await this.initializeFirebase();
            if (typeof loadDrivers === 'function') {
                await loadDrivers();
            }
        } catch (error) {
            console.error('Error loading resources:', error);
            this.showToast('حدث خطأ في تحميل الموارد', 'error');
        }
    }
}

// تهيئة معالج التوافقية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const compatibilityHandler = new AppCompatibilityHandler();
    compatibilityHandler.checkDeviceSupport();
    compatibilityHandler.addPolyfills();
    compatibilityHandler.loadEssentialResources();
});

// إضافة نمط CSS لصفحة عدم الاتصال
const style = document.createElement('style');
style.textContent = `
    #offlinePage {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    .offline-container {
        text-align: center;
        color: white;
        padding: 2rem;
    }

    .offline-container i {
        font-size: 4rem;
        color: #FFD700;
        margin-bottom: 1rem;
    }

    .offline-container button {
        background: #FFD700;
        border: none;
        padding: 0.5rem 2rem;
        border-radius: 20px;
        color: black;
        margin-top: 1rem;
        cursor: pointer;
    }

    .offline-container button:hover {
        background: #ccac00;
    }
`;
document.head.appendChild(style);