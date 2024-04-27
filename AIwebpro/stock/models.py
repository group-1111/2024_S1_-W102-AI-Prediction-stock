from django.db import models

class Prediction(models.Model):
    date = models.DateField()
    predicted_price = models.FloatField()

    def __str__(self):
        return f"Prediction for {self.date}: ${self.predicted_price}"