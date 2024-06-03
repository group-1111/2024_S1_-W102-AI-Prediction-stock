from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('test/', views.first_page, name='first_page'),
    path('', views.predict_view, name='predict_view'),
    path('prediction_pic/', views.prediction_pic, name='prediction_pic'),
    path('get-stock-info/', views.get_stock_info, name='get_stock_info'),
    path('recommend_page/', views.recommend_page, name='recommend_page'),
    path('community_page/', views.community_page, name='community_page'),
    path('watch_list/', views.watch_list, name='watch_list'),
    path('<str:symbol>/', views.stock_chart, name='stock_chart'),
]