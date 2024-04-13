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
    driver.get("https://www.mayhemathletes.com/daily-workout/?wpv_view_count=19739&wpv_paged=1")

    arr = []

    def start():
        def get_workouts(page):
            try:
                driver.get("https://www.mayhemathletes.com/daily-workout/?wpv_view_count=19739&wpv_paged=" + str(page))

                time.sleep(5)

                containers = driver.find_elements(By.CLASS_NAME, "wpv-block-loop-item")

                for workout in containers:
                    obj = {}
                    date = workout.find_element(By.TAG_NAME, "div")
                    video = date.find_element(By.XPATH, "following-sibling::*[1]")
                    title = video.find_element(By.XPATH, "following-sibling::*[1]")
                    content = title.find_element(By.XPATH, "following-sibling::*[1]")

                    if date is not None:
                        obj["date"] = date.text
                    if video is not None:
                        obj["video"] = video.get_attribute("innerHTML").encode('utf-8').decode('utf-8')
                    if title is not None:
                        obj["title"] = title.text
                    if content is not None:
                        obj["content"] = content.get_attribute("innerHTML").encode('utf-8').decode('utf-8')

                    arr.append(obj)
            except:
                return

        for i in range(1, 91):
            get_workouts(i)

    start()

    with open("crossfit-mayhem-daily-wods.json", "w") as outfile:
        json.dump(arr, outfile)
    # print(arr)

    driver.quit()


if __name__ == "__main__":
    main()
