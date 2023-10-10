import json
import os
import re
import zipfile
import geopandas as gpd

class ShapefileProcessor:
    def __init__(self, uploaded_zipfile):
        """
        Initializes a ShapefileProcessor instance.

        Parameters:
        - uploaded_zipfile (str): The path to the uploaded ZIP file containing the shapefile.
        """
        self.tempdir = 'temp'
        self.uploaded_zipfile = uploaded_zipfile
        self.is_polygon = False
        
        self.extracted = self.extract_zipfile()
    
    def extract_zipfile(self):
        """
        Extracts the uploaded ZIP file to a temporary directory.

        Returns:
        - bool: True if extraction was successful, False otherwise.
        """
        extraction_directory = self.tempdir

        # Extract the uploaded ZIP file
        try:
            with zipfile.ZipFile(self.uploaded_zipfile, 'r') as zip_ref:
                zip_ref.extractall(extraction_directory)
            return True
        except Exception as e:
            print(f"An error occurred while extracting the ZIP file: {str(e)}")
            return False
    
    def get_shapefile_path(self):
        """
        Retrieves the path of the shapefile from the extracted files.

        Returns:
        - str: The path to the shapefile, or None if not found.
        """
        try:
            # List all files in the directory
            files = os.listdir(self.tempdir)
            # Filter files by extension
            shapefile_files = [file for file in files if file.endswith('.shp')]
            if shapefile_files:
                return os.path.join(self.tempdir, shapefile_files[0])
            else:
                print("No shapefile found in the extracted ZIP.")
                return None
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return None
        
    def check_geometry(self):
        file_path = self.get_shapefile_path()
        if file_path:
            gdf = gpd.read_file(file_path)
            geometry_type = gdf.geom_type.unique()[0]
            return geometry_type
        return None
    
    def convert_to_geojson(self, shapefile_path):
        """
        Converts a shapefile to GeoJSON format and saves it to the temporary directory.

        Parameters:
        - shapefile_path (str): The path to the shapefile to be converted.
        """
        output_geojson = os.path.join(self.tempdir, 'output.geojson')
        
        if shapefile_path:
            gdf = gpd.read_file(shapefile_path)
            gdf.to_file(output_geojson, driver='GeoJSON', encoding='utf-8')
        
    def get_geojson_data(self):
        """
        Retrieves GeoJSON data from the converted file.

        Returns:
        - dict: The GeoJSON data, or None if an error occurs.
        """
        if self.extracted:
            shapefile_path = self.get_shapefile_path()
            if shapefile_path:
                self.convert_to_geojson(shapefile_path)
                try:
                    geojson_file_path = os.path.join(self.tempdir, 'output.geojson')
                    if os.path.isfile(geojson_file_path):
                        with open(geojson_file_path, 'r', encoding='utf-8') as geojson_file:
                            geojson_data = json.load(geojson_file)
                            geojson_data.update({"title": re.sub(r'[^\w\s.]+', ' ', os.path.basename(shapefile_path))})
                        return geojson_data
                    else:
                        print("GeoJSON file does not exist.")
                        return None
                except Exception as e:
                    print(f"An error occurred: {str(e)}")
                    return None
        self.clean_temp_directory()
    
    def clean_temp_directory(self):
        """
        Cleans up the temporary directory by removing all files.

        Note: This method is automatically called after processing.
        """
        try:
            # List all files in the directory
            files = os.listdir(self.tempdir)
            
            # Iterate through the files and remove them
            for file_name in files:
                file_path = os.path.join(self.tempdir, file_name)
                if os.path.isfile(file_path):
                    os.remove(file_path)
            
            print(f"All files in '{self.tempdir}' have been removed.")
        except Exception as e:
            print(f"An error occurred: {str(e)}")
