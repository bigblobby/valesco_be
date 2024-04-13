from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta
import json


def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # for Chrome >= 109
    driver = webdriver.Chrome()

    arr = []

    def start():
        def get_workout(days):
            try:
                obj = {}
                d = datetime.today() - timedelta(days=days)
                path = f"{d:%m}" + "-" + f"{d:%d}" + "-" + f"{d:%Y}" + "-monster-mash"
                driver.get("https://crossfitlinchpin.com/blogs/monster-mash/" + str(path))

                WebDriverWait(driver, 2).until(
                    EC.presence_of_element_located((By.TAG_NAME, "h1"))
                )

                WebDriverWait(driver, 2).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "rte--indented-images"))
                )

                title = driver.find_element(By.TAG_NAME, "h1")
                content = driver.find_element(By.CLASS_NAME, "rte--indented-images")

                if title is not None:
                    obj["title"] = title.text
                if content is not None:
                    obj["content"] = content.get_attribute("innerHTML").encode('utf-8').decode('utf-8')

                arr.append(obj)
            except:
                return

        for i in range(700, 4000):
            get_workout(i)
            print(i + 1)

    start()

    with open("crossfit-linchpin-monster-mash-wods-2.json", "w") as outfile:
        json.dump(arr, outfile)

    driver.quit()


if __name__ == "__main__":
    main()
