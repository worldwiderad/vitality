
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile Viewport
        page = browser.new_page(viewport={"width": 375, "height": 667})
        page.goto("http://localhost:8000/tech.html")

        # Check if the element exists and is visible (Should NOT be visible on mobile)
        elem = page.locator(".encryption-stage-wrapper")
        if not elem.is_visible():
            print("Mobile: Element is correctly HIDDEN.")

            # Check if GSAP pin-spacer exists (Should NOT exist on mobile)
            spacer = page.locator(".pin-spacer")
            if spacer.count() == 0:
                 print("Mobile: GSAP pin-spacer correctly NOT found.")
            else:
                 print("Mobile: GSAP pin-spacer INCORRECTLY found.")
        else:
            print("Mobile: Element is INCORRECTLY visible.")

        page.screenshot(path="verification/tech_mobile_debug.png")
        browser.close()

if __name__ == "__main__":
    run()
