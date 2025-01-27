from flask import Flask,request,jsonify
import util

app=Flask(__name__)

@app.route('/get_data',methods=['GET'])
def get_data_names():
    response=jsonify({
        'map':util.get_map(),
        'columns':util.get_columns()
    })
    response.headers.add('Access-Control-Allow-Origin','*')

    return response

@app.route('/rec_crop',methods=['POST','GET'])
def rec_crop():
    nitrogen=float(request.form['nitrogen'])
    phosphorus=float(request.form['phosphorus'])
    potassium=float(request.form['potassium'])
    temperature=float(request.form['temperature'])
    humidity=float(request.form['humidity'])
    ph=float(request.form['ph'])
    rainfall=float(request.form['rainfall'])

    response=jsonify({
        'recommended_crop':util.get_rec_crop(nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall)
    })
    response.headers.add('Access-Control-Allow-Origin',"*")
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Crop Recommendation")
    util.load_saved_artifacts()
    app.run()