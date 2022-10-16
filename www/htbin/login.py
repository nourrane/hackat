#!/usr/bin/python3
# -*- coding: utf-8 -*-

from asyncio.windows_events import NULL
import cgi
import cgitb
import os
import string
import hashlib
import pickle


cgitb.enable()

print('Cache-Control: no-cache')
print('Content-type: text/plain; charset=utf-8')
print('')


data_file = open('../data/user.dat','rb')
data = pickle.loads(data_file.read())
data_file.close()

t=dict()
k=NULL
p=NULL
for key in data.keys() : 
	if k is not NULL and p is not NULL:
		t[k]=p
		k=NULL
		p=NULL
	if key=='username':
		k=data['username']
	if key == 'userpwd':
		p=data['userpwd']



form_data = dict()

form = cgi.FieldStorage()
for name in list(form.keys()):
	print(name)
	if name.lower() == 'userpwd':
		form_data[name] = hashlib.sha512(form.getfirst(name).encode('utf-8')).hexdigest()
	else:
		form_data[name] = form.getfirst(name)


if not 'username' in form_data:
	print('Le nom d\'utilisateur ne doit pas être vide.')
elif not 'userpwd' in form_data:
	print('Le mot de pass ne doit pas être vide.')
#elif form_data['username'] == data['username'] and form_data['userpwd'] == data['userpwd']:
elif form_data['username'] in t.keys() and t[form_data['username']]==form_data['userpwd']:
	print(("Bonjour %s %s !" % (data['firstname'], data['lastname'])))
else:
	print('Le nom d\'utilisateur et le mot de pass sont invalides.')

