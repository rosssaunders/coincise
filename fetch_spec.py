import yaml
import json
import urllib.request
import sys

URL = "https://raw.githubusercontent.com/bullish-exchange/api-docs/master/src/trading-api/current/bullish-trading-api.yml"
OUTPUT_FILE = "venues/bullish/bullish-api-doc.json"

try:
    print(f"Downloading spec from {URL}...")
    with urllib.request.urlopen(URL) as response:
        yaml_content = response.read().decode('utf-8')
    
    print("Parsing YAML...")
    spec = yaml.safe_load(yaml_content)
    
    print(f"Saving JSON to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(spec, f, indent=2, default=str)
        
    print("Done.")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
