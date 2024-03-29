from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import json


def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # for Chrome >= 109
    driver = webdriver.Chrome()

    arr = []

    for i in range(1, 127):
        driver.get("https://pushjerk.com/page/" + str(i))

        time.sleep(5)

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")

        workouts = soup.find_all("div", {"class": "inside-article"})

        for workout in workouts:
            obj = {}
            date = workout.find("h2", {"class": "entry-title"})
            content = workout.find("div", {"class": "entry-content"})

            if date is not None:
                obj["date"] = date.get_text()
            if content is not None:
                obj["content"] = content.encode_contents().decode('utf-8')

            arr.append(obj)

    with open("push-jerk-wods.json", "w") as outfile:
        json.dump(arr, outfile)
    # print(arr)

    driver.quit()


if __name__ == "__main__":
    main()
