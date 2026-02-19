
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.goto("http://localhost:8000/tech.html")

        # Check if the element exists and is visible
        elem = page.locator(".encryption-stage-wrapper")
        if elem.is_visible():
            print("Desktop: Element is visible.")

            # Check if GSAP added pin-spacer (indicating pinning is active)
            # GSAP wraps pinned elements in .pin-spacer
            spacer = page.locator(".pin-spacer")
            if spacer.count() > 0:
                print("Desktop: GSAP pin-spacer found. Animation initialized.")
            else:
                print("Desktop: GSAP pin-spacer NOT found. Animation failed to initialize.")
        else:
            print("Desktop: Element is NOT visible.")

        page.screenshot(path="verification/tech_desktop_debug.png")
        browser.close()

if __name__ == "__main__":
    run()
