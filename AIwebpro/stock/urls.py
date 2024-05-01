from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('test/', views.first_page, name='first_page'),
    path('', views.predict_view, name='predict_view'),
    path('prediction_pic/', views.prediction_pic, name='prediction_pic'),
    path('<str:symbol>/', views.stock_chart, name='stock_detail'),
    path('get-stock-info/', views.get_stock_info, name='get_stock_info'),
    
]