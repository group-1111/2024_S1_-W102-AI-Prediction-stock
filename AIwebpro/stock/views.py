from django.shortcuts import render
from django.http import HttpResponse
from yahoo_fin.stock_info import get_data
import pandas as pd
import plotly.graph_objs as go
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from datetime import datetime


# Create your views here.
def first_page(request):
    return render(request,'test.html') 




def prediction_pic(request):
    return render(request, 'index.html')   

from .utils import predict_future_price

def predict_view(request):
    if request.method == 'POST':
        # get predict days
        lookup_step = int(request.POST['lookup_step'])

        # use predict_future_price get result
        result = predict_future_price(lookup_step)

        # render result to test.html
        return render(request, 'test.html', {'result': result})
    else:
        return render(request, 'test.html')



def stock_chart(request, symbol):
    # get the 'stock' and 'data' parameters, default to 'AAPL' and 'close' if not provide
    stock = request.GET.get('stock', 'AAPL') 
    data = request.GET.get('data', 'close')

    start_date_str = request.GET.get('start_date')
    end_date_str = request.GET.get('end_date')

    start_date = datetime.strptime(start_date_str, '%Y-%m-%d') if start_date_str else None
    end_date = datetime.strptime(end_date_str, '%Y-%m-%d') if end_date_str else None

    # fetch stock data for the given stock symbol
    stock_data = get_data(stock, start_date=start_date, end_date=end_date)
    # Convert index of stock data to datetime format
    stock_data.index = pd.to_datetime(stock_data.index)

    # create a line chart trace using Plotly with the stock data
    trace = go.Scatter(x=stock_data.index, y=stock_data[data], mode='lines', name=data)
    # define the layout of the chart with title and axis labels
    layout = go.Layout(title=f'{stock} {data.capitalize()} Price',
                       xaxis=dict(title='Date'),
                       yaxis=dict(title='Price'))

    # generate the HTML representation of the chart
    chart_div = go.Figure(data=[trace], layout=layout).to_html(full_html=False)

   

    # render the 'API.html' template with the chart's HTML content
    return render(request, 'API.html', {'chart_div': chart_div})


def get_stock_info(request):
    if request.method == 'GET':
        # Get the 'stock_code' and 'date' parameters from the GET request
        stock_code = request.GET.get('stock_code')
        date = request.GET.get('date')
        
        # For debugging
        print(f"Stock code: {stock_code}, Date: {date}")

        # Fetch stock data for the given stock code and date
        stock_data = get_data(stock_code, start_date=date, end_date=date)

        # For debugging
        print("Stock data:", stock_data)

        if not stock_data.empty:
            # Extract stock information from the fetched data
            stock_info = {
                'open': stock_data['open'].values[0],
                'high': stock_data['high'].values[0],
                'low': stock_data['low'].values[0],
                'close': stock_data['close'].values[0],
                'volume': stock_data['volume'].values[0],
            }
            # Return the stock information as a JSON response
            return JsonResponse(stock_info)
        else:
            # Return error if no data is available
            return JsonResponse({'error': 'No data available for the selected stock and date.'}, status=404)
        

def recommend_page(request):
    return render(request, 'Stock_recommended.html')

def community_page(request):
    return render(request, 'community-forum.html')

def watch_list(request):
    return render(request, 'watch_list.html')