# SnapMarket
SnapMarket is a cutting-edge web application designed to streamline product identification and comparison using advanced AI and web technologies.

SnapMarket revolutionizes how users interact with product information within videos. By leveraging computer vision capabilities, SnapMarket extracts screenshots from videos, then employs state-of-the-art AI models to generate descriptive captions for identified products. These captions are then utilized to search for similar products through external APIs, providing users with comprehensive product comparisons directly from video content.
![](header.png)


## Usage example

#### Home Improvement Videos
Imagine you are watching a home improvement video on YouTube and you want to find the exact or similar power drill the presenter is using. SnapMarket makes this easy:

#### Capture Screenshot:
While watching the video, users can capture a screenshot of the moment when the power drill is visible.
#### Generate Description:
Using the Google Cloud Vision API, SnapMarket generates a detailed description of the power drill from the screenshot.
#### Search Products:
SnapMarket uses this description to search for similar power drills online through the SerpApi.
#### Compare Products:
Results are displayed, allowing you to compare prices, brands, and reviews all within the SnapMarket interface.

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
make install
npm test
```

# Frontend Dependencies
Make sure Node.js and npm are installed. You can download and install them from [nodejs.org](https://nodejs.org/).

Install the required npm packages using the following commands:

```bash
npm install html2canvas

npm install axios

npm install express

```
# Installing Backend Dependencies

If not installed, the first step is to install pip to manage python packages

```sh
#for windows
py -m install pip
#for mac
python install pip

```

Create a seperate environment, in our case, we created a .conda environment within VSCode using ">Python: Create Environment"

Install the required Python packages using the following commands:

```sh
pip install django

pip install djangorestframework

pip install django-cors-headers

pip install pillow

pip install google-cloud-vision

pip install serpapi

pip install google-search-results

pip install python-dotenv

```
# Run the servers:
Must be seperate terminals
```
Frontend:
cd myfrontend
npm start
-------------------------
Backend:
cd tiktokjam
python manage.py runserver
```
### Google Vision API Help
This is a small tutorial regarding how to use the API key with the Google Vision API.
* Visit [console.cloud.google.com](https://console.cloud.google.com/welcome/ )
* Create a new project by selecting "Select a project".
* Ensure your project is selected before developing.
* At the search bar type in "Cloud Vision API" and click "Enable".
* From the Navigation Menu:
  * Hover over the "APIs & Services" tab.
  * Click on "Credentials.
  * Click "+ Create Credentials".
  * From that dropdown menu, select "Service account".
  * Fill out the service account details.
  * In step 2, in "Select a role" select the role "Vision AI Application Editor".
* After setting up the service account, click on the account and go to the "Keys" tab
  * Create new key
  * select JSON type
* From here the json will be downloaded into your personal device. If the json is lost, a new API key will have to be created.  However, in order to utilize this, please follow these steps:
  * Make sure the json file is inside of the backend folder(tiktokjam/mytiktok) 
  * Ensure the json file is named "snap-market-428419-cf3dcb6ba810.json". Do not share the json file publically.

### SerpApi Help
* Create a .env file inside of the backend folder(tiktokjam/mytiktok)
* Go to [serpapi.com](https://serpapi.com/)
* Register an account if you don't have one already and fill out the necessary information (You must verify phone number and email)
* Select the plan you want (We used the free plan)
* Once account has been created go to the dashboard and you API key will be there ready to copy and paste
* Go back to your .env file and save your API into a variable called "SERPAPI"

## About Us

CodeCrafters – codercrafter2024@gmail.com

[https://github.com/ascarola17/TikTokJam](https://github.com/ascarola17/TikTokJam)



<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
