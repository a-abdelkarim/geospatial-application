import os
from flask import Flask, request, send_from_directory
from flask_restful import Resource, Api

import geopandas as gpd

from modules.shapefile_processor import ShapefileProcessor

app = Flask(__name__)
api = Api(app)

# Define the path to your static files (e.g., index.html).
static_files_dir = 'static'
TEMP_DIR = 'temp'

os.makedirs(TEMP_DIR, exist_ok=True)

@app.route('/')
def index():
    # Serve the index.html file from the static directory.
    return send_from_directory('', 'index.html')

class UploadShapefile(Resource):
    def post(self):
        try:
            uploaded_file = request.files['shapefile']
            uploaded_file.save(TEMP_DIR + '/temp.zip')
            shapefile_processor = ShapefileProcessor(TEMP_DIR + '/temp.zip')
            shapefile_geometry = shapefile_processor.check_geometry()

            if shapefile_geometry != "Polygon":
                shapefile_processor.clean_temp_directory()
                return {'message': "The shapefile must be Polygon!", "data": None}, 422
            
            geojson_data = shapefile_processor.get_geojson_data()
            shapefile_processor.clean_temp_directory()
            return {'message': 'Shapefile uploaded successfully', "data": geojson_data}, 200
        
        except Exception as e:
            return {'message': "Internal Server Error!", "data": None}, 500

api.add_resource(UploadShapefile, '/upload')

if __name__ == '__main__':
    app.run()
