from django.shortcuts import render
from django.http import HttpResponse
from yahoo_fin.stock_info import get_data
import pandas as pd
import plotly.graph_objs as go
import numpy as np
from django.views.decorators.csrf import csrf_exempt
import numpy as np




# Create your views here.
def first_page(request):
    return render(request,'test.html') 




def prediction_pic(request):
    return render(request, 'index.html')   

from .utils import predict_future_price

def predict_view(request):
    if request.method == 'POST':
        # 從表單中獲取預測天數
        lookup_step = int(request.POST['lookup_step'])

        # 使用 predict_future_price 函數獲取預測結果
        result = predict_future_price(lookup_step)

        # 將結果傳遞到模板中顯示
        return render(request, 'test.html', {'result': result})
    else:
        return render(request, 'test.html')


def stock_chart(request, symbol):
    
    stock = request.GET.get('stock', 'AAPL')  # 默认为 AAPL
    data = request.GET.get('data', 'close')

    stock_data = get_data(stock)
    stock_data.index = pd.to_datetime(stock_data.index)

    trace = go.Scatter(x=stock_data.index, y=stock_data[data], mode='lines', name=data)
    layout = go.Layout(title=f'{stock} {data.capitalize()} Price',
                       xaxis=dict(title='Date'),
                       yaxis=dict(title='Price'))

    chart_div = go.Figure(data=[trace], layout=layout).to_html(full_html=False)

    return render(request, 'API.html', {'chart_div': chart_div})


