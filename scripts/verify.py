"""Tecrübe sitesi tarayıcı doğrulaması: npm start çalışırken `python scripts/verify.py`.

Ekran görüntülerini screenshots/ altına yazar; menü, sekmeler, form, SSS ve
yönetim paneli akışlarını gerçek tarayıcıda dener.
"""
import json
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE_URL", "http://localhost:4173")
ADMIN = os.environ.get("ADMIN_PASSWORD", "tecrube-demo")
OUT = Path("screenshots")
OUT.mkdir(exist_ok=True)
results, errors = [], []


def check(cond, label):
    results.append(("PASS" if cond else "FAIL") + " " + label)


with sync_playwright() as p:
    browser = p.chromium.launch()
    for width, height in [(1440, 900), (390, 844)]:
        tag = "masaustu" if width > 600 else "mobil"
        page = browser.new_page(viewport={"width": width, "height": height}, reduced_motion="reduce")
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" and "maps" not in m.text.lower() else None)
        for path in ["/", "/yks", "/lgs", "/on-kayit", "/kvkk"]:
            res = page.goto(BASE + path, wait_until="networkidle")
            page.evaluate("document.fonts.ready")
            check(res.status == 200, f"{tag} {path} 200")
            check(page.locator("h1").count() == 1, f"{tag} {path} tek h1")
            overflow = page.evaluate("document.documentElement.scrollWidth > innerWidth")
            check(not overflow, f"{tag} {path} yatay taşma yok")
            clipped = page.evaluate("""[...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 && !e.closest('.tl-track')).length""")
            check(clipped == 0, f"{tag} {path} kesilen öğe yok ({clipped})")
            name = "ana-sayfa" if path == "/" else path.strip("/")
            page.screenshot(path=str(OUT / f"{name}-{tag}.png"), full_page=True)
            if path == "/":
                page.screenshot(path=str(OUT / f"ilk-ekran-{tag}.png"))

        page.goto(BASE + "/", wait_until="networkidle")
        # Hızlı seçim: sekme, çizelge ve form aynı programa geçer
        page.locator('[data-set-program="yks"]').click()
        check(page.locator("#tab-yks").get_attribute("aria-selected") == "true"
              and page.locator("#f-program").input_value() == "YKS - 12. sınıf"
              and page.locator(".timeline").get_attribute("data-active") == "yks", f"{tag} hızlı seçim senkron")
        page.select_option("#f-program", "LGS - 6. sınıf")
        check(page.locator("#tab-lgs").get_attribute("aria-selected") == "true"
              and page.locator('[data-set-program="lgs"]').get_attribute("aria-pressed") == "true", f"{tag} form seçimi senkron")
        page.screenshot(path=str(OUT / f"hizli-secim-{tag}.png"))
        # Sekmeler
        page.locator("#tab-mezun").click()
        check(page.locator("#panel-mezun").is_visible() and not page.locator("#panel-lgs").is_visible(), f"{tag} program sekmesi")
        page.locator('#panel-mezun a[data-program]').click()
        check(page.locator("#f-program").input_value() == "YKS - Mezun", f"{tag} sekmeden form ön seçimi")
        # SSS
        page.locator("#sss details").first.locator("summary").click()
        check(page.locator("#sss details").first.evaluate("el => el.open"), f"{tag} SSS açılır")
        # Mobil menü
        if width < 961:
            page.locator(".menu-button").click()
            check(page.locator("#mobile-menu").is_visible(), f"{tag} menü açılır")
            page.screenshot(path=str(OUT / f"menu-{tag}.png"))
            page.keyboard.press("Escape")
            check(not page.locator("#mobile-menu").is_visible(), f"{tag} menü Esc ile kapanır")
        # Form doğrulama ve gönderim
        page.goto(BASE + "/on-kayit", wait_until="networkidle")
        page.locator("[data-enroll-form] button[type=submit]").click()
        check(page.locator("#f-ad-error").is_visible(), f"{tag} boş form hata verir")
        page.screenshot(path=str(OUT / f"form-hata-{tag}.png"))
        page.fill("#f-ad", "Test Veli " + tag)
        page.fill("#f-telefon", "0555 111 22 33")
        page.select_option("#f-program", "LGS - 8. sınıf")
        page.check("#f-kvkk")
        page.locator("[data-enroll-form] button[type=submit]").click()
        page.wait_for_selector(".form-success:not([hidden])")
        check(True, f"{tag} form gönderilir")
        page.screenshot(path=str(OUT / f"form-basarili-{tag}.png"))
        # Kırık iç bağlantı
        page.goto(BASE + "/", wait_until="networkidle")
        broken = page.evaluate("""[...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash && !document.getElementById(a.hash.slice(1))).map(a => a.hash)""")
        check(broken == [], f"{tag} iç bağlantılar {broken}")
        page.close()

    # Yönetim paneli
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto(BASE + "/yonetim", wait_until="networkidle")
    page.fill("#password", "yanlis")
    page.locator("#login-form button").click()
    page.wait_for_selector("#login-error:not([hidden])")
    check(True, "yönetim yanlış şifre reddedilir")
    page.fill("#password", ADMIN)
    page.locator("#login-form button").click()
    page.wait_for_selector("[data-view=dash]:not([hidden])")
    rows = page.locator("#rows tr").count()
    check(rows >= 2, f"yönetim başvuruları listeler ({rows})")
    page.locator("#rows tr").first.locator("select").select_option("arandi")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT / "yonetim-masaustu.png"), full_page=True)
    check(page.locator('[data-count="arandi"]').inner_text() != "0", "yönetim durum günceller")
    browser.close()

check(not errors, f"konsol hatası yok {errors[:3]}")
print("\n".join(results))
sys.exit(0 if all(r.startswith("PASS") for r in results) else 1)
