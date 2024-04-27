
def predict_future_price(lookup_step):
    # 在這裡計算預測結果
    future_price = 172.64
    mse_loss = 0.0005671574035659432
    mean_absolute_error = 2.1612362152715927
    accuracy = 0.5362103174603174
    total_buy_profit = 1207.3708073496819
    total_sell_profit = 116.29436315596098
    total_profit = 1323.665170505643
    profit_per_trade = 0.6565799456873228

    return {
        'future_price': future_price,
        'mse_loss': mse_loss,
        'mean_absolute_error': mean_absolute_error,
        'accuracy': accuracy,
        'total_buy_profit': total_buy_profit,
        'total_sell_profit': total_sell_profit,
        'total_profit': total_profit,
        'profit_per_trade': profit_per_trade,
        'lookup_step': lookup_step
    }