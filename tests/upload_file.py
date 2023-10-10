def upload_file():
    import requests

    url = 'http://localhost:5000/upload'
    files = {'shapefile': ('example.shp', open('data/egypt_administrative.zip', 'rb'))}

    response = requests.post(url, files=files)

    print(response.json())
    

if __name__ == '__main__':
    upload_file()

