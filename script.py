
from internetarchive import download
import sys
print('#Hello from python#')
print('First param:'+sys.argv[1]+'#')
url = sys.argv[1]
download('url', verbose=True)