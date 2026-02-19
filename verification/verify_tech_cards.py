from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Navigate to tech.html on the local server
        page.goto("http://localhost:8000/tech.html")

        # Wait for the paper-grid to be visible
        locator = page.locator(".paper-grid")
        locator.wait_for()

        # Take a screenshot of the specific element
        locator.screenshot(path="verification/tech_cards.png")

        browser.close()

if __name__ == "__main__":
    run()
