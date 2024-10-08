# Uncomment the following imports before adding the Model code

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

# <HINT> Create a Car Make model `class CarMake(models.Model)`:
# - Name
# - Description
# - Any other fields you would like to include in car make model
# - __str__ method to print a car make object


# <HINT> Create a Car Model model `class CarModel(models.Model):`:
# - Many-To-One relationship to Car Make model (One Car Make has many
# Car Models, using ForeignKey field)
# - Name
# - Type (CharField with a choices argument to provide limited choices
# such as Sedan, SUV, WAGON, etc.)
# - Year (IntegerField) with min value 2015 and max value 2023
# - Any other fields you would like to include in car model
# - __str__ method to print a car make object


class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Other fields as needed
    
    def __str__(self):
        return self.name  # Return the name as the string representation


# <HINT> Create a Car Model model `class CarModel(models.Model):`:
class CarModel(models.Model):
    car_make = models.ForeignKey(CarMake, 
                                 on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        # Add more choices as required
    ]
    type = models.CharField(max_length=10, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2023,
            validators=[
                MaxValueValidator(2023),
                MinValueValidator(2015)
            ])
    # Other fields as needed

    def __str__(self):
        return self.name  # Return the name as the string representation


# All fields are from dealerships document in cloudant
class CarDealer:

    def __init__(self, address, city, 
                 full_name, id, 
                 lat, long, short_name, 
                 st, zip):
        # Dealer address
        self.address = address
        # Dealer city
        self.city = city
        # Dealer Full Name
        self.full_name = full_name
        # Dealer id
        self.id = id
        # Location lat
        self.lat = lat
        # Location long
        self.long = long
        # Dealer short name
        self.short_name = short_name
        # Dealer state
        self.st = st
        # Dealer zip
        self.zip = zip

    def __str__(self):
        return "Dealer name: " + self.full_name


# <HINT> Create a plain Python class `DealerReview` to hold review data

# All fields are from review documet in cloudant
class DealerReview:

    def __init__(self, id, name, 
                 dealership, 
                 review, purchase, 
                 purchase_date,
                 car_make, car_model, 
                 car_year, sentiment='neutral'):
        self.id = id
        self.name = name  # reviewer name
        self.dealership = dealership
        self.review = review  # reveiw text
        self.purchase = purchase  # Did the reviewer purchase the car? bool
        self.purchase_date = purchase_date
        self.car_make = car_make
        self.car_model = car_model
        self.car_year = car_year
        self.sentiment = sentiment  # Watson NLU sentiment analysis of review

        def __str__(self):
            return 'Reviewer: ' + self.name + ' Review: ' + self.review
    
