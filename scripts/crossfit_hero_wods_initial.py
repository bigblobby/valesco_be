from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time
import json


def main():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # for Chrome >= 109

    driver = webdriver.Chrome()
    driver.get("https://www.crossfit.com/heroes/")

    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    workouts = soup.find_all("div", {"class": "_wrapper_1ijtm_18"})

    arr = []

    for workout in workouts:
        obj = {}
        title = workout.find("h3")
        line_one = workout.find("p")
        line_two = None
        line_three = None

        if line_one is not None:
            line_two = line_one.find_next_sibling("p")

            if line_two is not None:
                line_three = line_two.find_next_sibling("p")

        if title is not None:
            obj["title"] = title.get_text()
        if line_one is not None:
            obj["line_one"] = line_one.get_text()
        if line_two is not None:
            obj["line_two"] = line_two.get_text()
        if line_three is not None:
            if obj["line_two"] != "":
                obj["line_three"] = line_three.get_text()
            else:
                obj["line_three"] = ""

        arr.append(obj)

    with open("hero_wods.json", "w") as outfile:
        json.dump(arr, outfile)

    driver.quit()


if __name__ == "__main__":
    main()
