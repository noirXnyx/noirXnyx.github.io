---
layout: page
title: Simple Weather Prediction Using Python and SQLite
description: Language - Python, Database - SQLite
# img: # assets/img/7.jpg
# redirect: link here
importance: 3
category: school projects
---

In this project, I walk you through how I built a simple weather prediction model using Python and used SQLite to store and manage the data. This was one of my early projects during my bachelor's degree.

<span style='color: black; font-weight: bold;'>This project involves:</span>
- Collecting historical weather data using GET API request.
- Storing and managing it with SQLite, a lightweight relational database. 
- Building a prediction model using Python.

<br><span style='color: black; font-weight: bold;'>Expected outputs:</span><br>
- A database named weather_data with the necessary columns.
<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/3_project_db.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div><br>

- Prediction results as specified in the task: Mean Temperature (Fahrenheit), Maximum Wind Speed (mph), Sum Precipitation (inches), and all other weather data added to the database.
<div class="row justify-content-sm-center">
    <div class="col-sm-11 mt-2 mt-md-0">
        {% include figure.liquid path="assets/img/3_project_predictionresults.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div><br>

- Database showing records are inserted.
<div class="row justify-content-sm-center">
    <div class="col-sm-11 mt-2 mt-md-0">
        {% include figure.liquid path="assets/img/3_project_db_result1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row justify-content-sm-center">
    <div class="col-sm-11 mt-2 mt-md-0">
        {% include figure.liquid path="assets/img/3_project_db_result2.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div><br>

- Test results after running the created three tests (test.py).
<div class="row justify-content-sm-center">
    <div class="col-sm-11 mt-2 mt-md-0">
        {% include figure.liquid path="assets/img/3_project_db_testresults.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div><br>


<br><span style='color: black; font-weight: bold;'> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </span><br>
<br>
<span style='color: black; font-weight: bold;'> Processes</span><br>
The project is structured into four distinct components: database.py, main.py, test.py, and weather_data.py. The .py extension signifies that each file is written in Python, 
which served as the primary programming language for this project. Additionally, it was a requirement to ensure that only these four components were developed. 
Click each item below to access the complete HTML-rendered version of each file.
- <a href="{{ '/assets/html/3_project_weather_data.py.html' | relative_url }}" target="_blank">Part 1: weather_data.py</a>
- <a href="{{ '/assets/html/3_project_database.py.html' | relative_url }}" target="_blank">Part 2: database.py</a>
- <a href="{{ '/assets/html/3_project_main.py.html' | relative_url }}" target="_blank">Part 3: main.py</a>
- <a href="{{ '/assets/html/3_project_test.py.html' | relative_url }}" target="_blank">Part 4: test.py</a>
- <a href="{{ '/assets/html/3_project_requirements.txt.html' | relative_url }}" target="_blank">Requirements.txt</a>
- <a href="{{ '/assets/html/3_project_README.txt.html' | relative_url }}" target="_blank">README.txt (Guide to easily run the program without reading the processes below.)</a>

Note: This project was developed using the PyCharm IDE; however, other integrated development environments (IDEs) may also be used. 
For a seamless setup, it is recommended to add your chosen IDE to your system's local path, connect it to GitHub for version control,
and ensure that all required packages are properly installed before beginning any part of the project. For a complete list of required packages, please refer to the links provided above.<br>
<br>
<br>
<span style='color: black; font-weight: bold;'>Part 1: weather_data.py</span><br>
I used publicly available weather data from Open-Meteo. Below is the code used to extract the weather data using a GET API request. 
The variables involved in this process include the location’s latitude and longitude, temperature, wind speed, and precipitation.
<br>
<br>
As an initial step, I created a Python class with instance variables to store the weather data, specifically the variables mentioned above.
{% raw %}
```html
class WeatherData:
    def __init__(self, latitude, longitude, date):
        self.latitude = latitude
        self.longitude = longitude
        self.date = date
        self.year = date.year
        self.month = date.month
        self.day = date.day
        self.avg_temp = None
        self.min_temp = None
        self.max_temp = None
        self.avg_wind_speed = None
        self.min_wind_speed = None
        self.max_wind_speed = None
        self.sum_precipitation = None
        self.min_precipitation = None
        self.max_precipitation = None
        self.data = None

    # This is a special method that returns a string representation of the object
    # When inspecting an object in an interactive session, Python calls the '__repr__'
    # This is useful for debugging and logging, as it shows the current state of the object's attributes
    # This is useful in quickly understanding the data contained within the instance 'WeatherData'
    def __repr__(self):
        return (f"WeatherData({self.latitude}, {self.longitude}, {self.date}, "
                f"avg_temp={self.avg_temp}, min_temp={self.min_temp}, max_temp={self.max_temp}, "
                f"avg_wind_speed={self.avg_wind_speed}, min_wind_speed={self.min_wind_speed}, max_wind_speed={self.max_wind_speed}, "
                f"sum_precipitation={self.sum_precipitation}, min_precipitation={self.min_precipitation}, max_precipitation={self.max_precipitation})")
```
{% endraw %}

<br>
Next, I developed a script to retrieve data from the Weather API. This involved dynamically setting the start and end dates to cover the most recent five years.
{% raw %}
```html
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()

            # Processing the retrieved data.
            # This code calculates the average, minimum, maximum,and sum for the relevant weather parameters.
            # Mean = add up all the given values, then divide by how many values there are. This calculation
            # is the dame as getting the average. So, for ease of use, I am using avg all throughout.
            # Filter out None values before summing and averaging. 'None' values represent missing data
            temp_mean_values = [val for val in data['daily']['temperature_2m_mean'] if val is not None]
            temp_min_values = [val for val in data['daily']['temperature_2m_min'] if val is not None]
            temp_max_values = [val for val in data['daily']['temperature_2m_max'] if val is not None]
            wind_speed_values = [val for val in data['daily']['wind_speed_10m_max'] if val is not None]
            precipitation_values = [val for val in data['daily']['precipitation_sum'] if val is not None]

            # Calculate averages, min, and max while handling empty lists
            self.avg_temp = sum(temp_mean_values) / len(temp_mean_values) if temp_mean_values else None
            self.min_temp = min(temp_min_values) if temp_min_values else None
            self.max_temp = max(temp_max_values) if temp_max_values else None

            self.avg_wind_speed = sum(wind_speed_values) / len(wind_speed_values) if wind_speed_values else None
            self.min_wind_speed = min(wind_speed_values) if wind_speed_values else None
            self.max_wind_speed = max(wind_speed_values) if wind_speed_values else None

            self.sum_precipitation = sum(precipitation_values) if precipitation_values else None
            self.min_precipitation = min(precipitation_values) if precipitation_values else None
            self.max_precipitation = max(precipitation_values) if precipitation_values else None

        # This is for handling errors. If the API request fails (status code is not 200), an error message is
        # printed with the relevant status code
        else:
            print(f"Error fetching data: {response.status_code}")
```
{% endraw %}

<br>
Then, for the prediction part, it was specifically asked to predict the mean temperature (Fahrenheit), minimum wind speed (mph), 
and the sum of precipitation (inches). I wrote this code for this task.

{% raw %}
```html
    def fetch_mean_temperature(self):
        start_date = (self.date.replace(year=self.date.year - 5)).strftime('%Y-%m-%d')
        end_date = self.date.strftime('%Y-%m-%d')
        url = (f"https://archive-api.open-meteo.com/v1/archive?"
               f"latitude={self.latitude}&longitude={self.longitude}&start_date={start_date}&end_date={end_date}"
               f"&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,wind_speed_10m_max"
               f"&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York")

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()

            temp_mean_values = [val for val in data['daily']['temperature_2m_mean'] if val is not None]
            self.avg_temp = sum(temp_mean_values) / len(temp_mean_values) if temp_mean_values else None
            print(f"Mean Temperature: {self.avg_temp} Fahrenheit")
        else:
            print(f"Error fetching mean temperature data: {response.status_code}")

    def fetch_max_wind_speed(self):
        start_date = (self.date.replace(year=self.date.year - 5)).strftime('%Y-%m-%d')
        end_date = self.date.strftime('%Y-%m-%d')
        url = (f"https://archive-api.open-meteo.com/v1/archive?"
               f"latitude={self.latitude}&longitude={self.longitude}&start_date={start_date}&end_date={end_date}"
               f"&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,wind_speed_10m_max"
               f"&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York")

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            wind_speed_values = [val for val in data['daily']['wind_speed_10m_max'] if val is not None]
            self.max_wind_speed = max(wind_speed_values) if wind_speed_values else None
            print(f"Maximum Wind Speed: {self.max_wind_speed} mph")
        else:
            print(f"Error fetching maximum wind speed data: {response.status_code}")

    def fetch_precipitation_sum(self):
        start_date = (self.date.replace(year=self.date.year - 5)).strftime('%Y-%m-%d')
        end_date = self.date.strftime('%Y-%m-%d')
        url = (f"https://archive-api.open-meteo.com/v1/archive?"
               f"latitude={self.latitude}&longitude={self.longitude}&start_date={start_date}&end_date={end_date}"
               f"&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,wind_speed_10m_max"
               f"&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York")

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            precipitation_values = [val for val in data['daily']['precipitation_sum'] if val is not None]
            self.sum_precipitation = sum(precipitation_values) if precipitation_values else None
            print(f"Sum Precipitation: {self.sum_precipitation} inch")
        else:
            print(f"Error fetching precipitation data: {response.status_code}")
```
{% endraw %}


<br><span style='color: black; font-weight: bold;'>Part 2: Building the database</span><br>
Using Python's sqlite3 module, I created a simple SQLite database.

{% raw %}
```html
from sqlalchemy import create_engine, Column, Integer, Float
from sqlalchemy.orm import declarative_base, sessionmaker

# Base handles the internal SQLAlchemy mechanics needed to map Python classes to database tables.
Base = declarative_base()

# This part is for creating/recreating the db table 'weather_data'
class WeatherRecord(Base):
    __tablename__ = 'weather_data'
    id = Column(Integer, primary_key=True)
    latitude  = Column(Float)
    longitude = Column(Float)
    month = Column(Integer)
    day = Column(Integer)
    year = Column(Integer)
    avg_temp_Fahrenheit = Column(Float)
    min_temp_Fahrenheit = Column(Float)
    max_temp_Fahrenheit = Column(Float)
    avg_wind_speed_mph = Column(Float)
    min_wind_speed_mph = Column(Float)
    max_wind_speed_mph = Column(Float)
    sum_precipitation_inches = Column(Float)
    min_precipitation_inches = Column(Float)
    max_precipitation_inches = Column(Float)

def recreate_table():
    engine = create_engine('sqlite:///weather.db') # This creates a connection to an SQLite database file
                                                    # named weather.db. The sqlite:/// prefix indicates that
                                                    # the database is an SQLite file.
    Base.metadata.drop_all(engine)  # Drop all tables, this is useful for dynamic dates/resetting the db schema
    Base.metadata.create_all(engine)  # Recreate all tables
    return engine

def insert_weather_data(engine, weather_data):
    Session = sessionmaker(bind=engine)
    session = Session()

    # creates a new instance of WeatherRecord with attributes populated from the weather_data object
    record = WeatherRecord(
        latitude=weather_data.latitude,
        longitude=weather_data.longitude,
        month=weather_data.date.month,
        day=weather_data.date.day,
        year=weather_data.date.year,
        avg_temp_Fahrenheit=weather_data.avg_temp,
        min_temp_Fahrenheit=weather_data.min_temp,
        max_temp_Fahrenheit=weather_data.max_temp,
        avg_wind_speed_mph=weather_data.avg_wind_speed,
        min_wind_speed_mph=weather_data.min_wind_speed,
        max_wind_speed_mph=weather_data.max_wind_speed,
        sum_precipitation_inches=weather_data.sum_precipitation,
        min_precipitation_inches=weather_data.min_precipitation,
        max_precipitation_inches=weather_data.max_precipitation
        )
    session.add(record) #adds the new record to the session, staging it for insertion into the database.
    session.commit() #commits the transaction, which inserts the record into the database
    session.close() #closes the session, releasing the connection back to the connection pool

#querying and displaying weather data from the db
def query_weather_data(engine):
    Session = sessionmaker(bind=engine)
    session = Session()

    #executes a query that retrieves all records from the WeatherRecord table and stores them in the results list
    results = session.query(WeatherRecord).all()

    #The function loops through each record in results and prints its attributes in a formatted string
    for result in results:
        print(f"ID: {result.id}, Latitude: {result.latitude}, Longitude: {result.longitude}, "
              f"Month: {result.month}, Day: {result.day}, Year: {result.year}, "
              f"Avg Temp: {result.avg_temp_Fahrenheit}, Min Temp: {result.min_temp_Fahrenheit}, Max Temp: {result.max_temp_Fahrenheit}, "
              f"Avg Wind Speed: {result.avg_wind_speed_mph}, Minimum Wind Speed: {result.min_wind_speed_mph}, Maximum Wind Speed: {result.max_wind_speed_mph}, Sum Precipitation: {result.sum_precipitation_inches}, "
              f"Min Precipitation: {result.min_precipitation_inches}, Max Precipitation: {result.max_precipitation_inches}")

    session.close()
```
{% endraw %}


<br><span style='color: black; font-weight: bold;'>Part 3: Control Center </span><br>
The main.py script serves as the entry point of the program. It coordinates the entire weather data processing workflow by performing the following steps:
1. Create a WeatherData object.
<br> A WeatherData instance is created using the current date, latitude, and longitude. This sets up the location and date range for data retrieval.
2. Fetch and calculate weather metrics.
<br> Three separate methods are called to retrieve and compute: Mean temperature in Fahrenheit, Maximum wind speed in miles per hour, Total precipitation in inches
3. Print the results to the console.
<br> After each metric is computed, it is immediately printed to provide real-time feedback.
4. Recreate the database table.
<br> The existing weather data table in the SQLite database is dropped and recreated. 
5. Insert the new weather data into the database.
<br> The calculated values from the WeatherData object are inserted as a new row in the weather_data table.

{% raw %}
```html
#Importing 'datetime' class from 'datetime' module, which is used to work with dates and times.
from datetime import datetime

# insert_weather_data: function for inserting weather data into a db
# weather record - class: representing the weather data table in the db
# recreate_table - function: drops an existing weather data table and recreates it/ensures it exists
from database import insert_weather_data, recreate_table, query_weather_data
# importing the weatherdata class from weather_data  file.
from weather_data import WeatherData


# Importing 'sessionmaker' class from sqlalchemy, which is a factory for creating new 'Session' objects.
# Session objects are sued to manage database transactions.

# This function put together the process of retrieving weather data for a specific location and date, printing the data,
# ensuring the database table is correctly set up, and then inserting the retrieved data into the db
def main():
    latitude = 40.0806
    longitude = -80.9001
    today = datetime.today()

    # An instance of the 'WeatherData' class is created using lat, long, current date
    weather = WeatherData(latitude, longitude, today)

    # The 'fetch_weather_data()' method is called on this instance to retrieve the weather data for the location
    # and date range, most recent 5 years
    weather.fetch_weather_data()

    # Generating the 3 weather variables in part c2
    print("\nWeather Variables Asked in Part C2:")
    weather.fetch_mean_temperature()
    weather.fetch_max_wind_speed()
    weather.fetch_precipitation_sum()

    # This prints the 'WeatherData' object, which uses the '__repr__' method of the 'WeatherData'
    # Generating the raw data return from the API url. This is helpful in checking if the table has the correct data
    # Compare these raw data to the printed/generated query right below this information
    # Raw data line starts with WeatherData, query line starts with ID
    print("\nAll raw weather data from API (use this to verify if data inserted are correct):")
    print(weather)

    # recreate_table is called to ensure that the db table for weather data exists, and reset it daily
    # this function returns an 'engine' object which is the sqlalchemy connection to the db
    engine = recreate_table()

    # This is called to insert the weather data fetched by the 'WeatherData' object into the db.
    # The 'engine' is passed to connect to the appropriate db
    insert_weather_data(engine, weather)

    # Query the database to verify data insertion
    print("\nAll records inserted in the database:")
    query_weather_data(engine)

main()
```
{% endraw %}


<br><span style='color: black; font-weight: bold;'>Part 4: Unit Test </span><br>
In this part, the program is tested to ensure that all components work as expected and produce reliable outputs. Processes involved are as follows:
1. Set Up Unit Tests. 
<br> A separate file named test.py is created using Python's built-in unittest framework.
2. Run the Tests. 
<br> Tests are executed either from the command line (python test.py) or within the IDE.
3. Clean Up After Each Test. 
<br> Temporary records inserted during testing are removed to preserve the original dataset.

{% raw %}
```html
import unittest
from sqlalchemy.orm import sessionmaker
from database import recreate_table, query_weather_data, WeatherRecord
from weather_data import WeatherData
from datetime import datetime

class TestWeatherDataDatabase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Print all data inserted in the tests
        print("All records inserted/used in the test database:")

        # Set up the database for testing
        cls.engine = recreate_table()

        # Example weather data to be inserted
        cls.weather_data = WeatherData(latitude=40.0806, longitude=-80.9001, date=datetime(2024, 8, 29))
        cls.weather_data.avg_temp = 52.6
        cls.weather_data.min_temp = -7.3
        cls.weather_data.max_temp = 94.8
        cls.weather_data.avg_wind_speed = 10.0
        cls.weather_data.min_wind_speed = 5.0
        cls.weather_data.max_wind_speed = 15.0
        cls.weather_data.sum_precipitation = 233.872
        cls.weather_data.min_precipitation = 0.0
        cls.weather_data.max_precipitation = 2.0

    def test_insert_weather_data(self):
        #Test inserting weather data into the db
        Session = sessionmaker(bind=self.engine)
        session = Session()

        # Convert WeatherData to WeatherRecord
        record = WeatherRecord(
            latitude=self.weather_data.latitude,
            longitude=self.weather_data.longitude,
            month=self.weather_data.date.month,
            day=self.weather_data.date.day,
            year=self.weather_data.date.year,
            avg_temp_Fahrenheit=self.weather_data.avg_temp,
            min_temp_Fahrenheit=self.weather_data.min_temp,
            max_temp_Fahrenheit=self.weather_data.max_temp,
            avg_wind_speed_mph=self.weather_data.avg_wind_speed,
            min_wind_speed_mph=self.weather_data.min_wind_speed,
            max_wind_speed_mph=self.weather_data.max_wind_speed,
            sum_precipitation_inches=self.weather_data.sum_precipitation,
            min_precipitation_inches=self.weather_data.min_precipitation,
            max_precipitation_inches=self.weather_data.max_precipitation
        )

        session.add(record)
        session.commit()

        # Query the inserted data
        result = session.query(WeatherRecord).filter_by(latitude=40.0806, longitude=-80.9001).first()

        # Test if the data inserted correctly
        self.assertIsNotNone(result)
        self.assertEqual(result.latitude, 40.0806)
        self.assertEqual(result.longitude, -80.9001)
        self.assertEqual(result.avg_temp_Fahrenheit, 52.6)
        self.assertEqual(result.min_temp_Fahrenheit, -7.3)
        self.assertEqual(result.max_temp_Fahrenheit, 94.8)
        self.assertEqual(result.avg_wind_speed_mph, 10.0)
        self.assertEqual(result.min_wind_speed_mph, 5.0)
        self.assertEqual(result.max_wind_speed_mph, 15.0)
        self.assertEqual(result.sum_precipitation_inches, 233.872)
        self.assertEqual(result.min_precipitation_inches, 0.0)
        self.assertEqual(result.max_precipitation_inches, 2.0)

        session.close()

    def test_query_weather_data(self):
        #Test querying weather data from the database
        Session = sessionmaker(bind=self.engine)
        session = Session()

        # Insert a record
        record = WeatherRecord(
            latitude=self.weather_data.latitude,
            longitude=self.weather_data.longitude,
            month=self.weather_data.date.month,
            day=self.weather_data.date.day,
            year=self.weather_data.date.year,
            avg_temp_Fahrenheit=self.weather_data.avg_temp,
            min_temp_Fahrenheit=self.weather_data.min_temp,
            max_temp_Fahrenheit=self.weather_data.max_temp,
            avg_wind_speed_mph=self.weather_data.avg_wind_speed,
            min_wind_speed_mph=self.weather_data.min_wind_speed,
            max_wind_speed_mph=self.weather_data.max_wind_speed,
            sum_precipitation_inches=self.weather_data.sum_precipitation,
            min_precipitation_inches=self.weather_data.min_precipitation,
            max_precipitation_inches=self.weather_data.max_precipitation
        )

        session.add(record)
        session.commit()
        session.close()

        # Test the query_weather_data function
        query_weather_data(self.engine)  # This should print the inserted data

    def test_insert_multiple_records(self):
        #Test inserting multiple records into the database.
        Session = sessionmaker(bind=self.engine)
        session = Session()

        # Insert the first record
        record1 = WeatherRecord(
            latitude=self.weather_data.latitude,
            longitude=self.weather_data.longitude,
            month=self.weather_data.date.month,
            day=self.weather_data.date.day,
            year=self.weather_data.date.year,
            avg_temp_Fahrenheit=self.weather_data.avg_temp,
            min_temp_Fahrenheit=self.weather_data.min_temp,
            max_temp_Fahrenheit=self.weather_data.max_temp,
            avg_wind_speed_mph=self.weather_data.avg_wind_speed,
            min_wind_speed_mph=self.weather_data.min_wind_speed,
            max_wind_speed_mph=self.weather_data.max_wind_speed,
            sum_precipitation_inches=self.weather_data.sum_precipitation,
            min_precipitation_inches=self.weather_data.min_precipitation,
            max_precipitation_inches=self.weather_data.max_precipitation
        )
        session.add(record1)

        # Insert a second record with different data
        weather_data_2 = WeatherData(latitude=35.6895, longitude=139.6917, date=datetime(2023, 7, 15))
        weather_data_2.avg_temp = 75.0
        weather_data_2.min_temp = 68.0
        weather_data_2.max_temp = 82.0
        weather_data_2.avg_wind_speed = 5.0
        weather_data_2.min_wind_speed = 3.0
        weather_data_2.max_wind_speed = 7.0
        weather_data_2.sum_precipitation = 10.5
        weather_data_2.min_precipitation = 0.2
        weather_data_2.max_precipitation = 1.5

        record2 = WeatherRecord(
            latitude=weather_data_2.latitude,
            longitude=weather_data_2.longitude,
            month=weather_data_2.date.month,
            day=weather_data_2.date.day,
            year=weather_data_2.date.year,
            avg_temp_Fahrenheit=weather_data_2.avg_temp,
            min_temp_Fahrenheit=weather_data_2.min_temp,
            max_temp_Fahrenheit=weather_data_2.max_temp,
            avg_wind_speed_mph=weather_data_2.avg_wind_speed,
            min_wind_speed_mph=weather_data_2.min_wind_speed,
            max_wind_speed_mph=weather_data_2.max_wind_speed,
            sum_precipitation_inches=weather_data_2.sum_precipitation,
            min_precipitation_inches=weather_data_2.min_precipitation,
            max_precipitation_inches=weather_data_2.max_precipitation
        )
        session.add(record2)

        session.commit()

        # Query all records and check that both are inserted
        results = session.query(WeatherRecord).all()

        # Test if two records are inserted
        self.assertEqual(len(results), 2)

        # Test specific values of the second record
        second_record = session.query(WeatherRecord).filter_by(latitude=35.6895, longitude=139.6917).first()
        self.assertIsNotNone(second_record)
        self.assertEqual(second_record.latitude, 35.6895)
        self.assertEqual(second_record.longitude, 139.6917)
        self.assertEqual(second_record.avg_temp_Fahrenheit, 75.0)
        self.assertEqual(second_record.min_temp_Fahrenheit, 68.0)
        self.assertEqual(second_record.max_temp_Fahrenheit, 82.0)
        self.assertEqual(second_record.avg_wind_speed_mph, 5.0)
        self.assertEqual(second_record.min_wind_speed_mph, 3.0)
        self.assertEqual(second_record.max_wind_speed_mph, 7.0)
        self.assertEqual(second_record.sum_precipitation_inches, 10.5)
        self.assertEqual(second_record.min_precipitation_inches, 0.2)
        self.assertEqual(second_record.max_precipitation_inches, 1.5)

        session.close()

    @classmethod
    def tearDownClass(cls):
        # Clean up the database by removing all records inserted during testing.
        Session = sessionmaker(bind=cls.engine)
        session = Session()
        session.query(WeatherRecord).delete()
        session.commit()
        session.close()

if __name__ == "__main__":
    unittest.main()
```
{% endraw %}


<br><span style='color: black; font-weight: bold;'>Thank you for reading this far! Have corrections, suggestions or feedback? Send me an email — I’d love to hear your thoughts! </span><br>
