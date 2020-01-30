from flask import Flask, jsonify, request, render_template, Response
import pandas as pd
import numpy as numpy


app=Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
    

if __name__=="__main__":
    app.run()