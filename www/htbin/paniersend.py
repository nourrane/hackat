#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi
import cgitb
import os
import sys
import string
import pickle
from datetime import datetime
try:
    import json
except ImportError:
	sys.path.append(os.getcwd() + '/htbin/simplejson')
	import simplejson as json

cgitb.enable()

print('Cache-Control: no-cache')
print('Content-type: application/json')
print('')

##data_file = open('../data/panier.dat','rb')
##data = pickle.loads(data_file.read())
##data_file.close()


form_data = dict()
form = cgi.FieldStorage()
for name in list(form.keys()):
	form_data[name] = form.getfirst(name)


if not 'basketname' in form_data:
	print((json.dumps(dict({'num': 1,'msg':'Erreur, nom panier absent.'}))))
#elif not 'basketname' in data:
#	print((json.dumps(dict({'num': -1,'msg':'Erreur de lecture du nom d\'utilisateur'}))))
else:
	#timestamp = datetime.now()
	bskjson = dict()
	#msgjson['date'] = timestamp.strftime('%d/%m/%y')
	#msgjson['time'] = timestamp.strftime('%H:%M')
	#bskjson['basketname'] = data['basketname']
	bskjson['basketname'] = form_data['basketname']
	data_file = open('../data/panierdata.dat','a')
	data_file.write(json.dumps(bskjson))
	data_file.write('\n')
	data_file.close()
	print((json.dumps(dict({'num': 0,'msg':'Message envoyé.'}))))

