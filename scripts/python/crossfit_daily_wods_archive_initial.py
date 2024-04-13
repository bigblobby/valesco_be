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

    years = [
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
    ]


    def get_workouts_for_year(year):
        driver.get("https://www.crossfit.com/workout/" + year)
        arr = []

        def scroll():
            SCROLL_PAUSE_TIME = 2

            # Get scroll height
            last_height = driver.execute_script("return document.body.scrollHeight")

            while True:
                # Scroll down to bottom
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

                # Wait to load page
                time.sleep(SCROLL_PAUSE_TIME)

                # Calculate new scroll height and compare with last scroll height
                new_height = driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height

        scroll()

        def get_workouts():
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")
            containers = soup.find_all("div", {"class": "content-container"})

            for workout in containers:
                obj = {}
                title = workout.find("h3")
                content = workout.find("div", {"class": "row"}).find("div", {"class": "col-sm-6"})

                if title is not None:
                    obj["title"] = title.get_text()
                if content is not None:
                    obj["content"] = content.encode_contents().decode('utf-8')

                arr.append(obj)

        get_workouts()

        with open("crossfit-daily-wods-archive-" + year + ".json", "w") as outfile:
            json.dump(arr, outfile)

    for year in years:
        get_workouts_for_year(year)

    driver.quit()


if __name__ == "__main__":
    main()
