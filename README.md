
# Stock Prediction Platform

Stock Prediction Platform is a web application for predicting stock prices and managing a stock watchlist.



## Usage

### Creating Directories

```python
import os
log_dir = 'path/to/log/directory'
os.makedirs(log_dir, exist_ok=True)
```

### Loading Data with `pandas`

```python
import pandas as pd
df = pd.read_csv('ticker_data_filename.csv')
```

### Creating GUI with `tkinter` and Displaying Data

```python
import tkinter as tk
from tkinter import ttk

root = tk.Tk()
root.title("AI Prediction Stock")
```

### Displaying Stock Data

```python
df_text = tk.Text(df_frame, height=30, width=100)
df_text.insert(tk.END, df.to_string(index=False))
```

### Setting Lookup Step

```python
def set_lookup_step():
    global LOOKUP_STEP
    step = int(step_entry.get())
    LOOKUP_STEP = step
```

### Plotting Loss Metrics and Displaying TensorBoard

```python
import subprocess
import webbrowser

def plot_loss_metrics():
    subprocess.run(["jupyter", "nbextension", "enable", "--py", "tensorboard"])
    subprocess.run(["jupyter", "serverextension", "enable", "--py", "tensorboard"])
    log_dir = "logs"
    os.makedirs(log_dir, exist_ok=True)
    subprocess.Popen(["tensorboard", "--logdir", log_dir])
    webbrowser.open_new_tab("http://localhost:6006/")
```

### Printing Metrics

```python
def print_metrics():
    metrics_window = tk.Toplevel(root)
    metrics_text = tk.Text(metrics_frame, height=10, width=50)
    metrics_text.insert(tk.END, future_price_str + loss_str + mae_str + accuracy_str)
```

### Plotting Prices

```python
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

def plot_prices():
    figure = plt.Figure(figsize=(8, 6), dpi=100)
    ax = figure.add_subplot(111)
    ax.plot(final_df.index, final_df[f'adjclose_{LOOKUP_STEP}'], label='Predicted Price', c='r')
    canvas = FigureCanvasTkAgg(figure, plot_frame)
    canvas.draw()
    canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=True)
```
### Watch List

```python
 function addStock() {
            const stockSymbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
            if (stockSymbol) {
                const watchlist = document.getElementById('watchlist');
                const listItem = document.createElement('li');
                listItem.textContent = stockSymbol;
                listItem.classList.add('highlight');

```
### Django environment

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AIwebpro.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
```
### Using Google Colab and Django

Due to the need to run the project on Google Colab for convenient data processing and model training, integrating it with Django has been somewhat challenging for us. However, YungHsiang has put in a tremendous amount of effort to help us tackle this issue

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

 [MIT](https://github.com/twbs/bootstrap/blob/main/LICENSE)
