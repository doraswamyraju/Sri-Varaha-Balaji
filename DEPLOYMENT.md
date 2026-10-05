# 🚀 Deployment & Maintenance Guide - Om Sri Varaha Balaji

Production deployment and server runbook for **Om Sri Varaha Balaji Family A/C Dormitory & Waiting Hall** website hosted on Hostinger VPS (`147.93.107.21`).

---

## 🌐 Production Summary

| Item | Details |
| :--- | :--- |
| **Live Domain** | [https://omvarahabalajidormitory.com](https://omvarahabalajidormitory.com) |
| **WWW Subdomain** | [https://www.omvarahabalajidormitory.com](https://www.omvarahabalajidormitory.com) |
| **Login / Staff Portal** | [https://omvarahabalajidormitory.com/login](https://omvarahabalajidormitory.com/login) |
| **Server IP** | `147.93.107.21` (Hostinger VPS) |
| **Server Web Root** | `/var/www/omvarahabalajidormitory` |
| **GitHub Repository** | `https://github.com/doraswamyraju/Sri-Varaha-Balaji.git` |
| **Assigned Port / PM2** | `5086` (`om-varaha`) |
| **Nginx Config File** | `/etc/nginx/sites-available/omvarahabalajidormitory.com` |

---

## ⚡ 1. One-Liner Quick Deploy

Whenever you make changes on your local machine and push them to GitHub (`git push origin main`), update the live server in one command:

```bash
cd /var/www/omvarahabalajidormitory && git pull origin main
```

---

## 📋 2. Step-by-Step Deployment Routine

### Step 1: Connect to VPS
```bash
ssh root@147.93.107.21
```

### Step 2: Navigate to Directory & Pull Updates
```bash
cd /var/www/omvarahabalajidormitory
git pull origin main
```

### Step 3: Verify File Permissions
Ensure Nginx / PM2 can read all static files:
```bash
chmod -R 755 /var/www/omvarahabalajidormitory
```

### Step 4: Restart PM2 Service (If using PM2 port 5086)
```bash
pm2 restart om-varaha
pm2 save
```

### Step 5: Verify Live Status
```bash
curl -I https://omvarahabalajidormitory.com
curl -I https://omvarahabalajidormitory.com/login
```

---

## 🛡️ 3. How to Avoid Common Deployment Issues

### Issue 1: `error: Your local changes to the following files would be overwritten by merge`
**Cause:** Someone manually edited files on the VPS server directly instead of git workflow.  
**Fix:**
```bash
cd /var/www/omvarahabalajidormitory
git stash
git pull origin main
```

---

### Issue 2: `404 Not Found` or Nginx Misconfiguration
**Cause:** Nginx `root` or `try_files` missing in the SSL block.  
**Fix:** Ensure `/etc/nginx/sites-available/omvarahabalajidormitory.com` has this structure:

```nginx
server {
    server_name omvarahabalajidormitory.com www.omvarahabalajidormitory.com;
    root /var/www/omvarahabalajidormitory;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/omvarahabalajidormitory.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/omvarahabalajidormitory.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.omvarahabalajidormitory.com) {
        return 301 https://$host$request_uri;
    }
    if ($host = omvarahabalajidormitory.com) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name omvarahabalajidormitory.com www.omvarahabalajidormitory.com;
    return 404;
}
```

Always test before reloading:
```bash
nginx -t && systemctl reload nginx
```

---

### Issue 3: Duplicate Port Binding / Port Collisions
**Cause:** Nginx trying to `listen 5086;` while PM2 is already listening on `5086`.  
**Rule:** Nginx should only listen on `80` and `443` (HTTP/HTTPS). Local ports (like `5086`) belong exclusively to backend apps/PM2.

---

### Issue 4: Browser Showing Stale / Old Cached Content
**Cause:** Browser caching CSS/JS files locally.  
**Fix:**
- Hard refresh in browser: `Cmd + Shift + R` (Mac) or `Ctrl + F5` (Windows).
- If updating CSS/JS drastically, increment the version query param in `index.html`:
  ```html
  <link rel="stylesheet" href="styles.css?v=1.1">
  <script src="pricing-data.js?v=1.1"></script>
  ```

---

### Issue 5: SSL Certificate Renewal
Certbot automatically renews SSL certificates. To verify renewal works without errors:
```bash
certbot renew --dry-run
```

---

## 🔒 4. Staff / Admin Login Access

- **Public Website:** `https://omvarahabalajidormitory.com`
- **Login Portal:** `https://omvarahabalajidormitory.com/login` (or `/login/` / `login.html`)
- **Default PIN Passcode:** `1234`
- Changes saved in the admin portal automatically update frontend tariff rates and festive alert banners in real-time via `localStorage`.
