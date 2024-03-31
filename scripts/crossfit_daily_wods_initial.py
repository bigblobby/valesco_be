from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
import time
import json



def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # for Chrome >= 109
    driver = webdriver.Chrome()
    driver.get("https://www.crossfit.com/181230")

    arr = []

    def get_workout():
        obj = {}
        time.sleep(4)

        get_url = driver.current_url
        pathname = str(get_url).split("/")[-1]

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")

        workout = soup.find("article").find("div")

        obj["date"] = pathname
        obj["content"] = workout.encode_contents().decode('utf-8')

        arr.append(obj)

        try:
            # btn = driver.find_element(By.CSS_SELECTOR, 'a[aria-label="Go to previous day"]')
            btn = driver.find_element(By.CLASS_NAME, '_link_14hc3_21')
            btn.click()
            get_workout()
        except:
            return

    get_workout()

    with open("crossfit-daily-wods.json", "w") as outfile:
        json.dump(arr, outfile)
    # print(arr)

    driver.quit()


if __name__ == "__main__":
    main()
