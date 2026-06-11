import requests

files = {'file': open('../sample_floorplan.png', 'rb')}
r = requests.post('http://localhost:8000/upload', files=files)
data = r.json()
print("Keys in first wall:", data['walls'][0].keys() if len(data['walls']) > 0 else 'No walls')
print("Number of holes in first wall:", len(data['walls'][0].get('holes', [])))
