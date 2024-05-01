from django.db import models

class Prediction(models.Model):
    date = models.DateField()
    predicted_price = models.FloatField()

    def __str__(self):
        return f"Prediction for {self.date}: ${self.predicted_price}"
    


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)